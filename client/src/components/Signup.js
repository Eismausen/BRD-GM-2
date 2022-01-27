import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Row, Col, Container, Button} from 'react-bootstrap';

function Signup({setUser}) {
    let navigate = useNavigate();
    //State for managing controlled form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    //handle form changes for controlled form
    function handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [key]: value
        })
    }

    //handle form submit, create new user
    function handleSubmit(e) {
        e.preventDefault();        
        const postURL = '/signup';
        const postConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData),
        };

        fetch(postURL, postConfig)
        .then(res => res.json())
        .then(response => {
            setUser(response);
            navigate("/inventory");
        });
    }


    return (
        <Container className="flex" id="Signup-layer">
            <Row className="mt-2 mb-4 text-center">
                <Col></Col>
                <Col><h3>Sign-up</h3></Col>
                <Col></Col>
            </Row>
            
            <Form id="signup-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Row className="text-left">
                        <Col></Col>
                        <Col><Form.Label htmlFor="username"><small>Username</small></Form.Label></Col>
                        <Col></Col>                        
                    </Row>
                    <Row className="mb-1">
                        <Col></Col>
                        <Col><Form.Control size="sm" onChange={handleChange} value={formData.username} type="text" id="username" name="username" placeholder="username"></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col><Form.Label htmlFor="email"><small>Email</small></Form.Label></Col>
                        <Col></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col></Col>
                        <Col><Form.Control size="sm" onChange={handleChange} value={formData.email} type="text" id="email" name="email" placeholder="email"></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col></Col>
                        <Col><Form.Label htmlFor="password"><small>Password</small></Form.Label></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><Form.Control size="sm" onChange={handleChange} value={formData.password} type="password" id="password" name="password" placeholder="password"></Form.Control></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><Form.Label htmlFor="password_confirmation"><small>Confirm password</small></Form.Label></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><Form.Control size="sm" onChange={handleChange} value={formData.password_confirmation} type="password" id="password_confirmation" name="password_confirmation" placeholder="confirm password"></Form.Control></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
                <Row className="mt-2">
                    <Col></Col>
                    <Col className="text-center"><Button className="btn-primary" type="submit" id="submit-button">Sign up</Button></Col>
                    <Col></Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Signup;