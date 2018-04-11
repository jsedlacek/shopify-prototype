import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './routes/home';
import Settings from './routes/settings';
import { useLinkComponent } from '@shopify/polaris';
import AdapterLink from './components/adapter-link';
import Demo from './routes/demo';

useLinkComponent(AdapterLink);

function App() {
  return (
    <Router forceRefresh={false}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/demo" component={Demo} />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
