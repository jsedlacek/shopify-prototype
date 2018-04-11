import { useLinkComponent } from '@shopify/polaris';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AdapterLink from './components/adapter-link';
import Demo from './routes/demo';
import Home from './routes/home';
import Settings from './routes/settings';

useLinkComponent(AdapterLink);

function App() {
  return (
    <BrowserRouter forceRefresh={false}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/demo" component={Demo} />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
