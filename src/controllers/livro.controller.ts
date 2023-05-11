import { Request, Response } from "express";
import { Livro } from "../models/livro.model";

//let produtos : Produto[] = [];

export class LivroController{

    // listar(request: Request, response: Response): Response {
    //     return response.status(200).json({ message : "Ok", dados : produtos});
    // }

    // buscar(request: Request, response: Response) : Response{
    //     // const nome = request.params.nome;
    //     const { nome } = request.params;
    //     //Laço tradicional - index
    //     //Foreach
    //     for(let produtoCadastrado of produtos){
    //         if(produtoCadastrado.nome == nome){
    //             return response.status(200).json(
    //                 { message: "Ok", dados : produtoCadastrado });
    //         }

    //     }
    //     return response.status(404).json({message : "Prosuto não escontrado!"});
    //     //Find
    // }
    
    // cadastrar(request: Request, response: Response) : Response{
    //     let livro : Livro = new Livro();
    // livro.titulo = request.body.titulo;
    // livro.autor = request.body.autor;
    // livro.categoria = request.body.categoria;
    // livro.ano = request.body.ano;
    //produtos.push(livro);
    
    // return response
    // .status(201)
    // .json
    // ({message : "Produto cadastrado!", produtos : produto});
    // }
}