import axios from "axios";
import { useState, useEffect } from "react";
import { Cliente } from "../models/cliente.model";
import { Link } from "react-router-dom";

function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [exibirLista, setExibirLista] = useState(false);
  const [clienteIdDeletar, setClienteIdDeletar] = useState("");
  const [clienteIdAlterar, setClienteIdAlterar] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novoEmail, setNovoEmail] = useState("");

  useEffect(() => {
    listarClientes();
  }, []);

  function listarClientes() {
    axios
      .get("http://localhost:3000/clientes")
      .then((resposta) => {
        setClientes(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function cadastrarCliente() {
    let novoCliente = new Cliente();
    novoCliente.nome = nome;
    novoCliente.cpf = cpf;
    novoCliente.email = email;

    axios
      .post("http://localhost:3000/clientes", novoCliente)
      .then((resposta) => {
        console.log(resposta.data);
        listarClientes();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function exibirListaClientes() {
    setExibirLista(true);
    listarClientes();
  }

  function ocultarListaClientes() {
    setExibirLista(false);
  }

  function deletarCliente() {
    axios
      .delete(`http://localhost:3000/clientes/${clienteIdDeletar}`)
      .then((resposta) => {
        console.log(resposta.data);
        listarClientes();
      })
      .catch((erro) => {
        if (erro.response && erro.response.data && erro.response.data.message) {
          alert(erro.response.data.message);
        } else {
          console.log(erro);
        }
      });
  }

  function alterarCliente() {
    const clienteAtualizado = {
      nome: novoNome,
      cpf: novoCpf,
      email: novoEmail,
    };

    axios
      .put(`http://localhost:3000/clientes/${clienteIdAlterar}`, clienteAtualizado)
      .then((resposta) => {
        console.log(resposta.data);
        listarClientes();
        setClienteIdAlterar("");
        setNovoNome("");
        setNovoCpf("");
        setNovoEmail("");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Clientes</h1>
      <div>
        <label>Nome:</label>
        <input type="text" onChange={(event) => setNome(event.target.value)} />
      </div>
      <div>
        <label>CPF:</label>
        <input type="text" onChange={(event) => setCpf(event.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <button onClick={cadastrarCliente}>Cadastrar</button>
      </div>
      <br />
      <br />
      <div>
        <h2>Alterar Cliente</h2>
        <div>
          <label>ID do Cliente:</label>
          <input
            type="text"
            onChange={(event) => setClienteIdAlterar(event.target.value)}
          />
        </div>
        <div>
          <label>Novo Nome:</label>
          <input
            type="text"
            onChange={(event) => setNovoNome(event.target.value)}
          />
        </div>
        <div>
          <label>Novo Cpf:</label>
          <input
            type="text"
            onChange={(event) => setNovoCpf(event.target.value)}
          />
        </div>
        <div>
          <label>Novo Email:</label>
          <input
            type="text"
            onChange={(event) => setNovoEmail(event.target.value)}
          />
        </div>
        <button onClick={alterarCliente}>Alterar Cliente</button>
      </div>
      <br />
      <br />
      <div>
        <h2>Deletar Cliente</h2>
        <div>
          <label>ID do Cliente:</label>
          <input
            type="text"
            onChange={(event) => setClienteIdDeletar(event.target.value)}
          />
          <button onClick={deletarCliente}>Deletar</button>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>Listar Clientes</h2>
        {!exibirLista ? (
          <button onClick={exibirListaClientes}>Listar Todos</button>
        ) : (
          <button onClick={ocultarListaClientes}>Ocultar Lista</button>
        )}
        {exibirLista && (
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id}>
                ID: {cliente.id}, Nome: {cliente.nome}, CPF: {cliente.cpf}, Email: {cliente.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Link to="/CadastroFilme">
          <button>Ir para filmes</button>
        </Link>
      </div>
      <br />
      <br />
      <div>
        <Link to="/">
          <button>Ir para a Página inicial</button>
        </Link>
      </div>
      <br />
      <br />
      <div>
        <Link to="/CadastroEmprestimo">
          <button>Ir para Empréstimos</button>
        </Link>
      </div>
      <br />
      <br />
      <div>
        <Link to="/CadastroDevolucao">
          <button>Ir para Devolução</button>
        </Link>
      </div>
    </div>
  );
}

export default CadastroCliente;
