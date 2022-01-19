import {useState, useEffect} from 'react';
import BoardgameCard from './BoardgameCard';

function Browse() {

    const [someGames, setSomeGames] = useState([]);

    useEffect(() => {
        fetch('/boardgames')
        .then(res => res.json())
        .then(boardgames => setSomeGames(boardgames))
    }, [])

    let cardsToRender = someGames.map(game => <BoardgameCard key={game.id} boardgame={game} />)

    return (
        <div id="Browse">
            <small>Browse layer :3</small>
            {someGames.length > 0 ? cardsToRender : <p>No games to display yet</p>}
        </div>
    )
    
}

export default Browse;