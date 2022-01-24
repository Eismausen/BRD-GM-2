import {useState, useEffect} from 'react';
import BoardgameCard from './BoardgameCard';
import SearchFilter from './SearchFilter';

function Browse({user}) {

    const [someGames, setSomeGames] = useState([]);

    useEffect(() => {
        fetch('/boardgames')
        .then(res => res.json())
        .then(boardgames => setSomeGames(boardgames))
    }, [])

    let cardsToRender = someGames.map(game => <BoardgameCard key={game.id} boardgame={game} user={user} />)

    return (
        <div id="Browse">
            <SearchFilter setGames={setSomeGames} />
            <small>Browse layer :3</small>
            {someGames.length > 0 ? cardsToRender : <p>No games to display yet</p>}
        </div>
    )
    
}

export default Browse;