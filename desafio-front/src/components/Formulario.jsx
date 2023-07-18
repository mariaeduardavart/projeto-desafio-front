import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import TransferenciaService from '../service/TransferenciaService';
import Tabela from './Tabela';

function Formulario() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
  const [dadosTabela, setDadosTabela] = useState([]);
  const [aviso, setAviso] = useState('');
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);

  const handlePesquisar = async () => {
    try {
      if (dataInicio && dataFim) {
        const dataInicioFormatada = format(new Date(dataInicio), 'yyyy-MM-dd');
        const dataFimFormatada = format(new Date(dataFim), 'yyyy-MM-dd');

        const transferencias = await TransferenciaService.obterTransferenciasPorPeriodoTempo(dataInicioFormatada, dataFimFormatada);
        setDadosTabela(transferencias);

        // Calcular saldo do período
        const saldoPeriodo = transferencias.reduce((total, transferencia) => total + transferencia.valor, 0);
        setSaldoPeriodo(saldoPeriodo);
      } else if (nomeOperador) {
        const transferencias = await TransferenciaService.obterTransferenciasPorNomeOperador(nomeOperador);
        setDadosTabela(transferencias);

        // Calcular saldo do período
        const saldoPeriodo = transferencias.reduce((total, transferencia) => total + transferencia.valor, 0);
        setSaldoPeriodo(saldoPeriodo);
      } else {
        const transferencias = await TransferenciaService.obterTodasTransferencias();
        setDadosTabela(transferencias);

        // Calcular saldo do período
        const saldoPeriodo = transferencias.reduce((total, transferencia) => total + transferencia.valor, 0);
        setSaldoPeriodo(saldoPeriodo);
      }
      
      // Limpar os inputs após a pesquisa
      setDataInicio('');
      setDataFim('');
      setNomeOperador('');
      // Exibir aviso de sucesso
      setAviso('Pesquisa realizada com sucesso.');
    } catch (error) {
      console.error('Erro ao pesquisar transferências:', error);
      // Exibir aviso de erro
      setAviso('Erro ao pesquisar transferências. Por favor, tente novamente.');
      // Lidar com erros
    }
  };

  const handleCloseAviso = () => {
    setAviso('');
  };

  return (
    <div className="form-container">
      <div className="form-row">
        <div className="input-container">
          <label htmlFor="dataInicio">Data de início:</label>
          <input
            type="date"
            id="dataInicio"
            className="input-field"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="dataFim">Data de fim:</label>
          <input
            type="date"
            id="dataFim"
            className="input-field"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="nomeOperador">Nome do operador transacionado:</label>
          <input
            type="text"
            id="nomeOperador"
            className="input-field"
            value={nomeOperador}
            onChange={(e) => setNomeOperador(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <button type="button" onClick={handlePesquisar}>
          Pesquisar
        </button>
      </div>

      {aviso && (
        <div className="aviso-container">
          <div className="aviso">
            <p>{aviso}</p>
            <button type="button" onClick={handleCloseAviso}>
              Fechar
            </button>
          </div>
        </div>
      )}

      <Tabela dados={dadosTabela} saldoPeriodo={saldoPeriodo} />
    </div>
  );
}

export default Formulario;
