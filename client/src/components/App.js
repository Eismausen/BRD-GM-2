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
import SearchFilter from './SearchFilter';
import Detail from './Detail';
import {Container, Row, Col} from 'react-bootstrap';


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
    <div className="container-fluid">
      <div className="row banner">
        <div className="col-1"></div>
        <div className="col-11"><h1 className="text-center">--BRD & GM--</h1></div>
      </div>
      <div className="row">
      {activeUser?.username ? <div className="col-2 mb-2"><small>Welcome <strong>{activeUser.username}</strong></small></div> : <div className="col-2 mb-2"><small>Welcome <strong>guest</strong></small></div>}
      </div>
      <div className="row">
        <div className="col-1 flex-column">
          <Navbar logout={setLogout} setUser={setActiveUser}/>
        </div>
        <div className="col-11 justify-content-center">
          <Routes>
            <Route path="/signup" element={<Signup setUser={setActiveUser}/>} />
            <Route path="/inventory" element={<Inventory user={activeUser} />} />
            <Route path="/wishlist" element={<Wishlist user={activeUser} />} />
            <Route path="/browse" element={<Browse user={activeUser} />} />
            <Route path="/login" element={<Login logout={setLogout} setUser={setActiveUser} />} />
            <Route path="/seeder" element={<SeedUtil />} />
            <Route path="/sandbox" element={<SearchFilter />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
      </div>      
    </div>
  );
}

export default App;
