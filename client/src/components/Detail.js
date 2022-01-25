import {useEffect, useState} from 'react';
import {useLocation, Link} from 'react-router-dom';

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
        <div id="detail">
            <h3>{boardgame.name}</h3>
            {boardgame.avg_rating && boardgame.num_ratings ? <small>{boardgame.avg_rating.toFixed(2)}/5.00 with total of {boardgame.num_ratings} ratings</small> : <small>No rating information available.</small>}
            {boardgame.image ? <div><img src={boardgame.image} alt={boardgame.name} /></div>: <div><small>No image available.</small></div> }
            {boardgame.msrp ? <p><strong>MSRP:</strong> ${boardgame.msrp.toFixed(2)}</p> : <div><small>No MSRP data available for this title.</small></div> }
            {boardgame.publisher ? <p>Publisher: {boardgame.publisher} ({boardgame.year_published})</p> : <div><small>No publishing information available for this title.</small></div> }
            {boardgame.designer ? <p>Designer: {boardgame.designer}</p> : <div><small>No designer information available for this title.</small></div> }
            {boardgame.price ? <p>Current price: ${boardgame.price}</p> : <div><small>No current pricing information available for this title.</small></div> }
            {boardgame.discount ? <p>Current discount: {boardgame.discount}% </p> : <div><small>No current discount.</small></div> }
            {boardgame.min_age ? <p>Min. recommended age: {boardgame.min_age}yrs+</p> : <div><small>No minimum recommended age info for this title.</small></div> }
            {boardgame.min_players && boardgame.max_players ? <p>{boardgame.min_players} - {boardgame.max_players} players</p> : <div><small>No suggested number of players available for this title.</small></div> }
            {boardgame.mechanic_names.length > 0 ? <p>Mechanics: {boardgame.mechanic_names} </p> : <div><small>No mechanic info available for this title.</small></div>}
            {boardgame.category_names.length > 0 ? <p>Categories: {boardgame.category_names} </p> : <div><small>No category info available for this title.</small></div>}
            {boardgame.description ? <p>Description: {boardgame.description}</p> : <div><small>No description available for this title.</small></div> }
            {boardgame.rules_link ? <p>Rules: {boardgame.rules_link}</p> : <div><small>No rules link available for this title.</small></div> }
            {boardgame.shopping_link ? <a href={boardgame.shopping_link}>Shopping link</a> : <div><small>No shopping link available for this title.</small></div> }            
        </div>
    )
}

export default Detail;