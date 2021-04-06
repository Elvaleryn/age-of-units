import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const { PUBLIC_URL } = process.env;

console.log(PUBLIC_URL);
ReactDOM.render(
    <App
     />,
  document.getElementById('root')
);
