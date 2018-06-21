import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button,ButtonGroup  } from 'reactstrap';

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
    (async () => {
      const rawResponse = await fetch('http://localhost:5000/api/putData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:this.state.data})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
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
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  randomCase(){
    let outDim= [];
    let x=[...'abcdefghijklmnopqrstuvwxyz']
    let lines=parseInt(Math.random()*4+1,10)
    for (let i=0;i<lines;i++){
      let length=parseInt(Math.random()*10+1,10)
      let string='';
      for (let z=0;z<length;z++){
        string+=getRandomLetter();
      }
      outDim.push(string)
    }
    
    this.setState({data:outDim.join(',')})
    
    function getRandomLetter(){
        return x[parseInt(Math.random()*x.length,10)]
    }
    
  }

  doNormalization(){
    let dimForVowel=[];
    this.setState({dataBefor:this.state.data});
    let strNormalize=(str)=>{
      
      let strArr=[...str]
      let i=0
      while (i<strArr.length){
        if(strArr[i].length!==1) break //we moved all  to the end
        if(i+1===strArr.length) break //the last
        if(!isVowel(strArr[i])&&isVowel(strArr[i+1])){
          i+=2
          continue;
        } else if(isVowel(strArr[i])){
          
          dimForVowel.push(strArr.splice(i,1)[0])
          console.log(dimForVowel)
        } else if (!isVowel(strArr[i])&&!isVowel(strArr[i+1])){ 
           strArr.push(strArr.splice(i,1)[0]+'*')        }
      }
      //prepare to return
      //
      strArr=strArr.map(
        function(el){
          return el[0]
        }
      )
      
      return strArr.join('')
      }
    let data=(this.state.data+"").split(',')
    
    function isVowel(letter){
      return Boolean("aeiouy".indexOf(letter)!==-1)
    }
    for (let i=0;i<data.length;i++){
      data[i]=strNormalize(data[i])
      if (dimForVowel.length>0){
        if (i+1!=data.length){
          data[i+1]=data[i+1]+dimForVowel.join('')
          dimForVowel=[]
        }else{
          data[i]=data[i+1]+dimForVowel.join('')
          dimForVowel=[]
        }

      }
    }
    // let newdata=data.map(
    //   function (el){
    //     if (dimForVowel.length>0){}
    //     return strNormalize(el)}
    // )
    this.setState({data: data.join(',')})
    }

  render() {
    return (
      <div className="App">
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
        <ButtonGroup vertical color="primary" size="lg">
        <Button onClick={this.initialState} color="primary"  >
        Исходное состояние(пустое)
        </Button>
        <br />        
        <Button onClick={this.randomCase} color="success"   >
        отобразить случайный вариант
        </Button>
        <br /> 
        <Button onClick={this.doNormalization} color="success"  >
        Нормализовать строки
        </Button>
        <br /> 
        <Button onClick={this.redo}  color="primary" >
        Исходное состояние(до нормализации)
        </Button>
        <br /> 
        <Button onClick={this.save}  color="info">
        Записать на сервер
        </Button>
        <br /> 
        <Button onClick={this.load}  color="info">
        Считать с сервера
        </Button>
        </ButtonGroup> 
      </div>
      
    );
  }
}

export default App;
