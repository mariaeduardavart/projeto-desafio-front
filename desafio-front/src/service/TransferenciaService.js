import axios from 'axios';

class TransferenciaService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8080/api';
  }

  async obterTodasTransferencias() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/transferencia`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter as transferências:', error);
      throw new Error('Não foi possível obter as transferências.');
    }
  }

  async obterTransferenciasPorPeriodoTempo(dataInicial, dataFinal) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/transferencia/por-periodo`, {
        params: {
          dataInicial,
          dataFinal,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter as transferências por período de tempo:', error);
      throw new Error('Não foi possível obter as transferências por período de tempo.');
    }
  }

  async obterTransferenciasPorNomeOperador(nomeOperador) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/transferencia/por-operador`, {
        params: {
          nomeOperadorTransacao: nomeOperador,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter as transferências por nome do operador:', error);
      throw new Error('Não foi possível obter as transferências por nome do operador.');
    }
  }
}

export default TransferenciaService;
