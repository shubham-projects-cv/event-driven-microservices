import { FastifyInstance } from "fastify";
import {
  createCtrl,
  listCtrl,
  updateCtrl,
  deleteCtrl,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const productRoutes = async (app: FastifyInstance) => {
  // 🔐 Protect ALL product routes
  app.addHook("preHandler", authMiddleware);

  // CRUD routes
  app.post("/", createCtrl);
  app.get("/", listCtrl);
  app.put("/:id", updateCtrl);
  app.delete("/:id", deleteCtrl);
};
