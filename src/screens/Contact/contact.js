import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {connect} from "react-redux";

const FormInput = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 1rem;
width: 48%;
`

const ContactForm = styled.div`
    width: 80%;
    margin: 0 auto;
`
const FormRow = styled.div`
width: 80%;
margin: 0 auto;
display: flex;
flex-direction: row;
justify-content: space-between;
`
const FormInputFullWidth = styled.div`
width: 100%;
`
const FormGroup = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
`
const FormRowFullWidth = styled.div`
width: 80%;
margin-left: 20%;
`
const SubmitButton = styled.button`
background: #E30613;
box-shadow: 0px 10px 40px rgba(125, 0, 7, 0.3);
font-family: Raleway;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 130%;
/* or 18px */
    width: 9rem;
    height: 2.5rem;
text-transform: uppercase;

color: #FFFFFF;
`
const Contact = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
        } else if (e.target.name === "lastName") {
            setLastName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "message") {
            setMessage(e.target.value);
        } else if (e.target.name === "subject") {
            setSubject(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, phone, message, subject);
        setFormSubmitted(true);
        if (firstName && lastName && email && phone && message && subject) {
            setFormSuccess(true);
        } else {
            setFormError(true);
        }
    }

    useEffect(() => {
        if (formSubmitted && !formError) {
            setTimeout(() => {
                setFormSubmitted(false);
                setFormSuccess(false);
                setFormError(false);
            }, 5000);
        }
    }, [formSubmitted, formError]);




    return (
        <div className="contact-container">
            <ContactForm>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <small className={'smallForm'}>Je suis</small>
                        <FormRow>
                            <FormInput>
                                <label htmlFor="name" className={"contactLabel"}>Prenom</label>
                                <input
                                    name={'firstName'}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Votre prénom"
                                    onChange={handleChange}
                                />
                                {formSubmitted && !firstName && <div className="formError">Veuillez entrer votre prénom</div>}
                            </FormInput>
                            <FormInput>
                                <label htmlFor="name" className={"contactLabel"}>Nom</label>
                                <input
                                    name={'lastName'}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Votre nom"
                                    onChange={handleChange}
                                />
                                {formSubmitted && !lastName && <div className="formError">Veuillez entrer votre nom</div>}
                            </FormInput>
                        </FormRow>
                    </FormGroup>
                    <FormGroup>
                        <small className={'smallForm'}>Pour me joindre</small>
                        <FormRow>
                            <FormInput>
                                <label htmlFor="phone" className={"contactLabel"}>Téléphone</label>
                                <input
                                    name={'phone'}
                                    type="phone"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Votre numéro de téléphone"
                                    onChange={handleChange}
                                />
                                {formSubmitted && !phone && <div className="formError">Veuillez entrer votre numéro de téléphone</div>}
                            </FormInput>
                            <FormInput>
                                <label htmlFor="email" className={"contactLabel"}>Email</label>
                                <input
                                    name={'email'}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Votre adresse mail"
                                    onChange={handleChange}
                                />
                                {formSubmitted && !email && <div className="formError">Veuillez entrer votre adresse mail</div>}
                            </FormInput>
                        </FormRow>
                    </FormGroup>
                    <FormGroup>
                        <small className={"smallForm"}>Je vous contacte parce que</small>
                        <FormRow>
                            <FormInputFullWidth>
                                <select className={"formSelect"} onChange={handleChange} name={'subject'}>
                                    <option>Choisir le sujet de votre message</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                                {formSubmitted && !subject && <div className="formError">Veuillez choisir un sujet</div>}
                            </FormInputFullWidth>
                        </FormRow>
                    </FormGroup>
                    <FormGroup>
                        <small className={'smallForm'}>Votre message</small>
                        <FormRow>
                            <FormInputFullWidth>
                                <div className={"formMessageLabel"}>
                                    <label htmlFor="message" className={"contactLabel"}>Message</label>
                                </div>
                                <textarea
                                    name={'message'}
                                    className="formMessage"
                                    id="message"
                                    rows="3"
                                    placeholder="Enter message"
                                    onChange={handleChange}
                                />
                                {formSubmitted && !message && <div className="formError">Veuillez entrer votre message</div>}
                            </FormInputFullWidth>
                        </FormRow>
                    </FormGroup>
                        <FormRowFullWidth>
                            {formSubmitted && !formError && <div className="formSuccess">Votre message a bien été envoyé</div>}

                            <SubmitButton>Envoyer</SubmitButton>
                        </FormRowFullWidth>
                </form>
            </ContactForm>
        </div>
    );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
