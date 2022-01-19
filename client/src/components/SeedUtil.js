import {useState} from 'react';

function SeedUtil() {

    const mechanicsURL = 'https://api.boardgameatlas.com/api/game/mechanics?client_id=NZQRPYlalg';
    const categoriesURL = 'https://api.boardgameatlas.com/api/game/categories?client_id=NZQRPYlalg';
    const boardgamesURL = '';

    //will need POST endpoints for Mechanics, Categories, and then Boardgames
    //const databaseToDumpTo = 'http://localhost:3000/';
    /*
    const dumpMechanics = 'http://localhost:3000/mechanics';
    const dumpCategores = 'http://localhost:3000/categories';
    const dumpBoardgames = 'http://localhost:3000/boardgames';
    */    

    async function rateLimiter() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000)
        });
    }

    //This is for Category/Mechanics specifically -- boardgames is more involved
    //  // and will get its own block
    function startScrape(e) {
        let scrapeType = e.target.id;
        
        if (scrapeType === 'mechanics' || scrapeType === 'categories') {
            console.log("Currently guarded against seeding.");
            return null;
        }
        
        // MECHANIC/CATEGORY SCRAPE BLOCK DISABLED -- UNCOMMENT TO RE-ENABLE
        /*
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
        */        
        // END MECHANIC/CATEGORY SCRAPE BLOCK        
    }

    async function startBoardScrape(e) {
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
        let baseURL = 'https://api.boardgameatlas.com/api/search?name=';
        let suffix = '&limit=100&client_id=NZQRPYlalg';

        //each seed will query BoardgameAtlasDB for a search for (up to) 100 results based on the seed
        for (const seed of querySeeds) {            
            let fullQuery = `${baseURL}${seed}${suffix}`;
            let games = await fetch(fullQuery)
            .then(res => res.json())
            .then(gamesObj => gamesObj.games)
            //for each set of results, we create an array of responses called 'games'
            for (const game of games) {
                //for each game in the games array, we create a new boardgame record object
                console.log(`Preparing record object for: ${game?.name}`);
                let newGameObj = {
                    name: game?.name,
                    price: parseFloat(game?.price),
                    msrp: parseFloat(game?.msrp),
                    discount: parseFloat(game?.discount),
                    min_players: game?.min_players,
                    max_players: game?.max_players,
                    min_playtime: game?.min_playtime,
                    max_playtime: game?.max_playtime,
                    min_age: game?.min_age,
                    description: game?.description_preview,
                    thumbnail: game?.thumb_url,
                    image: game?.image_url,
                    publisher: game?.primary_publisher?.name,
                    designer: game?.primary_designer?.name,
                    rules_link: game?.rules_url,
                    num_ratings: game?.num_user_ratings,
                    avg_rating: game?.average_user_rating,
                    lowest_price: null,
                    lowest_price_date: null,
                    year_published: game?.year_published,
                    avg_learning_complexity: game?.average_learning_complexity,
                    avg_strategy_complexity: game?.average_strategy_complexity,
                    shopping_link: game?.url
                }
                //expand the categories/mechanics associated with each game
                let newGameCategories = [...game?.categories];
                let newGameMechanics = [...game?.mechanics];
                let boardgameDump = '/boardgames';
                let postConfig = {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(newGameObj)
                }
                //create a new record on the database from the prepared object
                let newGameRecord = await fetch(boardgameDump, postConfig)
                .then(res => res.json())
                //verify game record creation
                console.log(`New boardgame record created for: ${newGameRecord}`);
                //with the game record created, we can populate the associated mechanics/categories for that boardgame
                for (const mechanic of newGameMechanics) {
                    let mechCodeFinder = `/mechanics/code/${mechanic.id}`;                    
                    let mechanicObj = await fetch(mechCodeFinder)
                    .then(res => res.json())
                    console.log(`Creating associated record for mechanic: '${mechanicObj?.name}`);                    
                    let newMechanicRecord = {
                        boardgame_id: newGameRecord?.id,
                        mechanic_id: mechanicObj?.id                        
                    };
                    let mechanicPostURL = '/mechanic_records';
                    let mechanicPostConfig = {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(newMechanicRecord)
                    };
                    let checkPostSuccess = await fetch(mechanicPostURL, mechanicPostConfig)
                    .then(res => res.json());
                    console.log(`Mechanic record 'POST' success: ${checkPostSuccess}`);
                }
                for (const category of newGameCategories) {
                    let catCodeFinder = `/categories/code/${category.id}`;
                    let catObj = await fetch(catCodeFinder)
                    .then(res => res.json());
                    console.log(`Creating associated record for category: ${catObj?.name}`);
                    let newCatRecord = {
                        boardgame_id: newGameRecord?.id,
                        category_id: catObj?.id
                    };
                    let catPostURL = '/category_records';
                    let catPostConfig = {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(newCatRecord)
                    };
                    let checkPostSuccess = await fetch(catPostURL, catPostConfig)
                    .then(res => res.json())
                    console.log(`Category record 'POST' success: ${checkPostSuccess}`);
                }
                //boardgame record created, associated category records and mechanic records created
                //end loop for each game - move to next seed
            }//end games loop
            //all games added
            console.log("Ending current seed - buffering ONE SECOND before next query");
            await rateLimiter();
            console.log("ONE SECOND elapsed, moving to next seed.");
        }//end seeding loop
    }//end boardgameScrape





    return (
        <div id="SeederScraper">
            <p>This is a dev tool, hopefully you'll never see this :3</p>
            <div><button onClick={startScrape} id="mechanics">Mechanics</button></div>
            <div><button onClick={startScrape} id="categories">Categories</button></div>
            <div><button onClick={startBoardScrape} id="boardgames">Boardgames</button></div>
        </div>
    )
}

export default SeedUtil;