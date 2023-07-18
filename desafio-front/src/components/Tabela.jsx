import React, { useState } from 'react';

function Tabela({ dados, saldoPeriodo }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6; 

  const formatarData = (data) => {
    const date = new Date(data);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    return `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${ano}`;
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  
  const obterDadosPaginaAtual = () => {
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    return dados.slice(indiceInicial, indiceFinal);
  };


  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  
  const handleProximaPagina = () => {
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>Saldo total:</td>
            <td>{formatarValor(dados.reduce((total, item) => total + item.valor, 0))}</td>
            <td colSpan="1">Saldo no período:</td>
            <td>{formatarValor(saldoPeriodo)}</td>
          </tr>
          <tr>
            <th>Dados</th>
            <th>Valencia</th>
            <th>Tipo</th>
            <th>Nome do operador transacionado</th>
          </tr>
        </thead>
        <tbody>
          {obterDadosPaginaAtual().map((item, index) => (
            <tr key={index}>
              <td>{formatarData(item.dataTransferencia)}</td>
              <td>{formatarValor(item.valor)}</td>
              <td>{item.tipo}</td>
              <td>{item.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button type="button" onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleProximaPagina}
          disabled={paginaAtual === Math.ceil(dados.length / itensPorPagina)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default Tabela;
