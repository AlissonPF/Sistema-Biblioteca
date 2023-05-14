import { Request, Response } from 'express';
//import { Cliente } from '../models/Cliente';
import { prisma } from '..';

export class ClienteController{
  cadastrarCliente = async (req: Request, res: Response): Promise<Response> => {
    const { nome, email, cpf } = req.body;
  
    try {
      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          cpf,
        },
      });
  
      return res.status(201).json(novoCliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível cadastrar o cliente.' });
    }
  };
  
  listarClientes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const clientes = await prisma.cliente.findMany();
  
      return res.status(200).json(clientes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível listar os clientes.' });
    }
  };
  
  buscarClientePorId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
  
    try {
      const cliente = await prisma.cliente.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }
  
      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível buscar o cliente.' });
    }
  };
  
  atualizarCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nome, email, cpf } = req.body;
  
    try {
      const cliente = await prisma.cliente.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          email,
          cpf,
        },
      });
  
      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível atualizar o cliente.' });
    }
  };
  
  deletarCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
  
    try {
      await prisma.cliente.delete({
        where: {
          id: Number(id),
        },
      });
  
      return res.json({ message: "Cliente deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível deletar o cliente.' });
    }
  };

}
