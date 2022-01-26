import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';

function SearchFilter({setGames, setSortBy, sortBy, loaded}) {

    //load all categories and mechanics to search for autocomplete options?
    //or change mechanic/category to be "select" dropdowns generated from the
    //mechanics/categories?

    // Going to refactor and pull all search results from own DB
    //let baseSearchURL = 'https://api.boardgameatlas.com/api/search?';
    //let nameSearch = '/boardgames/name/';
    const location = useLocation().pathname.split('/')[1];
    const [local, setLocal] = useState(true);
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
        setLocal(false);
        loaded(false); 
        
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
        .then(results => {
            setGames(results);
            loaded(true);
            setLocal(true);
        })
        
    }
    
    return (
        <div className="" id="search-filter">            
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col className="col-1 align-items-end"><Form.Check type="switch" checked={tickTracker.name_check} name="name_check" onChange={handleTicks}></Form.Check></Col>
                        <Col className="col-4 align-items-start"><Form.Control onChange={handleChange} value={searchForm.name} name="name" type="text" placeholder={`search ${location} by name`}></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col className="col-1 align-items-end"><Form.Check type="switch" checked={tickTracker.category_check} name="category_check" onChange={handleTicks}></Form.Check></Col>
                        <Col className="col-4 align-items-start"><Form.Control onChange={handleChange} value={searchForm.category} name="category" type="text" placeholder={`search ${location} by category`}></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col className="col-1 align-items-end"><Form.Check type="switch" checked={tickTracker.mechanic_check} name="mechanic_check" onChange={handleTicks}></Form.Check></Col>
                        <Col className="col-4 align-items-start"><Form.Control onChange={handleChange} value={searchForm.mechanic} name="mechanic" type="text" placeholder={`search ${location} by mechanic`}></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col className="col-1 align-items-end"><Form.Check type="switch" checked={tickTracker.players_check} name="players_check" onChange={handleTicks}></Form.Check></Col>
                        <Col className="col-4 align-items-start"><Form.Control onChange={handleChange} value={searchForm.number_of_players} name="number_of_players" type="text" placeholder={`search ${location} by number of players`}></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                {/*
                <Form.Group>
                    <Row className="mt-1">
                        <Col></Col>
                        <Col></Col>
                        <Col className="text-center">
                            <Form.Label htmlFor="sort-by-price">Sort by price</Form.Label>
                            <Form.Check id="sort-by-price" name="price" type="checkbox" onChange={setSortBy} value={sortBy.price}></Form.Check>
                        </Col>
                        <Col className="text-center">
                            <Form.Label htmlFor="sort-by-learn">Sort by learning complexity</Form.Label>
                            <Form.Check id="sort-by-learn" name="learning" type="checkbox" onChange={setSortBy} value={sortBy.learning}></Form.Check>
                        </Col>
                        <Col className="text-center">
                            <Form.Label htmlFor="sort-by-strat">Sort by strategy complexity</Form.Label>
                            <Form.Check id="sort-by-strat" name="strategy" type="checkbox" onChange={setSortBy} value={sortBy.strategy}></Form.Check>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                */}
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col className="text-center mt-2"><Button variant="info" type="submit">Search</Button></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="text-center"><small>{local ? <p>Search complete.</p> : <p>Searching...</p>}</small></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
            </Form>            
        </div>
    )
}

export default SearchFilter;