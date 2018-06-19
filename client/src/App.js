import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.data }))
      .then(res=>console.log(res.data))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    console.log(response)
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  doNormalization(){
    alert('Normalize!');
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is react with gate to NodeJS Express</h1>
        </header> */}
        <p className="App-intro">
        { this.state.response }
        </p>
        <button onClick={this.doNormalization}>
        Нормализовать строки
        </button>
      </div>
      
    );
  }
}

export default App;
