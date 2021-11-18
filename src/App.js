import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {  Route, Switch } from "react-router-dom"
import Gameplay from './Components/Gameplay/gamePlay';
import AppBar from './Components/AppBar/AppBar';
import AnimalCard from './Components/AnimalCard/animalCard';
import { ToastContainer,toast } from 'react-toastify';


export default function App() {
  useEffect(()=>{
    
  })
  return (
    <div className="App">
      <ToastContainer/>
      <AppBar/>
      <Switch>
      <Route exact path="/" component ={Home}/>
      <Route exact path ="/gamePlay/:gcard/:ucard" component={Gameplay}/>
      </Switch>
    </div>
  )
}
