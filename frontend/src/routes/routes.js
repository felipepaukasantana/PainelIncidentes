import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../views/dashboard/index';
import Recursos from '../views/recursos/index';
import Base from '../views/base/index';
import Cawa from '../views/cawa/index';
import Violacoes from '../views/violacoes/index';
import Pendencias from '../views/pendencias/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Base} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/recursos" component={Recursos} />
      <Route path="/cawa" component={Cawa} />
      <Route path="/violacoes" component={Violacoes} />
      <Route path="/pendencias" component={Pendencias} />
    </BrowserRouter>
  );
}
