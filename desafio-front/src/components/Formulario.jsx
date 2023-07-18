import React from 'react';


function Formulario() {
  return (
    <div className="form-container">
      <div className="form-row">
        <div className="input-container">
          <label htmlFor="dataInicio">Data de início:</label>
          <input type="date" id="dataInicio" className="input-field" />
        </div>

        <div className="input-container">
          <label htmlFor="dataFim">Data de fim:</label>
          <input type="date" id="dataFim" className="input-field" />
        </div>

        <div className="input-container">
          <label htmlFor="nomeOperador">Nome do operador transacionado:</label>
          <input type="text" id="nomeOperador" className="input-field" />
        </div>

      </div>

      <div className="form-row">
        <button type="button">Pesquisar</button>
      </div>
    </div>
  );
}

export default Formulario;
