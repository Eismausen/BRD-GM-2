import {useState} from 'react';

function SeedUtil() {

    const mechanicsURL = 'https://api.boardgameatlas.com/api/game/mechanics?client_id=NZQRPYlalg';
    const categoriesURL = 'https://api.boardgameatlas.com/api/game/categories?client_id=NZQRPYlalg';
    const boardgamesURL = '';

    //will need POST endpoints for Mechanics, Categories, and then Boardgames
    const databaseToDumpTo = 'http://localhost:3000/';
    /*
    const dumpMechanics = 'http://localhost:3000/mechanics';
    const dumpCategores = 'http://localhost:3000/categories';
    const dumpBoardgames = 'http://localhost:3000/boardgames';
    */



    //seeder-scraper prep for boardgames:
    let querySeeds = [];
    let allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    for (const firstLetter of allLetters) {
        for (const secondLetter of allLetters) {
            let seed = `${firstLetter}${secondLetter}`;
            querySeeds.push(seed);
        }
    }

    function startScrape(e) {
        let scrapeType = e.target.id;
        //console.log(`${databaseToDumpTo}${scrapeType}`);
        let scrapeURL = `https://api.boardgameatlas.com/api/game/${scrapeType}?client_id=NZQRPYlalg`;

        fetch(scrapeURL)
        .then(res => res.json())
        .then(results => {            
            console.log(results[scrapeType]);
            for (const result of results[scrapeType]) {
                //result is an object, convert from native format to expected db format
                let recordObj = {
                    name: result.name,
                    code_ref: result.id
                }
                let postURL = `${databaseToDumpTo}${scrapeType}`;
                let postConfig = {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(recordObj)
                }
                fetch(postURL, postConfig)
                .then(res => res.json())
                .then(recordResponse => console.log(recordResponse))                
            }
        })        
    }





    return (
        <div id="SeederScraper">
            <p>This is a dev tool, hopefully you'll never see this :3</p>
            <div><button onClick={startScrape} id="mechanics">Mechanics</button></div>
            <div><button onClick={startScrape} id="categories">Categories</button></div>
            <div><button onClick={startScrape} id="boardgames">Boardgames</button></div>
        </div>
    )
}

export default SeedUtil;