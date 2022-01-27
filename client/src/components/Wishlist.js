import {useState, useEffect} from 'react';
import SearchFilter from './SearchFilter';
import BoardgameCard from './BoardgameCard';
import {Row, Col} from 'react-bootstrap';


function Wishlist({user}) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [sortBy, setSortBy] = useState({
        price: false,
        learning: false,
        strategy: false
    })
    const [userWishlist, setUserWishlist] = useState([]);

    useEffect(() => {
        fetch('/wishlist_records/special_wish/')
        .then(res => res.json())
        .then(wishlistGames => {
            setUserWishlist(wishlistGames);
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
    //sort disabled
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
    if (userWishlist.length > 0) {
        cardsToRender = [...userWishlist];        
        cardsToRender = cardsToRender.map(wishlistGame => <BoardgameCard key={wishlistGame.id} boardgame={wishlistGame} user={user} />)
    }
    
    if (cardsToRender.length === 0) {
        return (
            <div id="Wishlist">
            <SearchFilter setGames={setUserWishlist} setSortBy={sortHelper} sortBy={sortBy} loaded={setIsLoaded}/>
                <Row>
                    <Col></Col>
                    {isLoaded ? <Col className="text-center">No results to display.</Col> : <Col className="text-center">Still loading...</Col>}
                    <Col></Col>
                </Row>            
            </div>
        )
    }
    
    return (
        <div id="Wishlist">            
            <SearchFilter setGames={setUserWishlist} setSortBy={sortHelper} sortBy={sortBy} loaded={setIsLoaded}/>
            <div className="container-fluid d-flex card-deck flex-wrap">
                {cardsToRender}
            </div>        
        </div>
    )
}

export default Wishlist;