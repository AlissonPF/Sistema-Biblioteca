import { Link } from "react-router-dom";


function PaginaApp() {
return (
  <div>
    <h1>Cadastrar Clientes</h1>
    <div>
        <Link to="/CadastroCliente">
          <button>Ir para clientes</button>
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
        <Link to="/CadastroEmprestimo">
          <button>Ir para Emprestimos</button>
        </Link>
      </div>
      <br />
      <br />
  </div>
);
}

export default PaginaApp;