import '../App.css';
import Signup from './Signup';
import Login from './Login';
import {useState} from 'react';

function App() {
  
  return (
    <div className="App">
      <h1>--BRD & GM--</h1>
      <small>Hi Davery :3</small>
      <Signup/>
      <Login/>
    </div>
  );
}

export default App;
