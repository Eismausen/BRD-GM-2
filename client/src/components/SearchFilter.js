import {useState} from 'react';

function SearchFilter() {

    //load all categories and mechanics to search for autocomplete options?
    //or change mechanic/category to be "select" dropdowns generated from the
    //mechanics/categories?

    let baseSearchURL = 'https://api.boardgameatlas.com/api/search?';
    let searchModifiers = {
        name: 'name',
        
    }
    
    return (
        <div id="search-filter">
            <small>This is where the filter and search options will go.</small>            
            <form>                
                <div><input type="text" placeholder="search by name"></input></div>
                <div><input type="text" placeholder="search by category"></input></div>
                <div><input type="text" placeholder="search by mechanic"></input></div>
                <div><input type="text" placeholder="search by number of players"></input></div>
                <div><input type="text" placeholder="sort by price"></input></div>
                <div><input type="text" placeholder="sort by learning complexity"></input></div>
                <div><input type="text" placeholder="sort by strategy complexity"></input></div>
            </form>
        </div>
    )
}

export default SearchFilter;