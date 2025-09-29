import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const HOST_DB = process.env.HOST_DB;
export const USER_DB = process.env.USER_DB;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const PORT_DB = process.env.PORT_DB;
export const SECRET_KEY = process.env.SECRET_JWT_KEY;

export const config_core = {
  application: {
    cors: {
      server: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    },
  },
};
