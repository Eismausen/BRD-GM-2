import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Button} from 'react-bootstrap';


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
        <div className="boardgame-card border-dark mt-4 mb-2 ml-auto mr-auto ml-2 mr-2 pl-2 pr-2 p-auto">
            <Row>
                <Col><img className="card-img-top" src={boardgame.thumbnail} alt={boardgame.name}/></Col>
            </Row>
            <div className="card-body bg-light">
                <div className="card-title"><Link to={`/detail/${boardgame.id}`}><p>{boardgame.name}</p></Link></div>
                <div><small>{boardgame?.min_players} - {boardgame?.max_players} Players</small></div>
                <div><small><strong>Price:</strong> ${boardgame?.price}</small></div>
                <div><small><strong>Min. age:</strong> {boardgame?.min_age}</small></div>
                {boardgame?.description.length > 100 ? <div><small>{boardgame.description.slice(0,100) + '...[read more in detail view]'}</small></div> : <div><small>No description preview available.</small></div>}
            </div>
            <div className="card-footer bg-light">
                <Row>
                    <Col className="col-4">{!invStatus !== true ? <Button variant="warning" onClick={changeHandler} id="inventory-remove">Remove from Inventory</Button> : <Button variant="info" onClick={changeHandler} id="inventory-add">Add to Inventory</Button>}</Col>
                    <Col></Col>
                    <Col className="col-4">{!wishStatus !== true ? <Button variant="warning" onClick={changeHandler} id="wishlist-remove">Remove from Wishlist</Button> : <Button variant="info" onClick={changeHandler} id="wishlist-add">Add to Wishlist</Button>}</Col>
                </Row>    
            </div>
        </div>
    )
}

export default BoardgameCard;