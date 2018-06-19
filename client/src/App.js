import React, { Component } from 'react';
import './App.css';


class App extends Component {
  
  constructor (props){
    super()
    this.doNormalization=this.doNormalization.bind(this)
    this.randomCase=this.randomCase.bind(this)
    this.initialState=this.initialState.bind(this)
    this.load=this.load.bind(this)
    this.save=this.save.bind(this)
    this.redo=this.redo.bind(this)
  }

  initialState(){
    this.setState({data:''})
  }
  save(){
    fetch('http://localhost:5000/api/putData', {
      method: 'post',
     // headers: {'Content-Type':'application/json'},
     headers: {'Access-Control-Allow-Origin':'*'},
      body: JSON.stringify({
          data: this.state.data
    })
  });
  }
  load(){
    this.callApi()
      .then(res => this.setState({ data: res.data }))
      .then(res=>console.log(res.data))
      .catch(err => console.log(err));
  }
  redo(){
    this.setState({data:this.state.dataBefor})
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
    const response = await fetch('/api/getData');
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
      let length=parseInt(Math.random()*10+1)
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
    this.setState({dataBefor:this.state.data});
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
        <p>
        currentdata:
        </p>
        <h1 className="App-header">
         { this.state.data }
        </h1>

        <p>
        dataBefor:
        </p>
        <h1 className="App-header">
         { this.state.dataBefor }
        </h1>

        <button onClick={this.initialState}>
        Исходное состояние(пустое)
        </button>
        <br />        
        <button onClick={this.randomCase}>
        отобразить случайный вариант
        </button>
        <br /> 
        <button onClick={this.doNormalization}>
        Нормализовать строки
        </button>
        <br /> 
        <button onClick={this.redo}>
        Исходное состояние(до нормализации)
        </button>
        <br /> 
        <button onClick={this.save}>
        Записать на сервер
        </button>
        <br /> 
        <button onClick={this.load}>
        Считать с сервера
        </button>
      </div>
      
    );
  }
}

export default App;
