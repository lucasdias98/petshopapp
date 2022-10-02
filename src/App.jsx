import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';
import Clientes from './componentes/telas/clientes/Clientes';
import Animais from './componentes/telas/animais/Animais';
import Tipos from './componentes/telas/tipos/Tipos';

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/clientes" element={<Clientes/>}/>
          <Route exact="true" path="/animais" element={<Animais/>}/>
          <Route exact="true" path="/tipos" element={<Tipos/>}/>
        </Routes>
    </Router>
  );
}

export default App;




