import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.newForm);
router.post("/", postController.createFromForm);
router.get("/:id/edit", postController.editForm);
router.post("/:id/update", postController.updateFromForm);
router.post("/:id/delete", postController.delete);

export default router;
