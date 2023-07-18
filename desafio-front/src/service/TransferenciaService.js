import axios from 'axios';

const TransferenciaService = {
  obterTodasTransferencias: () => {
    return axios.get('http://localhost:8080/api/transferencia/')
      .then(response => response.data)
      .catch(error => {
        console.error('Erro ao obter as transferências:', error);
        throw new Error('Não foi possível obter as transferências.');
      });
  },

  obterTransferenciasPorPeriodoTempo: (dataInicial, dataFinal) => {
    return axios.get('http://localhost:8080/api/transferencia/por-periodo', {
      params: {
        dataInicial,
        dataFinal
      }
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Erro ao obter as transferências por período de tempo:', error);
        throw new Error('Não foi possível obter as transferências por período de tempo.');
      });
  },

  obterTransferenciasPorNomeOperador: (nomeOperador) => {
    return axios.get('http://localhost:8080/api/transferencia/por-operador', {
      params: {
        nomeOperadorTransacao: nomeOperador
      }
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Erro ao obter as transferências por nome do operador:', error);
        throw new Error('Não foi possível obter as transferências por nome do operador.');
      });
  }
};

export default TransferenciaService;
