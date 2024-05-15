import React, { Component } from "react";
import '../Contactus/Contactus.css'; 
import Contactphoto from '../images/contactus.jpeg'; 
import datas from '../../pages.json'; 

export default class Contactus extends Component {

    render() {
        
      
        return (
          <div className="contact-container">
            <div className="contact-page">
                <div className="contact-image">
                    <img className="img" src={Contactphoto} alt="Contact" />
                </div>
                <div className="contact-form">
                    {datas && datas.map(data => {
                        const contactUsData = data.ContactUs;
                        if (!contactUsData) return null;
                        return (
                            <div className="content" key={contactUsData.pageId}>
                                <h2>{contactUsData.title}</h2>
                                <form>
                                    {contactUsData.Content.map(form => (
                                        <div className="form-group" key={form.id}>
                                            <label htmlFor={`input-${form.id}`}>{form.cardHead}</label>
                                            {form.cardInput === "textarea" ? (
                                                <textarea id={`input-${form.id}`} name={`input-${form.id}`} rows="4" placeholder={`Enter your ${form.cardHead.toLowerCase()}`} />
                                            ) : (
                                                <input type={form.cardInput} id={`input-${form.id}`} name={`input-${form.id}`} placeholder={`Enter your ${form.cardHead.toLowerCase()}`} />
                                            )}
                                        </div>
                                    ))}
                                    <button type="submit">{contactUsData.button}</button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            </div>
            </div>
        );
      
    }
}
