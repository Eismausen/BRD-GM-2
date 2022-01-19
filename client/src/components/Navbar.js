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
        <div id="Navbar">
            <small>Navbar layer :3</small>
            <nav>
                <Link to="login">Log in|</Link>
                <Link to="inventory">Inventory|</Link>
                <Link to="wishlist">Wishlist|</Link>
                <Link to="browse">Browse|</Link>
                <Link onClick={handleLogout} to="login">Logout</Link>                
            </nav>
        </div>
    )
}

export default Navbar;