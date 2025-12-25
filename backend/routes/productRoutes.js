import expres from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protectRoute } from "../middleWare/authMiddleware.js";

const router = expres.Router();

router.get("/search", getProducts);
router.get("/", getProducts);
// Add this line BEFORE your existing router.get("/:id", ...)
router.get("/search", getProducts);
router.get("/:id", protectRoute, getProduct);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
