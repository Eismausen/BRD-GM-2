import {useState} from 'react';
import {useLocation} from 'react-router-dom';

function SearchFilter({setGames}) {

    //load all categories and mechanics to search for autocomplete options?
    //or change mechanic/category to be "select" dropdowns generated from the
    //mechanics/categories?

    // Going to refactor and pull all search results from own DB
    //let baseSearchURL = 'https://api.boardgameatlas.com/api/search?';
    //let nameSearch = '/boardgames/name/';
    const location = useLocation().pathname.split('/')[1];
    
    //console.log(location);
    const [tickTracker, setTickTracker] = useState({
        name_check: false,
        category_check: false,
        mechanic_check: false,
        players_check: false
    })
    const [searchForm, setSearchForm] = useState({
        name: '',
        category: '',
        mechanic: '',
        number_of_players: ''        
    })

    function handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        setSearchForm({
            ...searchForm,
            [key]: value
        })
    }

    function handleTicks(e) {
        //console.log('Inside handleTicks.');
        let field = e.target.name;
        let status = e.target.checked;
        //console.log(e);
        //console.log(field);
        //console.log(status);

        setTickTracker({
            ...tickTracker,
            [field]: status
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        
        let doSearch = false;
        let searchURL = `/${location}/search/`;
        let searchConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        }
        let configBody = {}

        if (tickTracker.name_check && searchForm.name) {            
            configBody = {...configBody, name: searchForm.name};
            doSearch = true;
        }

        if (tickTracker.category_check && searchForm.category) {
            configBody = {...configBody, category: searchForm.category}
            doSearch = true;
        }

        if (tickTracker.mechanic_check && searchForm.mechanic) {
            configBody = {...configBody, mechanic: searchForm.mechanic}
            doSearch = true;
        }
        
        if (tickTracker.players_check && searchForm.number_of_players) {
            configBody = {...configBody, players: searchForm.number_of_players}
            doSearch = true;
        }

        if (!doSearch) {
            alert("Invalid search format");
            return null;
        }

        searchConfig = {...searchConfig,
            body: JSON.stringify(configBody)};

        fetch(searchURL, searchConfig)
        .then(res => res.json())
        .then(results => setGames(results))
        
    }
    
    return (
        <div id="search-filter">
            <small>This is where the filter and search options will go.</small>            
            <form onSubmit={handleSubmit}>
                <div>
                    <input checked={tickTracker.name_check} name="name_check" onChange={handleTicks} type="checkbox"></input>
                    <input onChange={handleChange} value={searchForm.name} name="name" type="text" placeholder="search by name"></input>
                </div>
                <div>
                    <input checked={tickTracker.category_check} onChange={handleTicks} name="category_check" type="checkbox"></input>
                    <input onChange={handleChange} value={searchForm.category} name="category" type="text" placeholder="search by category"></input>
                </div>
                <div>
                    <input checked={tickTracker.mechanic_check} onChange={handleTicks} name="mechanic_check" type="checkbox"></input>
                    <input onChange={handleChange} value={searchForm.mechanic} name="mechanic" type="text" placeholder="search by mechanic"></input>
                </div>
                <div>
                    <input checked={tickTracker.players_check} onChange={handleTicks} name="players_check" type="checkbox"></input>
                    <input onChange={handleChange} value={searchForm.number_of_players} name="number_of_players" type="text" placeholder="search by number of players"></input>
                </div>
                <div><input type="text" placeholder="sort by price"></input></div>
                <div><input type="text" placeholder="sort by learning complexity"></input></div>
                <div><input type="text" placeholder="sort by strategy complexity"></input></div>
                <div><input type="submit"></input></div>
            </form>
        </div>
    )
}

export default SearchFilter;