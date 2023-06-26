import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Livro } from "../models/livro.model";

function CadastroLivro() {
  const [livros, setLivros] = useState([] as Livro[]);
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [livroId, setLivroId] = useState("");
  const [autor, setAutor] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [livroIdDeletar, setLivroIdDeletar] = useState("");
  const [exibirLista, setExibirLista] = useState(false);

  useEffect(() => {
    listarLivros();
  }, []);

  function listarLivros() {
    axios
      .get("http://localhost:3000/livros")
      .then((resposta) => {
        setLivros(resposta.data.livros);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function cadastrarLivro() {
    let livro = new Livro();
    livro.nome = nome;
    livro.autor = autor;
    livro.categoria = categoria;
    livro.ano = ano;
    livro.quantidade = quantidade;

    axios
      .post("http://localhost:3000/livros", livro)
      .then((resposta) => {
        console.log(resposta.data);
        listarLivros();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function atualizarLivro() {
    const livroAtualizado = {
      nome: novoNome,
      categoria: categoria
    };

    axios
      .put(`http://localhost:3000/livros/${livroId}`, livroAtualizado)
      .then((resposta) => {
        console.log(resposta.data);
        listarLivros();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function deletarLivro() {
    axios
      .delete(`http://localhost:3000/livros/${livroIdDeletar}`)
      .then((resposta) => {
        console.log(resposta.data);
        listarLivros();
      })
      .catch((erro) => {
        if (erro.response && erro.response.data && erro.response.data.message) {
          alert(erro.response.data.message);
        } else {
          console.log(erro);
        }
      });
  }

  function exibirListaLivros() {
    setExibirLista(true);
    listarLivros();
  }

  function ocultarListaLivros() {
    setExibirLista(false);
  }

  return (
    <div>
      <h1>Cadastrar Livros</h1>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          onChange={(event) => setNome(event.target.value)}
        />
      </div>
      <div>
        <label>Categoria:</label>
        <input
          type="text"
          onChange={(event) => setCategoria(event.target.value)}
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          onChange={(event) => setAutor(event.target.value)}
        />
      </div>
      <div>
        <label>Quantidade:</label>
      <input
         type="text"
         onChange={(event) => setQuantidade(parseInt(event.target.value, 10))}
          />
        </div>
      <div>
        <label>Ano:</label>
        <input
          type="text"
          onChange={(event) => setAno(parseInt(event.target.value, 10))}
        />
      </div>
      <div>
        <button onClick={cadastrarLivro}>Cadastrar</button>
      </div>
      <br />
      <br />
      <div>
        <h2>Alterar Livro</h2>
        <div>
          <label>Novo Nome:</label>
          <input
            type="text"
            onChange={(event) => setNovoNome(event.target.value)}
          />
          <label>Categoria:</label>
          <input
            type="text"
            onChange={(event) => setCategoria(event.target.value)}
          />
        </div>
        <div>
          <label>ID do Livro:</label>
          <input
            type="text"
            onChange={(event) => setLivroId(event.target.value)}
          />
          <button onClick={atualizarLivro}>Alterar</button>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>Deletar Livro</h2>
        <div>
          <label>ID do Livro:</label>
          <input
            type="text"
            onChange={(event) => setLivroIdDeletar(event.target.value)}
          />
          <button onClick={deletarLivro}>Deletar</button>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>Listar Livros</h2>
        {!exibirLista ? (
          <button onClick={exibirListaLivros}>Listar Todos</button>
        ) : (
          <button onClick={ocultarListaLivros}>Ocultar Lista</button>
        )}
        {exibirLista && (
          <ul>
            {livros.map((livro) => (
              <li key={livro.id}>
                ID: {livro.id}, Nome: {livro.nome}, Autor: {livro.autor}, Categoria: {livro.categoria}, Ano: {livro.ano}, Quantidade: {livro.quantidade}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
      <br />
      <div>
        <Link to="/">
          <button>Ir para a página inicial</button>
        </Link>
      </div>
      <br />
      <br />
      <div>
        <Link to="/CadastroEmprestimo">
          <button>Ir para empréstimos</button>
        </Link>
      </div>
      <br />
      <br />
      <div>
        <Link to="/CadastroCliente">
          <button>Ir para cliente</button>
        </Link>
      </div>
    </div>
  );
}

export default CadastroLivro;
