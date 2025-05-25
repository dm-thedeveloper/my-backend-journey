import React, { useState } from 'react'; 
// Importing React and the useState hook to manage form state

import axios from 'axios'; 
// Importing axios for making HTTP requests to the backend

import "./Regform.css"; 
// Importing a CSS file for styling the registration form

function RegForm() { 

    // Defining a functional component called `RegForm`
    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        gender: '',
        email: '',
        password: '',
        contact: '',
        profile: null,
    });


 
    // Using the `useState` hook to define a state variable `formData` to store the form data. 
    // The initial state is an object with empty fields for name, profession, gender, email, password, contact, and a null profile picture.


    const handleChange = (e) => {
        const { name, value } = e.target; 
        // Destructuring the target event to get the name and value from the input field that was changed
        setFormData({
            ...formData,
            [name]: value,
        });
        // Updating the corresponding field in the `formData` object. This is called for each input change.
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile: e.target.files[0],
        });
        // Updating the `profile` field in `formData` when the user selects a file (profile picture).
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Prevents the default form submission behavior (page reload)
        const formDataToSend = new FormData(); 
        // Creating a new `FormData` object to send file and text data together
        for (const key in formData) {
            formDataToSend.append(key, formData[key]); 
            // Appending each field from `formData` to the `FormData` object   
        }

        try {

            
            const response = await axios.post('/user/Register', formDataToSend, {
                
                headers: {

                    'Content-Type': 'multipart/form-data',
                },

            });
            // Sending the `formDataToSend` object to the `/user/Register` endpoint using a POST request
            // The `Content-Type` header is set to `multipart/form-data` because the form includes a file upload

            if (response.status === 200) {
                alert('Registration successful!'); 
                // If the response is successful, show an alert saying registration is successful
            } else {
                alert(`Registration failed: ${response.data.error}`); 
                // If the response status is not 200, show an error message with the error returned from the server
            }
        } catch (error) {
            console.error('Error:', error); 
            // Log any error that occurs during the request to the console
            alert('An error occurred. Please try again later.'); 
            // Display an alert to the user if something goes wrong during the submission
        }
    };

    return (
        <div className="container">
            {/* Wrapping the form inside a div with a `container` class for styling */}
            <h2>Register</h2> 
            {/* Title of the form */}

            <form onSubmit={handleSubmit}>
                {/* Form starts here. The form will call `handleSubmit` when it is submitted */}
                
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    {/* Label for the name input field */}
                    <input type="text" id="name" name="name" required onChange={handleChange} />
                    {/* Text input for the user's name, `onChange` calls `handleChange` to update the `name` state */}
                </div>

                <div className="form-group">
                    <label htmlFor="profession">Profession</label>
                    <input type="text" id="profession" name="profession" required onChange={handleChange} />
                    {/* Text input for the profession, updates `profession` field in state */}
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" required onChange={handleChange}>
                        {/* Dropdown (select) input for gender */}
                        <option value="" disabled selected>Select your gender</option>
                        {/* Default option that cannot be selected, prompting the user to choose a gender */}
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        {/* Options for male, female, and other */}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={handleChange} />
                    {/* Email input for the user's email, updates the `email` field */}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={handleChange} />
                    {/* Password input for the user's password, updates the `password` field */}
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" id="contact" name="contact" required onChange={handleChange} />
                    {/* Text input for the contact number, updates the `contact` field */}
                </div>

                <div className="form-group">
                    <label htmlFor="profile">Profile Picture</label>
                    <input type="file" id="profile" name="profile" onChange={handleFileChange} />
                    {/* File input for uploading a profile picture, calls `handleFileChange` to update the `profile` field */}
                </div>

                <div className="form-group">
                    <button type="submit">Register</button>
                    {/* Submit button that triggers form submission and calls `handleSubmit` */}
                </div>
            </form>
        </div>
    );
}

export default RegForm; 
// Exporting the RegForm component so it can be used in other parts of the app
