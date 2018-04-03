import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import PokeGrid from './components/PokeGrid';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const baseUrl = 'https://pokeapi.co/api/v2';
ReactDOM.render(
  <PokeGrid baseUrl={baseUrl}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
