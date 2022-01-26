import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

function Detail () {

    const location = useLocation();
    const locationSplits = location.pathname.split('/');
    const target_id = locationSplits[locationSplits.length-1];
    console.log(target_id);

    const [boardgame, setBoardgame] = useState({
        whateverDetails: ''
    });
    const [isLoaded, setIsLoaded] = useState(false);

    
    useEffect(() => {
        const boardgameURL = `/boardgames/${target_id}`;
        fetch(boardgameURL)
        .then(res => res.json())
        .then(boardgame => {
            setBoardgame(boardgame);
            setIsLoaded(true);
        })
    }, [target_id])
    

    //console.log(location);

    if (!isLoaded) {
        return (
            <div id="detail">
                <p>Still loading...</p>
            </div>
        )
    }

    return (
        <div id="detail" className="text-center">
            <h3>{boardgame.name}</h3>
            {boardgame.avg_rating && boardgame.num_ratings ? <small><strong>{boardgame.avg_rating.toFixed(2)}/5.00</strong> with total of <strong>{boardgame.num_ratings}</strong> ratings</small> : <small>No rating information available.</small>}
            {boardgame.image ? <div><img src={boardgame.image} alt={boardgame.name} /></div>: <div><small>No image available.</small></div> }
            {boardgame.msrp ? <p><strong>MSRP:</strong> ${boardgame.msrp.toFixed(2)}</p> : <div><small>No MSRP data available for this title.</small></div> }
            {boardgame.publisher ? <p><strong>Publisher:</strong> {boardgame.publisher} ({boardgame.year_published})</p> : <div><small>No publishing information available for this title.</small></div> }
            {boardgame.designer ? <p><strong>Designer:</strong> {boardgame.designer}</p> : <div><small>No designer information available for this title.</small></div> }
            {boardgame.price ? <p><strong>Current price:</strong> ${boardgame.price}</p> : <div><small>No current pricing information available for this title.</small></div> }
            {boardgame.discount ? <p><strong>Current discount:</strong> {boardgame.discount}% </p> : <div><small>No current discount.</small></div> }
            {boardgame.min_age ? <p><strong>Min. recommended age:</strong> {boardgame.min_age}yrs+</p> : <div><small>No minimum recommended age info for this title.</small></div> }
            {boardgame.min_players && boardgame.max_players ? <p>{boardgame.min_players} - {boardgame.max_players} players</p> : <div><small>No suggested number of players available for this title.</small></div> }
            {boardgame.mechanic_names.length > 0 ? <p><strong>Mechanics:</strong> {boardgame.mechanic_names.map(name => `${name} | `)} </p> : <div><small>No mechanic info available for this title.</small></div>}
            {boardgame.category_names.length > 0 ? <p><strong>Categories:</strong> {boardgame.category_names.map(name => `${name} | `)} </p> : <div><small>No category info available for this title.</small></div>}
            {boardgame.description ? <p><strong>Description:</strong> {boardgame.description}</p> : <div><small>No description available for this title.</small></div> }
            {boardgame.rules_link ? <p><a href={boardgame.rules_link}>Rules</a></p> : <div><small>No rules link available for this title.</small></div> }
            {boardgame.shopping_link ? <a href={boardgame.shopping_link}>Shopping link</a> : <div><small>No shopping link available for this title.</small></div> }            
        </div>
    )
}

export default Detail;