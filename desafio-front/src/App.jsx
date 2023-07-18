import React, { useState } from 'react';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';
import './app.css'; 

function App() {
  const [dadosTabela, setDadosTabela] = useState([]);

  return (
    <div className="app">
      <Formulario setDadosTabela={setDadosTabela} />
      {dadosTabela.length > 0 && <Tabela dados={dadosTabela} />}
    </div>
  );
}

export default App;
