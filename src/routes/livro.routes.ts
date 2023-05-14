import express from "express";
import { LivroController } from "../controllers/LivroController";
const router = express.Router();
const livroController = new LivroController;

router.get("/livros", livroController.listarLivros);// Funcionando
router.get("/livros/:id", livroController.buscarLivro);// Funcionando
router.post("/livros", livroController.cadastrarLivro);// Funcionando
router.put("/livros/:id", livroController.atualizarLivro);// Funcionando
router.delete("/livros/:id", livroController.deletarLivro);// Funcionando

export default router;
