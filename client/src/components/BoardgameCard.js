import {useEffect, useState} from 'react';

function BoardgameCard({boardgame}) {

    const [invStatus, setInvStatus] = useState(false);
    const [wishStatus, setWishStatus] = useState(false);

    useEffect(() => {
        fetch(`/inventory_records/check/${boardgame.id}`)
        .then(res => res.json())
        .then(invRecord => setInvStatus(invRecord))
        fetch(`/wishlist_records/check/${boardgame.id}`)
        .then(res => res.json())
        .then(wishRecord => setWishStatus(wishRecord))
    }, [boardgame.id])

    function changeHandler(e) {
        let changeAction = e.target.id.split('-')[1];
        let changeType = e.target.id.split('-')[0];
        console.log(`${changeAction} ${changeType}`);
        let httpVerb = (changeAction === 'add') ? 'POST' : 'DELETE';
        let fetchTarget = (changeType === 'inventory') ? `/inventory_records/${changeAction}/${boardgame.id}` : `/wishlist_records/${changeAction}/${boardgame.id}`;
        console.log(`${httpVerb} ${fetchTarget}`);
        let changeConfig = {method: httpVerb};

        fetch(fetchTarget, changeConfig)
        .then(res => {
            console.log(res);
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
        <div class="boardgame-card">
            <p>--CARD--</p>
            <p>{boardgame.name}</p>
            <img src={boardgame.thumbnail} />
            {!invStatus !== true ? <button onClick={changeHandler} id="inventory-remove">Remove from Inventory</button> : <button onClick={changeHandler} id="inventory-add">Add to Inventory</button>}
            {!wishStatus !== true ? <button onClick={changeHandler} id="wishlist-remove">Remove from Wishlist</button> : <button onClick={changeHandler} id="wishlist-add">Add to Wishlist</button>}

        </div>
    )
}

export default BoardgameCard;