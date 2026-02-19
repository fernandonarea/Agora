import { db_pool_connection } from "../database/db.js";
import PDFDocument from "pdfkit";
import {
  response_bad_request,
  //response_created,
  response_error,
  //response_not_found,
  //response_success,
  //response_unauthorized,
} from "../responses/responses.js";

export const generate_sale_invoice = async (req, res) => {
  const { id_sales } = req.params;
  try {
    const [rows] = await db_pool_connection.query(
      `
        SELECT s.id_sales, s.sales_date, s.customer_name, s.total, 
            sd.quantity, sd.unit_price, p.product_name 
        FROM sales s
        JOIN sales_detail sd ON s.id_sales = sd.id_sale
        JOIN products p ON sd.id_product = p.id_product
        WHERE s.id_sales = ?`,
      [id_sales],
    );

    if (rows.length === 0) {
      return res.status(404).json(response_bad_request("Venta no encontrada"));
    }

    const saleInfo = rows[0];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${id_sales}.pdf`);

    // CREACION DEL PDF

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc
      .fillColor("#000000")
      .fontSize(12)
      .text("Informacion del cliente: ", { underline: true });
    doc.text(`Nombre: ${saleInfo.customer_name}`);
    doc.moveDown();

    const tableTop = 200;
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      tableTop,
      "Producto",
      "Cantidad",
      "Precio Unit",
      "SubTotal",
    );
    doc.font("Helvetica");

    let i = 0;
    rows.forEach((item) => {
      const y = tableTop + (i + 1) * 25;
      const subTotal = item.quantity * item.unit_price;
      generateTableRow(
        doc,
        y,
        item.product_name,
        item.quantity,
        `$${item.unit_price}`,
        `$${subTotal}`
      );
      i++;
    });

    const totalY = tableTop + (i + 1) * 25 + 20;
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`TOTAL: $${saleInfo.total}`, 400, totalY, {
        align: "right",
      });

    doc
      .fontSize(10)
      .fillColor("grey")
      .text("Gracias por su compra.", 50, 700, { align: "center", width: 500 });

    doc.end();
  } catch (error) {
    console.error("Error generando PDF:", error);
    return res
      .status(500)
      .json(response_error(500, "Error al generar el reporte PDF"));
  }
};

function generateTableRow(doc, y, item, quantity, price, total) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(quantity, 280, y, { width: 90, align: "right" })
    .text(price, 370, y, { width: 90, align: "right" })
    .text(total, 0, y, { align: "right" });
}