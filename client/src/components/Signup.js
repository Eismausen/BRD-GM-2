import {useState} from 'react';

function Signup() {

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
        console.log(`Username: ${formData.username}`);
        console.log(`Email: ${formData.email}`);
        console.log(`Password: ${formData.password}`);
        const postURL = 'http://localhost:3000/signup';
        const postConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData),
        };

        fetch(postURL, postConfig)
        .then(res => res.json())
        .then(response => console.log(response));

    }


    return (
        <div id="Signup-layer">
            <p>You're seeing the Signup component.</p>
            <form id="signup-form" onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} value={formData.username} type="text" id="username" name="username" placeholder="username"></input>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.email} type="text" id="email" name="email" placeholder="email"></input>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.password} type="password" id="password" name="password" placeholder="password"></input>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.password_confirmation} type="password" id="password_confirmation" name="password_confirmation" placeholder="confirm password"></input>
                </div>                
                <input type="submit" id="submit-button" value="Party!"></input>
            </form>
        </div>
    )
}

export default Signup;