import { db_pool_connection } from "../database/db.js";
import {
  response_bad_request,
  response_created,
  response_error,
  response_success,
} from "../responses/responses.js";

export const getSaleById = async (req, res) => {
  try {
    const id_sale = req.params.id_sale;
    const [result] = await db_pool_connection.query(
      `SELECT sales_date, customer_name, total FROM sales WHERE id_sale = ? AND id_store = ?`,
      [id_sale, req.id_store],
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json(response_bad_request("Error fetching the sale"));
    }
    res
      .status(200)
      .json(response_success(result, "Sale retrieved successfully"));
  } catch (error) {
    console.error("Server error while fetching sale:", error);
    return res
      .status(500)
      .json(response_error(500, "Server error while fetching sale"));
  }
};

export const getAllSales = async (req, res) => {
  try {
    const [result] = await db_pool_connection.query(
      `SELECT s.id_sales, s.sales_date, s.customer_name, s.total,
        GROUP_CONCAT(CONCAT(sd.quantity, 'x ', p.product_name) SEPARATOR ', ') AS products
      FROM sales s
        JOIN sales_detail sd ON s.id_sales = sd.id_sale
        JOIN products p ON sd.id_product = p.id_product
      WHERE s.id_store = ?
      GROUP BY 
        s.id_sales
      ORDER BY 
        s.sales_date DESC`,
      [req.id_store],
    );

    if (result.length === 0) {
      return res
        .status(400)
        .json(
          response_bad_request(
            "Error fetching sales: no sales have been made yet",
          ),
        );
    }

    res
      .status(200)
      .json(response_success(result, "Sales retrieved successfully"));
  } catch (error) {
    console.error("Server error while fetching sales:", error.message);
    return res
      .status(500)
      .json(response_error(500, "Server error while fetching sales"));
  }
};

export const createSale = async (req, res) => {
  const { customer_name, items } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json(response_bad_request("No products provided for the sale."));
  }

  let connection;

  try {
    connection = await db_pool_connection.getConnection();
    await connection.beginTransaction();

    const product_ids = items.map((item) => item.id_product);

    const [products_db] = await connection.query(
      `SELECT id_product, product_name, product_price, stock FROM products WHERE id_product IN (?) FOR UPDATE`,
      [product_ids],
    );

    const products_map = new Map(products_db.map((p) => [p.id_product, p]));

    let total = 0;
    const sales_detail_data = [];
    const stock_update_promises = [];
    const sold_products = [];

    for (const item of items) {
      const product_data = products_map.get(item.id_product);

      if (product_data.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product "${product_data.product_name}".`,
        );
      }

      const subtotal = item.quantity * product_data.product_price;
      total += subtotal;

      sales_detail_data.push([
        item.id_product,
        item.quantity,
        product_data.product_price,
      ]);

      sold_products.push({
        id_product: item.id_product,
        name: product_data.product_name,
        quantity: item.quantity,
        unit_price: product_data.product_price,
        subtotal: subtotal,
      });

      stock_update_promises.push(
        connection.query(
          `UPDATE products SET stock = stock - ? WHERE id_product = ?`,
          [item.quantity, item.id_product],
        ),
      );
    }

    const [sale_result] = await connection.query(
      `INSERT INTO sales (customer_name, total) VALUES (?, ?)`,
      [customer_name, total],
    );
    const id_sale = sale_result.insertId;

    const sales_detail_values = sales_detail_data.map((d) => [id_sale, ...d]);

    await connection.query(
      `INSERT INTO sales_detail (id_sale, id_product, quantity, unit_price) VALUES ?`,
      [sales_detail_values],
    );

    await Promise.all(stock_update_promises);

    await connection.commit();
    res
      .status(201)
      .json(
        response_created(
          { id_sale, total, items: sold_products },
          "Sale created successfully",
        ),
      );
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error creating sale:", error.message);
    if (error.message.includes("Insufficient stock")) {
      return res.status(400).json(response_bad_request(error.message));
    }
    res
      .status(500)
      .json(
        response_error(500, "Internal server error while processing the sale."),
      );
  } finally {
    if (connection) connection.release();
  }
};

export const metrics = async (req, res) => {
  try {
    const [lowStockProducts] = await db_pool_connection.query(
      "Select count(*) as lowStockProducts from products where stock <= 5;",
      [req.id_store],
    );

    const [totalIncome] = await db_pool_connection.query(
      "SELECT SUM(total) as total_sum FROM sales;",
      [req.id_store],
    );
    const [todaySales] = await db_pool_connection.query(
      "SELECT COUNT(*) AS total FROM sales WHERE DATE(sales_date) = CURDATE();",
      [req.id_store],
    );

    res.status(200).json(
      response_success(
        {
          lowStockProducts: lowStockProducts[0].lowStockProducts,
          totalIncome: totalIncome[0].total_sum,
          todaySales: todaySales[0].total,
        },
        "Total sales data retrieved successfully",
      ),
    );
  } catch (error) {
    console.error("Server error while fetching sales metrics:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error while fetching total sales data"),
      );
  }
};

export const monthPerformance = async (req, res) => {
  try {
    const [data] = await db_pool_connection.query(
      `SELECT DATE(sales_date) AS dia, COUNT(*) AS total 
      FROM sales 
      WHERE sales_date >= CURDATE() - INTERVAL 30 DAY AND id_store = ?
      GROUP BY dia 
      ORDER BY dia`,
      [req.id_store],
    );

    res
      .status(200)
      .json(
        response_success(data, "Monthly performance retrieved successfully"),
      );
  } catch (error) {
    console.error("Server error while fetching monthly performance:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error while fetching monthly performance"),
      );
  }
};

export const statics = async (req, res) => {
  try {
    const [todayResult] = await db_pool_connection.query(
      "SELECT SUM(total) AS total_ventas FROM sales WHERE DATE(sales_date) = CURRENT_DATE;",
      [req.id_store],
    );

    const [yesterdayResult] = await db_pool_connection.query(
      "SELECT SUM(total) AS total_ventas FROM sales WHERE DATE(sales_date) = CURDATE() - INTERVAL 1 DAY;",
      [req.id_store],
    );

    const todaySales = parseFloat(todayResult[0].total_ventas || 0);
    const yesterdaySale = parseFloat(yesterdayResult[0].total_ventas || 0);

    let change = 0;

    if (yesterdaySale > 0) {
      change = ((todaySales - yesterdaySale) / yesterdaySale) * 100;
    } else if (todaySales > 0) {
      change = 100;
    }

    res.status(200).json(
      response_success(
        {
          ventasDeHoy: todaySales.toFixed(2),
          ventasDeAyer: yesterdaySale.toFixed(2),
          cambioPorcentual: change.toFixed(2),
        },
        "KPI data",
      ),
    );
  } catch (error) {
    console.error("Server error while getting KPI data:", error);
    return res
      .status(500)
      .json(
        response_error(500, "Server error while getting KPI data: " + error),
      );
  }
};
