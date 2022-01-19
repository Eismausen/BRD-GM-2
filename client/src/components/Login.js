import {useState} from 'react';

function Login({setUser}) {

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
                .then(user => setUser(user))                
                //set user state here
            } else {
                res.json()
                .then(errors => {
                    console.log(errors);
                });
            }
        });
    }

    return (
        <div id="login">
            <p>Hello from the Login component :3</p>
            <form id='login-form' onSubmit={handleSubmit}>
                <input value={loginForm.username} onChange={handleChange} id="username" name="username" placeholder="username" type="text"></input>
                <input value={loginForm.password} onChange={handleChange} id="password" name="password" placeholder="password" type="password"></input>
                <input type="submit" value="Log in"></input>
            </form>
        </div>
    )
}

export default Login;