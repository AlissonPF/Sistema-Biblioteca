import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();
const clienteController = new ClienteController();

router.get('/clientes', clienteController.listarClientes);// Funcionando
router.get('/clientes/:id', clienteController.buscarClientePorId);// Funcionando
router.post('/clientes', clienteController.cadastrarCliente);// Funcionando
router.put('/clientes/:id', clienteController.atualizarCliente);// Funcionando
router.delete('/clientes/:id', clienteController.deletarCliente);// Funcionando

export default router;
