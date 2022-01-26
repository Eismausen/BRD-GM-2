import {Link} from 'react-router-dom';

function Navbar({logout, setUser}) {

    function handleLogout() {
        fetch('/logout')
        .then(() => {
            setUser([]);
            logout(true);
        });        
    }

    return (
        <div className="container-flex" id="Navbar">            
            <nav>
                <div className="col">
                    <div className="row"><Link to="login">Log in</Link></div>
                    <div className="row"><Link to="inventory">Inventory</Link></div>
                    <div className="row"><Link to="wishlist">Wishlist</Link></div>
                    <div className="row"><Link to="browse">Browse</Link></div>
                    <div className="row"><Link onClick={handleLogout} to="login">Logout</Link>                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;