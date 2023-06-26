import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Emprestimo } from "../models/emprestimo.model";

function CadastroEmprestimo() {
  const [emprestimos, setEmprestimos] = useState([] as Emprestimo[]);
  const [clienteId, setClienteId] = useState(0);
  const [livroId, setLivroId] = useState(0);
  const [emprestimoId, setEmprestimoId] = useState("");
  const [exibirLista, setExibirLista] = useState(false);

  useEffect(() => {
    listarEmprestimos();
  }, []);

  function listarEmprestimos() {
    axios
      .get("http://localhost:3000/emprestimos")
      .then((resposta) => {
        setEmprestimos(resposta.data.emprestimos);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function cadastrarEmprestimo() {
    let emprestimo = new Emprestimo();
    emprestimo.clienteId = clienteId;
    emprestimo.livroId = livroId;

    axios
      .post("http://localhost:3000/emprestimos", emprestimo)
      .then((resposta) => {
        console.log(resposta.data);
        listarEmprestimos();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function deletarEmprestimo(id: string) {
    axios
      .delete(`http://localhost:3000/emprestimos/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        listarEmprestimos();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function exibirListaEmprestimos() {
    setExibirLista(true);
    listarEmprestimos();
  }

  function ocultarListaEmprestimos() {
    setExibirLista(false);
  }

  return (
    <div>
      <h1>Cadastrar Empréstimos</h1>
      <div>
        <label>ID do Cliente:</label>
        <input
          type="text"
          onChange={(event) => setClienteId(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label>ID do Livro:</label>
        <input
          type="text"
          onChange={(event) => setLivroId(parseInt(event.target.value))}
        />
      </div>
      <div>
        <button onClick={cadastrarEmprestimo}>Cadastrar</button>
      </div>
      <br />
      <br />
      <div>
        <h2>Listar Empréstimos</h2>
        {!exibirLista ? (
          <button onClick={exibirListaEmprestimos}>Listar Todos</button>
        ) : (
          <button onClick={ocultarListaEmprestimos}>Ocultar Lista</button>
        )}
        {exibirLista && (
          <ul>
            {emprestimos.map((emprestimo) => (
              <li key={emprestimo.id}>
                ID: {emprestimo.id}, ClienteID: {emprestimo.clienteId}, LivroID: {emprestimo.livroId}
                <button onClick={() => deletarEmprestimo(emprestimo.id.toString())}>
                      Deletar
                </button>
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
        <Link to="/CadastroLivro">
          <button>Ir para livros</button>
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

export default CadastroEmprestimo;
