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
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("App-level useEffect");
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("Seeing user at /me");
          console.log(user);
          setActiveUser(user);
          setIsLoaded(true);          
        })
      } else {
        console.log("No session data currently");
      }
    })    
  }, [])
  
  
  return (
    <div className="App">
      <h1>--BRD & GM--</h1>
      {isLoaded ? <small>Hi {activeUser.username}</small> : <small>Hi guest :3</small>}
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login setUser={setActiveUser} />} />
        <Route path="/seeder" element={<SeedUtil />} />
          
        
      </Routes>
    </div>
  );
}

export default App;
