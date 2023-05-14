import { Router } from 'express';
import { EmprestimoController } from '../controllers/EmprestimoController';

const router = Router();
const emprestimoController = new EmprestimoController();

router.post('/emprestimos', emprestimoController.cadastrar);
router.get('/emprestimos', emprestimoController.listarEmprestimos);
router.get('/emprestimos/:id', emprestimoController.buscarEmprestimo);
router.put('/emprestimos/:id', emprestimoController.devolverEmprestimo);
router.delete('/emprestimos/:id', emprestimoController.deletarEmprestimo);

export default router;
