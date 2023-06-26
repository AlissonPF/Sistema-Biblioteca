import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroCliente from './components/CadastroCliente';
import CadastroLivro from './components/CadastroLivro';
import CadastroEmprestimo from './components/CadastroEmprestimo';
import PaginaApp from './components/PaginaApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaApp />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/CadastroCliente" element={<CadastroCliente />} />
        <Route path="/CadastroEmprestimo" element={<CadastroEmprestimo />} />
        </Routes>
    </Router>
  );
}

export default App;
