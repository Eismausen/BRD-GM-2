import {Link} from 'react-router-dom';

function Navbar() {

    return (
        <div id="Navbar">
            <small>Navbar layer :3</small>
            <nav>
                <Link to="login">Log in</Link>
                <Link to="inventory">Inventory</Link>
                <Link to="wishlist">Wishlist</Link>
                <Link to="browse">Browse</Link>
                <Link to="logout">Logout</Link>
            </nav>
        </div>
    )
}

export default Navbar;