import React, { Component } from 'react';
import './SignIn.css'; 
import signInImage from '../images/back.jpeg'; 
import Data from '../../pages.json';



export default class SignIn extends Component {
    render() {
        return(
            Data && Data.map(data => {
                const signinData = data.SignInPage;
                if (!signinData) return null; 
      
            return (
                <div className="signin-container">
                    <div className="signin-image">  
                        <img src={signInImage} alt="Sign In" />
                    </div>
                    <div className='lable'>
                        <div className="signin-form">
                            <div className="signin-label">
                                <h1>{signinData.title}</h1>
                                <label id="Email" htmlFor="email">{signinData.emailLabel}</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address" />
                                <button className="send-code-button">{signinData.sendCodeButton}</button>
                                <div className="signin-options">
                                    <p>---------OR---------</p><br></br>
                                    <button className="google-button">{signinData.loginWithGoogle}</button><br></br>
                                    <button className="create-account-button">{signinData.createAccount}</button>
                                </div>
                                <p className="terms-privacy">{signinData.termsAndPrivacy}</p>
                            </div>
                        </div>
                    </div>
                </div>

            );
        })

    )}
}