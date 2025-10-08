import { db_pool_connection } from "../database/db.js";
import {
  response_bad_request,
  response_created,
  response_error,
  response_success,
  response_not_found,
} from "../responses/responses.js";

export const createProduct = async (req, res) => {
  const { product_name, product_description, product_price, stock } = req.body;

  try {
    const [product] = await db_pool_connection.query(
      `INSERT INTO products (product_name, product_description, product_price, stock) 
        VALUES (?, ?, ?, ?)`,
      [product_name, product_description, product_price, stock]
    );

    if (product.length === 0) {
      return res
        .status(400)
        .json(response_bad_request("Could not insert the product"));
    }

    res
      .status(201)
      .json(response_created(product, "Product added successfully"));
  } catch (error) {
    console.log("Server error while adding product", error.message);
    return res
      .status(500)
      .json(response_error(500, "Server error while creating product"));
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit || 10);
    const offset = (page - 1) * limit;

    const [total] = await db_pool_connection.query(
      "SELECT COUNT(*) as total FROM products"
    );

    const [products] = await db_pool_connection.query(
      `SELECT id_product, product_name, product_description, product_price, stock FROM products order by stock desc LIMIT ? OFFSET ?;`,
      [limit, offset]
    );

    if (products.length === 0 && page > 1) {
      return res
        .status(400)
        .json(response_bad_request("Error fetching products: no products found"));
    }

    const totalProducts = total[0].total;
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json(
      response_success(
        {
          products,
          metadata: {
            total: totalProducts,
            page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        "Products retrieved successfully"
      )
    );
  } catch (error) {
    console.log("Server error while fetching products", error.message);
    return res
      .status(500)
      .json(response_error(500, "Server error while fetching products"));
  }
};

export const getProductByName = async (req, res) => {
  const product_name  = req.query.productname;

  try {
    const [product] = await db_pool_connection.query(
      `SELECT id_product, product_name, product_description, product_price, stock FROM products WHERE product_name = ?`,
      [product_name]
    );

    if (product.length === 0) {
      return res
        .status(400)
        .json(response_bad_request("Error fetching product: product not found"));
    }

    res
      .status(200)
      .json(response_success(product, "Product retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Server error while fetching product"));
  }
};

export const getProductById = async (req, res) => {
  const { id_product } = req.params;

  try {
    const [product] = await db_pool_connection.query(
      `SELECT product_name, product_description, product_price, stock, created_at FROM products WHERE id_product = ?`,
      [id_product]
    );

    if (product.length === 0) {
      return res
        .status(400)
        .json(response_bad_request("Error fetching product"));
    }

    res
      .status(200)
      .json(response_success(product, "Product retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Server error while fetching product"));
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    const [bestSellingProducts] = await db_pool_connection.query(`
      SELECT
        p.id_product,
        p.product_name,
        p.product_description,
        p.stock,
        SUM(sd.quantity) as total_sold
      FROM sales_detail sd
      INNER JOIN products p ON sd.id_product = p.id_product
      INNER JOIN sales s ON sd.id_sale = s.id_sales
      GROUP BY p.id_product, p.product_name
      ORDER BY total_sold DESC
      LIMIT 10`);

    if (bestSellingProducts.length === 0) {
      return res
        .status(400)
        .json(
          response_bad_request(
            "Error fetching top 10 products: no products have been sold"
          )
        );
    }

    res
      .status(200)
      .json(
        response_success(bestSellingProducts, "Products retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Server error while fetching top 10 products: " + error.message
        )
      );
  }
};

export const updateProduct = async (req, res) => {
  const { product_name, product_description, product_price, stock } = req.body;
  const { id_product } = req.params;

  try {
    const [result] = await db_pool_connection.query(
      `UPDATE products
            SET
                product_name = COALESCE(?, product_name), 
                product_description = COALESCE(?, product_description), 
                product_price = COALESCE(?, product_price), 
                stock = COALESCE(?, stock)
            WHERE 
                id_product = ?
        `,
      [product_name, product_description, product_price, stock, id_product]
    );

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json(response_bad_request("Error updating product data"));
    }

    res
      .status(200)
      .json(response_success(result, "Product updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Server error while updating product"));
  }
};

export const deleteProduct = async (req, res) => {
  const { id_product } = req.params;
  try {
    const [rows] = await db_pool_connection.query(
      `DELETE FROM products WHERE id_product = ?`,
      id_product
    );

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .json(
          response_not_found(
            "Could not delete product: product not found or incorrect ID"
          )
        );
    }

    res
      .status(200)
      .json(response_success(rows, "Product deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Server error, please try again: " + error["sqlMessage"]
        )
      );
  }
};