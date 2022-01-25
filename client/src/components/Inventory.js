import {useEffect, useState} from 'react';
import BoardgameCard from './BoardgameCard';
import SearchFilter from './SearchFilter';

function Inventory ({user}) {

    const [userInventory, setUserInventory] = useState([]);

    useEffect(() => {
        fetch('/inventory_records/special_inv/')
        .then(res => res.json())
        .then(invGames => setUserInventory(invGames))
    }, [])

    let cardsToRender = [];
    if (userInventory.length > 0) {
        cardsToRender = userInventory.map(inventoryGame => <BoardgameCard key={inventoryGame.id} boardgame={inventoryGame} user={user} />)
    }
    
    return (
        <div id="Inventory">
            <small>Inventory layer :3</small>
            <SearchFilter setGames={setUserInventory} />            
            {cardsToRender.length > 0 ? cardsToRender : <p>No matching results</p>}        
        </div>
    )
}

export default Inventory;