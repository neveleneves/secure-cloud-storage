import React from 'react'
import ReactDOM from 'react-dom'

//Include styles 
import './reset.css'
import './index.css'

//Include main component
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);