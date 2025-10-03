import { db_pool_connection } from "../database/db.js";
import {
  response_bad_request,
  response_created,
  response_error,
  response_success,
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
        .json(response_bad_request("No se pudo insertar el producto"));
    }

    res
      .status(201)
      .json(response_created(product, "Producto agregado con exito"));
  } catch (error) {
    console.log("Error en el servidor al agregar producto ", error.message);
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al crear producto"));
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
      `SELECT id_product, product_name, product_description, product_price, stock FROM products order by created_at desc LIMIT ? OFFSET ?;`,
      [limit, offset]
    );

    if (products.length === 0 && page > 1) {
      return res
        .status(400)
        .json(response_bad_request("Error al obtener los productos, no hay productos registrados"));
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
        "Productos obtenidos con éxito"
      )
    );
  } catch (error) {
    console.log("Error en el servidor al obtener los productos ", error.message);
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al obtener los productos"));
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
        .json(response_bad_request("Error al obtener el producto, producto no encontrado"));
    }

    res
      .status(200)
      .json(response_success(product, "Producto obtenido con exito"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al obtener producto"));
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
        .json(response_bad_request("Error al obtener el producto"));
    }

    res
      .status(200)
      .json(response_success(product, "Producto obtenido con exito"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al obtener producto"));
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
            "Error al obtener al obtener los 10 mejores productos, no se han vendido productos"
          )
        );
    }

    res
      .status(200)
      .json(
        response_success(bestSellingProducts, "Productos obtenido con exito")
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Error en el servidor al obtener los 10 mejores productos " +
            error.message
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
        .json(response_bad_request("Error al actualizar datos de producto"));
    }

    res
      .status(200)
      .json(response_success(result, "Producto actualizado con exito"));
  } catch (error) {
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al actualizar producto"));
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
            "No se pudo eliminar el producto, producto no encontrado o ID incorrecto"
          )
        );
    }

    res
      .status(200)
      .json(response_success(rows, "Producto eliminado con exito"));
  } catch (error) {
    return res
      .status(500)
      .json(
        response_error(
          500,
          "Error en el servidor intente nuevamente " + error["sqlMessage"]
        )
      );
  }
};
