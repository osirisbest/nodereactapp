import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


class App extends Component {
  
  constructor (props){
    super()
    this.doNormalization=this.doNormalization.bind(this)
    this.randomCase=this.randomCase.bind(this)
  }

  state = {
    data: ''
  }
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ data: res.data }))
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

  randomCase(){
    let outDim= [];
    let x=[...'abcdefghijklmnopqrstuvwxyz']
    let lines=parseInt(Math.random()*4+1)
    for (let i=0;i<lines;i++){
      let length=parseInt(Math.random()*20+1)
      let string='';
      for (let z=0;z<length;z++){
        string+=getRandomLetter();
      }
      outDim.push(string)
    }
    
    this.setState({data:outDim.join(',')})
    
    function getRandomLetter(){
        return x[parseInt(Math.random()*x.length)]
    }
    
  }

  doNormalization(){
    let strNormalize=(str)=>{
      let strArr=[...str]
      let i=0
      while (i<strArr.length){
        if(strArr[i].length!==1) break //we moved all letter to the end
        if(i+1===strArr.length) break //the last letter
        if(!isVowel(strArr[i])&&isVowel(strArr[i+1])){
          i+=2
          continue;
        } else if(isVowel(strArr[i])){
           strArr.push(strArr.splice(i,1)[0]+'*')
        } else if (!isVowel(strArr[i])&&!isVowel(strArr[i+1])){
          strArr.push(strArr.splice(i,1)[0]+'*')
        }
      }
      //prepare to return
      strArr=strArr.map(
        function(el){
          return el[0]
        }
      )
      let outStr=strArr.join('')+''

      return outStr
      }
    let data=(this.state.data+"").split(',')
    
    function isVowel(letter){
      return Boolean("aeiouy".indexOf(letter)!==-1)
    }
    let newdata=data.map(
      function (el){return strNormalize(el)}
    )
    this.setState({data: newdata.join(',')})
    
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is react with gate to NodeJS Express</h1>
        </header> */}
        <p className="App-intro">
        { this.state.data }
        </p>

        <button onClick={this.randomCase}>
        отобразить случайный вариант
        </button>
        <button onClick={this.doNormalization}>
        Нормализовать строки
        </button>
      </div>
      
    );
  }
}

export default App;
