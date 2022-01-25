import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function BoardgameCard({boardgame, user}) {

    const [invStatus, setInvStatus] = useState(false);
    const [wishStatus, setWishStatus] = useState(false);

    useEffect(() => {        
        if (!user?.username === false) {
            fetch(`/inventory_records/check/${boardgame.id}`)
            .then(res => res.json())
            .then(invRecord => setInvStatus(invRecord))
            fetch(`/wishlist_records/check/${boardgame.id}`)
            .then(res => res.json())
            .then(wishRecord => setWishStatus(wishRecord))
        }
    }, [boardgame.id, user?.username])

    function changeHandler(e) {
        //console.log(!user?.username);
        //console.log(!user?.username === false);
        if (!user?.username === true) {
            alert("Please log in to use this feature.");
            return null
        }
        let changeAction = e.target.id.split('-')[1];
        let changeType = e.target.id.split('-')[0];
        //console.log(`${changeAction} ${changeType}`);
        let httpVerb = (changeAction === 'add') ? 'POST' : 'DELETE';
        let fetchTarget = (changeType === 'inventory') ? `/inventory_records/${changeAction}/${boardgame.id}` : `/wishlist_records/${changeAction}/${boardgame.id}`;
        console.log(`${httpVerb} ${fetchTarget}`);
        let changeConfig = {method: httpVerb};

        fetch(fetchTarget, changeConfig)
        .then(res => {
            //console.log(res);
            if (res.status === 201) {
                console.log("I see the record creation");
                if (changeType === 'inventory') {
                    setInvStatus(true);
                } else {
                    setWishStatus(true);
                }
            } else {
                console.log("I see the record destruction");
                if (changeType === 'inventory') {
                    setInvStatus(false);
                } else {
                    setWishStatus(false);
                }
            }
        })
    }

    return (
        <div className="boardgame-card">
            <p>--------------</p>
            <Link to={`/detail/${boardgame.id}`}><p>{boardgame.name}</p></Link>
            <div><img src={boardgame.thumbnail} alt={boardgame.name}/></div>
            <div><small>{boardgame?.min_players} - {boardgame?.max_players} Players</small></div>
            <div><small>MSRP: ${boardgame?.msrp}</small></div>
            <div><small>Min. age: {boardgame?.min_age}</small></div>
            {boardgame?.description.length > 100 ? <div><small>{boardgame.description.slice(0,100) + '...[read more in detail view]'}</small></div> : <div><small>No description preview available.</small></div>}
            {!invStatus !== true ? <button onClick={changeHandler} id="inventory-remove">Remove from Inventory</button> : <button onClick={changeHandler} id="inventory-add">Add to Inventory</button>}
            {!wishStatus !== true ? <button onClick={changeHandler} id="wishlist-remove">Remove from Wishlist</button> : <button onClick={changeHandler} id="wishlist-add">Add to Wishlist</button>}

        </div>
    )
}

export default BoardgameCard;