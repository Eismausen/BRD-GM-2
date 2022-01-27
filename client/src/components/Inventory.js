import {useEffect, useState} from 'react';
import BoardgameCard from './BoardgameCard';
import SearchFilter from './SearchFilter';
import {Col, Row} from 'react-bootstrap';

function Inventory ({user}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [userInventory, setUserInventory] = useState([]);
    const [sortBy, setSortBy] = useState({
        price: false,
        learning: false,
        strategy: false
    })

    useEffect(() => {
        fetch('/inventory_records/special_inv/')
        .then(res => res.json())
        .then(invGames => {
            setUserInventory(invGames);
            setIsLoaded(true);
        })
    }, [])

    function sortHelper(e) {
        let criteria = e.target.name;
        let flip = e.target.checked;
        setSortBy({
            ...sortBy,
            [criteria]: flip
        })        
    }
    /*
    //sort currently disabled
    function handleSort (boardgameArr) {
        if (sortBy.price) {
            boardgameArr.sort((bg1, bg2) => {
                if (bg1?.msrp > bg2?.msrp) {
                    return 1
                } else if (bg1?.msrp < bg2?.msrp) {
                    return -1
                } else {
                    return 0
                }
            })
        } else if (sortBy.learning) {
            boardgameArr.sort((bg1, bg2) => {
                if (bg1?.avg_learning_complexity > bg2?.avg_learning_complexity) {
                    return 1
                } else if (bg1?.avg_learning_complexity < bg2?.avg_learning_complexity) {
                    return -1
                } else {
                    return 0
                }
            })
        } else {
            boardgameArr.sort((bg1, bg2) => {
                if (bg1?.avg_strategy_complexity > bg2?.avg_strategy_complexity) {
                    return 1
                } else if (bg1?.avg_strategy_complexity < bg2?.avg_strategy_complexity) {
                    return -1
                } else {
                    return 0
                }
            })
        }        
    }
    */

    let cardsToRender = [];
    if (userInventory.length > 0) {
        cardsToRender = [...userInventory];
        cardsToRender = cardsToRender.map(inventoryGame => <BoardgameCard key={inventoryGame.id} boardgame={inventoryGame} user={user} />)
    }

    if (cardsToRender.length === 0) {
        return (
            <div id="Inventory">
            <SearchFilter setGames={setUserInventory} setSortBy={sortHelper} sortBy={sortBy} loaded={setIsLoaded}/>
                <Row>
                    <Col></Col>
                    {isLoaded ? <Col className="text-center">No results to display.</Col> : <Col className="text-center">Still loading...</Col>}
                    <Col></Col>
                </Row>            
            </div>
        )
    }
    
    return (
        <div id="Inventory">
            <SearchFilter setGames={setUserInventory} setSortBy={sortHelper} sortBy={sortBy} loaded={setIsLoaded}/>
            <div className="container-fluid d-flex card-deck flex-wrap">
                {cardsToRender}        
            </div>
        </div>
    )
}

export default Inventory;