import express from "express";
import cors from "cors";
import { PORT, config_core } from "./src/config/config.js";
import user_routes from "./src/routes/user_routes.js";
import products_routes from "./src/routes/products_routes.js";
import sales_routes from "./src/routes/sales_routes.js";

const app = express();

app.use(
  cors({
    origin: config_core.application.cors.server.origin,
    credentials: config_core.application.cors.server.credentials,
  })
);

app.use(express.json());

app.use(user_routes);
app.use(products_routes);
app.use(sales_routes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no válida" });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + PORT);
});
