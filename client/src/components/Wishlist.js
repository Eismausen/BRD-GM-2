import {useState, useEffect} from 'react';
import BoardgameCard from './BoardgameCard';

function Wishlist({user}) {

    const [userWishlist, setUserWishlist] = useState([]);

    useEffect(() => {
        fetch('/wishlist_records/special_wish/')
        .then(res => res.json())
        .then(wishlistGames => setUserWishlist(wishlistGames))
    }, [])

    let cardsToRender = [];
    if (userWishlist.length > 0) {
        cardsToRender = userWishlist.map(wishlistGame => <BoardgameCard key={wishlistGame.id} boardgame={wishlistGame} user={user} />)
    }
    
    return (
        <div id="Wishlist">
            <small>Wishlist layer :3</small>
            {cardsToRender.length > 0 ? cardsToRender : null}
        </div>
    )
}

export default Wishlist;