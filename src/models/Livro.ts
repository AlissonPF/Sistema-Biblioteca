// import { Prisma } from '.prisma/client';

// export interface Livro {
//   id: number;
//   titulo: string;
//   autor: string;
//   ano: string;
//   quantidade: number;
// }

// export type LivroInput = Prisma.LivroCreateInput;
// import { Prisma, PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export interface Livro {
//   nome: string;
//   autor: string;
//   categoria: string;
//   ano: number;
//   quantidade: number;
// }

// export interface LivroUpdateInput {
//   id: number;
//   nome?: string;
//   autor?: string;
//   categoria?: string;
//   ano?: number;
//   quantidade?: number;
// }

// export class LivroModel {
//   async listarLivros(): Promise<LivroCreateInput[]> {
//     const livros = await prisma.livro.findMany();
//     return livros;
//   }

//   async buscarLivro(id: number): Promise<LivroCreateInput | null> {
//     const livro = await prisma.livro.findUnique({ where: { id } });
//     return livro;
//   }

//   async cadastrarLivro(livroData: LivroCreateInput): Promise<LivroCreateInput> {
//     const livro = await prisma.livro.create({ data: livroData });
//     return livro;
//   }

//   async atualizarLivro(livroData: LivroUpdateInput): Promise<LivroCreateInput | null> {
//     const { id, ...data } = livroData;
//     const livro = await prisma.livro.update({
//       where: { id },
//       data,
//     });
//     return livro;
//   }

//   async deletarLivro(id: number): Promise<LivroCreateInput | null> {
//     const livro = await prisma.livro.delete({ where: { id } });
//     return livro;
//   }
// }
