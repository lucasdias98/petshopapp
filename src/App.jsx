import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import Clientes from './componentes/telas/clientes/Clientes';
import Animais from './componentes/telas/animais/Animais';
import Tipos from './componentes/telas/tipos/Tipos';
import Login from './componentes/telas/login/Login';
import MenuPrivado from './componentes/MenuPrivado';
import MenuPublico from './componentes/MenuPublico'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPublico />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route path="/privado" element={<MenuPrivado />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="clientes" element={<Clientes />} />
          <Route exact="true" path="animais" element={<Animais />} />
          <Route exact="true" path="tipos" element={<Tipos />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




