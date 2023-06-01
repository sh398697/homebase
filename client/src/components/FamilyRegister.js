import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";
import "./FamilyRegister.css";


function FamilyRegister({ parents, setParents }) {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newImageURL, setNewImageURL] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleFirstName = (e) => setNewFirstName(e.target.value);
    const handleLastName = (e) => setNewLastName(e.target.value);
    const handleEmail = (e) => setNewEmail(e.target.value);
    const handlePhone = (e) => setNewPhone(e.target.value);
    const handleImageURL = (e) => setNewImageURL(e.target.value);
    const handlePassword = (e) => setNewPassword(e.target.value);

    const history = useNavigate();

    const onCreateParent = (parentObj) => {
        setParents([...parents, parentObj]);
        history("/familylogin");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newParent = {
        fname: newFirstName,
        lname: newLastName,
        email: newEmail,
        phone: newPhone,
        image_url: newImageURL,
        password: newPassword,
        };

        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newParent),
        };
        fetch(`${API_URL}/parents`, requestOptions)
        .then(onCreateParent);
    };

    return (
        <div>
            <div className="create-user-container">
                <div className="create-user-form-container">
                    <h2>Create Your Account</h2>
                    <form onSubmit={handleSubmit} className="create-user-form">
                    <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                        type="text"
                        id="fname"
                        value={newFirstName}
                        onChange={handleFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                        type="text"
                        id="lname"
                        value={newLastName}
                        onChange={handleLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        value={newEmail}
                        onChange={handleEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                        type="tel"
                        id="phone"
                        value={newPhone}
                        onChange={handlePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                        type="text"
                        id="image_url"
                        value={newImageURL}
                        onChange={handleImageURL}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        value={newPassword}
                        onChange={handlePassword}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FamilyRegister;
