import {useState} from 'react';

function Signup() {

    //State for managing controlled form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [key]: value
        })
    }


    return (
        <div id="Signup-layer">
            <p>You're seeing the Signup component.</p>
            <form id="signup-form">
                <div>
                    <input onChange={handleChange} value={formData.username} type="text" id="username" name="username" placeholder="username"></input>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.email} type="text" id="email" name="email" placeholder="email"></input>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.password} type="password" id="password" name="password" placeholder="password"></input>
                </div>                
                <input type="submit" id="submit-button" value="Party!"></input>
            </form>
        </div>
    )
}

export default Signup;