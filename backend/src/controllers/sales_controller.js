import { db_pool_connection } from "../database/db.js";
import {
  response_bad_request,
  response_created,
  response_error,
  response_succes,
} from "../Responses/responses.js";

export const getAllSales = async (req, res) => {
  try {
    const [result] = await db_pool_connection.query(
      `SELECT s.id_sales, s.sales_date, s.customer_name, s.total,
        GROUP_CONCAT(CONCAT(sd.quantity, 'x ', p.product_name) SEPARATOR ', ') AS products
      FROM sales s
        JOIN sales_detail sd ON s.id_sales = sd.id_sale
        JOIN products p ON sd.id_product = p.id_product
      GROUP BY 
        s.id_sales
      ORDER BY 
        s.sales_date DESC`
    );

    if (result.length === 0) {
      return res
        .status(400)
        .json(response_bad_request("Error al obtener las ventas, no se han realizado ventas aun"));
    }

    res.status(200).json(response_succes(result, "Ventas obtenidas con exito"));
  } catch (error) {
    console.log("Error en el servidor al obtener ventas ", error.message);
    return res
      .status(500)
      .json(response_error(500, "Error en el servidor al obtener ventas"));
  }
};

// export const getSaleById = async (req, res) => {
//   const id_sale = req.params;

//   try {
//     const [result] = await db_pool_connection.query(
//       `SELECT sales_date, customer_name, total FROM sales WHERE id_sale = ?`,
//       [id_sale]
//     );
//     if (result.length === 0) {
//       return res
//         .status(400)
//         .json(response_bad_request("Error al obtener las venta"));
//     }

//     res.status(200).json(response_succes(result, "Ventas obtenidas con exito"));
//   } catch (error) {
//     console.log("Error en el servidor al obtener venta ", error.message);
//     return res
//       .status(500)
//       .json(response_error(500, "Error en el servidor al obtener venta"));
//   }
// };

export const createSale = async (req, res) => {
  const { customer_name, items } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json(
        response_bad_request("No se proporcionaron productos para la venta.")
      );
  }

  let connection;
  
  try {
    connection = await db_pool_connection.getConnection();
    await connection.beginTransaction();

    const product_ids = items.map((item) => item.id_product);
    const [products_db] = await connection.query(
      `SELECT id_product, product_price, stock FROM products WHERE id_product IN (?) FOR UPDATE`,
      [product_ids]
    );

    const products_map = new Map(products_db.map((p) => [p.id_product, p]));

    let total = 0;
    const sales_detail_data = [];
    const stock_update_promises = [];

    for (const item of items) {
      const product_data = products_map.get(item.id_product);

      if (!product_data) {
        throw new Error(
          `El producto con ID ${item.id_product} no fue encontrado.`
        );
      }

      if (product_data.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto con ID ${item.id_product}.`
        );
      }

      const subtotal = item.quantity * product_data.product_price;
      total += subtotal;

      sales_detail_data.push([
        item.id_product,
        item.quantity,
        product_data.product_price,
      ]);

      stock_update_promises.push(
        connection.query(
          `UPDATE products SET stock = stock - ? WHERE id_product = ?`,
          [item.quantity, item.id_product]
        )
      );
    }

    const [sale_result] = await connection.query(
      `INSERT INTO sales (customer_name, total) VALUES (?, ?)`,
      [customer_name, total]
    );
    const id_sale = sale_result.insertId;

    const sales_detail_values = sales_detail_data.map((d) => [id_sale, ...d]);

    await connection.query(
      `INSERT INTO sales_detail (id_sale, id_product, quantity, unit_price) VALUES ?`,
      [sales_detail_values]
    );

    await Promise.all(stock_update_promises);

    await connection.commit();
    res.status(201).json(response_created(id_sale, "Venta creada con éxito"));
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error al crear la venta:", error.message);
    res
      .status(500)
      .json(response_error("Error interno del servidor al procesar la venta."));
  } finally {
    if (connection) connection.release();
  }
};