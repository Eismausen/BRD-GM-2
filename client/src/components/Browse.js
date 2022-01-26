import {useState, useEffect} from 'react';
import BoardgameCard from './BoardgameCard';
import SearchFilter from './SearchFilter';

function Browse({user}) {

    const [someGames, setSomeGames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sortBy, setSortBy] = useState({
        price: false,
        learning: false,
        strategy: false
    });

    useEffect(() => {
        fetch('/boardgames')
        .then(res => res.json())
        .then(boardgames => {
            setSomeGames(boardgames);
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
                let price1 = (bg1?.price) ? bg1.price : 0;
                let price2 = (bg2?.price) ? bg2.price : 0;
                if (price1 > price2) {
                    return 1
                } else if (price1 < price2) {
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
        return boardgameArr;        
    }
    */

    let cardsToRender = [];
    if (someGames.length > 0) {
        cardsToRender = [...someGames];
        cardsToRender = cardsToRender.map(someGame => <BoardgameCard key={someGame.id} boardgame={someGame} user={user} />)
    }   

    return (
        <div id="Browse">
            <SearchFilter setGames={setSomeGames} setSortBy={sortHelper} sortBy={sortBy} loaded={setIsLoaded} isLoaded={isLoaded}/>
            <div className="container-fluid d-flex card-deck flex-wrap">
                {someGames.length > 0 && isLoaded ? cardsToRender : <p>No games to display</p>}
            </div>     
        </div>
    )    
}

export default Browse;

/*
{//<div className="container-fluid d-flex flex-wrap">}

*/