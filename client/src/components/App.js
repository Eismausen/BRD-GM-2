import '../App.css';
import {Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Signup from './Signup';
import Login from './Login';
import Inventory from './Inventory';
import Wishlist from './Wishlist';
import Browse from './Browse';
import Navbar from './Navbar';
import SeedUtil from './SeedUtil';

function App() {

  const [activeUser, setActiveUser] = useState([]);  
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    console.log("App-level useEffect");
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("Seeing user at /me");
          console.log(user);
          setActiveUser(user);          
        })
      } else {
        console.log("No session data currently");
      }
    })    
  }, [logout])
  
  
  return (
    <div className="App">
      <h1>--BRD & GM--</h1>
      {activeUser?.username ? <small>Hi {activeUser.username}</small> : <small>Hi guest :3</small>}
      <Navbar logout={setLogout} setUser={setActiveUser}/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory user={activeUser} />} />
        <Route path="/wishlist" element={<Wishlist user={activeUser} />} />
        <Route path="/browse" element={<Browse user={activeUser} />} />
        <Route path="/login" element={<Login logout={setLogout} setUser={setActiveUser} />} />
        <Route path="/seeder" element={<SeedUtil />} />
          
        
      </Routes>
    </div>
  );
}

export default App;
