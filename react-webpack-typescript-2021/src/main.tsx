import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , HashRouter as Router} from 'react-router-dom';
import Application from './components/application/Application';
import { inDev } from './utils/helpers';

// Say something
console.log('[RWT] : Execution started');

// Application to Render
const app = (<Router>
    <Application title='RWT Boilerplate' version='1.0.0' />
</Router>)

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();