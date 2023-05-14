import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EmprestimoController {

async cadastrar(req: Request, res: Response) {
  const { clienteId, livroId } = req.body

  try {
    const emprestimo = await prisma.emprestimo.create({
      data: {
        cliente: { connect: { id: clienteId } },
        livro: { connect: { id: livroId } }
      }
    })

    return res.json({ message: 'Empréstimo cadastrado com sucesso!', emprestimo })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao cadastrar empréstimo.' })
  }
}

  async listarEmprestimos(req: Request, res: Response): Promise<Response> {
    try {
      const emprestimos = await prisma.emprestimo.findMany();
      return res.json({ emprestimos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar empréstimos" });
    }
  }

  async buscarEmprestimo(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const emprestimo = await prisma.emprestimo.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      return res.json({ emprestimo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar emprestimo" });
    }
  }

  async deletarEmprestimo(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await prisma.emprestimo.delete({
        where: {
          id: parseInt(id)
        }
      });

      return res.json({ message: "Empréstimo deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar empréstimo" });
    }
  }
  
  async devolverEmprestimo(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
      const emprestimo = await prisma.emprestimo.update({
        where: {
          id: Number(id),
        },
        data: {
          devolvido: true,
        },
        include: {
          livro: true,
          cliente: true,
        },
      });
      
      return res.json(emprestimo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao devolver empréstimo' });
    }
  }
}

export default EmprestimoController;
