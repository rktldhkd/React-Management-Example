import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class App extends React.Component{
  render(){
    return (
      <div className="gray-background">
        <img src={logo} alt="logo" />
        <h2>Let's develop react management system!</h2>
      </div>
    );//return
  }//render()
}//class

export default App;
