import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';

function Login({setUser, logout}) {
    let navigate = useNavigate();
    //hold/manage login form data
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    //form control & change handler
    function handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;

        setLoginForm({
            ...loginForm,
            [key]: value
        });
    }

    //form submit handler
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Seeing login attempt.");
        let loginURL = '/login';
        let loginConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(loginForm)
        };
        fetch(loginURL, loginConfig)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(user => {
                    setUser(() => user);
                    navigate("/inventory");
                    logout(true);
                })
                
                //set user state here
            } else {
                res.json()
                .then(errors => {
                    alert("Login not recognized.");
                    console.log(errors);
                });
            }
        });
    }

    return (
        <div id="login">
            <Container className="content-center">            
                <Form id='login-form' onSubmit={handleSubmit}>               
                    <Form.Group>
                        <Row>
                            <Col></Col>
                            <Col className="text-center"><Form.Label ><small>Username</small></Form.Label></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col><Form.Control size="sm" value={loginForm.username} onChange={handleChange} id="username" name="username" placeholder="username" type="text"/></Col>
                            <Col></Col>
                        </Row>                    
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col></Col>
                            <Col className="text-center"><Form.Label><small>Password</small></Form.Label></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>                    
                            <Col><Form.Control size="sm" value={loginForm.password} onChange={handleChange} id="password" name="password" placeholder="password" type="password" /></Col>
                            <Col></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <div className="col-12 text-center">
                                <Button className="mt-2" as="input" type="submit" value="Log in"></Button>
                            </div>
                        </Row>
                    </Form.Group>
                    
                </Form>
                <Row>
                    <Col></Col>
                    <Col className="text-center"><small>Not a member yet?</small></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className="text-center"><Link to="/signup"><small>Sign up!</small></Link></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;