import { db_pool_connection } from "../database/db.js";
import PDFDocument from "pdfkit";
import {
  response_bad_request,
  //response_created,
  response_error,
  response_not_found,
  response_success,
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
      return res.status(404).json(response_not_found("Venta no encontrada"));
    }

    const saleInfo = rows[0];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${id_sales}.pdf`);

    // CREACION DEL PDF

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc.fillColor("#000000").fontSize(12).text("Informacion del cliente: ", { underline: true });
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
    doc.font("Helvetica-Bold").fontSize(14).text(`TOTAL: $${saleInfo.total}`, 400, totalY, {  align: "right",});

    doc.fontSize(10).fillColor("grey").text("Gracias por su compra.", 50, 700, { align: "center", width: 500 });

    doc.end();
  } catch (error) {
    console.error("Error generando PDF:", error);
    return res.status(500).json(response_error(500, "Error al generar el reporte PDF"));
  }
};


export const all_products_report = async (req, res) => {
  const date = new Date();
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT product_name, product_description, product_price, stock, created_at FROM products WHERE stock > 0"
    );

    if (rows.length === 0) {
      return res.status(404).json(response_not_found("Productos no encontrados"));
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=inventario_${date.toISOString()}.pdf`);

    const doc = new PDFDocument({ margin: 50, bufferPages: true });
    doc.pipe(res);

    doc.fontSize(20).text("REPORTE DE INVENTARIO TOTAL", { align: 'center' });
    doc.fontSize(10).text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    const tableTop = 150;
    let currentY = tableTop;

    doc.font("Helvetica-Bold");
    generateInventoryRow(doc, currentY, "Producto", "Desc.", "Precio", "Stock", "Fecha");
    
    doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke(); // Línea divisoria
    doc.font("Helvetica").fontSize(9);

    rows.forEach((item, i) => {
      currentY += 25;

      if (currentY > 700) { 
        doc.addPage();
        currentY = 50;
      }

      generateInventoryRow(
        doc,
        currentY,
        item.product_name,
        item.product_description || "-",
        `$${item.product_price}`,
        item.stock.toString(),
        new Date(item.created_at).toLocaleDateString()
      );
    });

    doc.end();
  } catch (error) {
    console.error("Error generando reporte de inventario:", error);
    res.status(500).json(response_error(500, "Error interno del servidor"));
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

function generateInventoryRow(doc, y, name, desc, price, stock, date) {
  doc.fontSize(9)
    .text(name, 50, y, { width: 100, truncate: true })
    .text(desc, 160, y, { width: 140, truncate: true })
    .text(price, 310, y, { width: 70, align: "right" })
    .text(stock, 390, y, { width: 60, align: "right" })
    .text(date, 460, y, { width: 80, align: "right" });
}