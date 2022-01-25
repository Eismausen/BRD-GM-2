import {useState, useEffect} from 'react';
import SearchFilter from './SearchFilter';
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
            <SearchFilter setGames={setUserWishlist}/>        
            {cardsToRender.length > 0 ? cardsToRender : <p>No matching results</p>}
        </div>
    )
}

export default Wishlist;