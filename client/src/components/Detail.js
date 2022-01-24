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
    }, [])
    

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
            {boardgame.avg_rating && boardgame.num_ratings ? <small>{boardgame.avg_rating.toFixed(2)}/5.00 with total of {boardgame.num_ratings} ratings</small> : null}
            {boardgame.image ? <img src={boardgame.image} alt={boardgame.name} />: null }
            {boardgame.msrp ? <p><strong>MSRP:</strong> ${boardgame.msrp.toFixed(2)}</p> : null }
            {boardgame.publisher ? <p>Publisher: {boardgame.publisher} ({boardgame.year_published})</p> : null }
            {boardgame.designer ? <p>Designer: {boardgame.designer}</p> : null }
            {boardgame.price ? <p>Current price: ${boardgame.price}</p> : null }
            {boardgame.discount ? <p>Current discount: {boardgame.discount}% </p> : null }
            {boardgame.min_age ? <p>Min. recommended age: {boardgame.min_age}yrs+</p> : null }
            {boardgame.min_players && boardgame.max_players ? <p>{boardgame.min_players} - {boardgame.max_players} players</p> : null }
            {boardgame.mechanic_names.length > 0 ? <p>Mechanics: {boardgame.mechanic_names} </p> : null}
            {boardgame.category_names.length > 0 ? <p>Categories: {boardgame.category_names} </p> : null}
            {boardgame.description ? <p>Description: {boardgame.description}</p> : null }
            {boardgame.rules_link ? <p>Rules: {boardgame.rules_link}</p> : null }
            {boardgame.shopping_link ? <p>Shopping link: {boardgame.shopping_link}</p> : null }
            
        </div>
    )
}

export default Detail;