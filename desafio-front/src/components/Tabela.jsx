import React from 'react';

function Tabela({ dados, saldoPeriodo }) {
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

  return (
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
          <th>Valor</th>
          <th>Tipo</th>
          <th>Nome do operador transacionado</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            <td>{formatarData(item.dataTransferencia)}</td>
            <td>{formatarValor(item.valor)}</td>
            <td>{item.tipo}</td>
            <td>{item.nomeOperadorTransacao}</td>
          </tr>
        ))}
        
      </tbody>
    </table>
  );
}

export default Tabela;
