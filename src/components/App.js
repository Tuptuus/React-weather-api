import './App.css';
import React, { Component } from 'react'
import Form from './Form';
import Result from './Result';

const APIkey = "16847f8fbc0e8e0bcde24efbf66d3ec2"

class App extends Component {
  state = {  
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    error: false,
  }

  handleInputChange = (e) =>{
    this.setState({
      value: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.value.length === 0) return
    if(prevState.value !== this.state.value){
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric&lang=pl`;

      fetch(API)
      .then(response => {
        if(response.ok){
          return response
        }
        throw Error("Nie udało się")
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString()
        this.setState({
          error: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: data.name,
        })
      })
      .catch(err => {
        console.log(err)
        this.setState(prevState =>({
          error: true,
          city: prevState.value
        }))
      })
    }
  }
  render() { 
    return (  
      <div className="App">
        <Form 
          value={this.state.value} 
          change={this.handleInputChange} 
        />
        <Result
          weather={this.state}
        />
    </div>
    );
  }
}
 
export default App;
