import { FastifyInstance } from "fastify";
import {
  createCtrl,
  listCtrl,
  updateCtrl,
  deleteCtrl,
} from "../controllers/product.controller";

export const productRoutes = async (app: FastifyInstance) => {
  app.post("/", createCtrl);
  app.get("/", listCtrl);
  app.put("/:id", updateCtrl);
  app.delete("/:id", deleteCtrl);
};
