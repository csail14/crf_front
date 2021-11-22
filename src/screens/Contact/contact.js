import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { isMobile } from "react-device-detect";
import { config } from "../../config";
import { colors } from "../../colors";

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 48%;
`;

const ContactForm = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const FormRow = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const FormInputFullWidth = styled.div`
  width: 100%;
`;
const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const FormRowFullWidth = styled.div`
  width: 80%;
  margin-left: 20%;
`;
const SubmitButton = styled.button`
  background: #e30613;
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
  margin: 40px auto;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transition: box-shadow 150ms linear, background-color 150ms linear,
      transform 150ms linear;
    transform: scale(0.98);
  }
`;
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
  const [emailError, setEmailError] = useState(false);

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
  };

  // api call to send email

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      message === "" ||
      subject === ""
    ) {
      setFormError(true);
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError(true);
        setFormSuccess(false);
      } else {
        setEmailError(false);
        setFormError(false);
        setFormSuccess(true);
        sendEmail();
      }
    }
  };
  //send email on submit
  const sendEmail = () => {
    const data = {
      firstName,
      lastName,
      email,
      phone,
      message,
      subject,
    };
    fetch(`${config.api_url}/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const HeaderContainer = styled.header`
    padding: ${isMobile ? "30px" : "80px 140px"};
    text-align: left;
    background-image: url(${config.header_image_url});
    background-size: cover;
    margin-bottom: 78px;
  `;
  const HeaderTitleContainer = styled.h2`
    font-size: 45px;
    color: ${colors.marine};
    line-height: 58px;
    letter-spacing: 0em;
    text-transform: uppercase;
    margin: 0;
  `;
  const HeaderSubTitleContainer = styled.h3`
    font-size: 45px;
    color: ${colors.marine};
    line-height: 58px;
    letter-spacing: 0em;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0;
  `;
  const TermsAndConditions = styled.div`
    line-height: 1.5;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    margin-bottom: 30px;
    color: #939393;
    margin-top: 1rem;
  `;

  const SubtitleContainer = styled.p`
    margin-top: 26px;
    color: ${colors.gris};
  `;
  const contactTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === "contact")[0]
    : null;

  return (
    <>
      <HeaderContainer>
        {contactTemplate && contactTemplate.title ? (
          <HeaderTitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(contactTemplate.title.rendered),
            }}
          />
        ) : (
          <HeaderTitleContainer style={{ fontWeight: "700" }}>
            Je contacte
          </HeaderTitleContainer>
        )}
        <HeaderSubTitleContainer>
          {" "}
          {contactTemplate
            ? contactTemplate.acf.sous_titre
            : "L'EQUIPE DE MESURE D'IMPACT SOCIAL"}
        </HeaderSubTitleContainer>
        {contactTemplate && (
          <SubtitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                contactTemplate &&
                  contactTemplate.acf &&
                  contactTemplate.acf.intro
              ),
            }}
          />
        )}
      </HeaderContainer>

      <div className="contact-container">
        <ContactForm>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <small className={"smallForm"}>Je suis</small>
              <FormRow>
                <FormInput>
                  <label htmlFor="name" className={"contactLabel"}>
                    Prenom <strong style={{ color: colors.rouge }}>*</strong>
                  </label>
                  <input
                    name={"firstName"}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Votre prénom"
                    onChange={handleChange}
                  />
                  {formSubmitted && !firstName && (
                    <div className="formError">
                      Veuillez entrer votre prénom
                    </div>
                  )}
                </FormInput>
                <FormInput>
                  <label htmlFor="name" className={"contactLabel"}>
                    Nom <strong style={{ color: colors.rouge }}>*</strong>
                  </label>
                  <input
                    name={"lastName"}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Votre nom"
                    onChange={handleChange}
                  />
                  {formSubmitted && !lastName && (
                    <div className="formError">Veuillez entrer votre nom</div>
                  )}
                </FormInput>
              </FormRow>
            </FormGroup>
            <FormGroup>
              <small className={"smallForm"}>Pour me joindre</small>
              <FormRow>
                <FormInput>
                  <label htmlFor="phone" className={"contactLabel"}>
                    Téléphone <strong style={{ color: colors.rouge }}>*</strong>
                  </label>
                  <input
                    name={"phone"}
                    type="phone"
                    className="form-control"
                    id="phone"
                    placeholder="Votre numéro de téléphone"
                    onChange={handleChange}
                  />
                  {formSubmitted && !phone && (
                    <div className="formError">
                      Veuillez entrer votre numéro de téléphone
                    </div>
                  )}
                </FormInput>
                <FormInput>
                  <label htmlFor="email" className={"contactLabel"}>
                    Adresse Email{" "}
                    <strong style={{ color: colors.rouge }}>*</strong>
                  </label>
                  <input
                    name={"email"}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Votre adresse mail"
                    onChange={handleChange}
                  />
                  {formSubmitted && !email && (
                    <div className="formError">
                      Veuillez entrer votre adresse mail
                    </div>
                  )}
                  {formSubmitted && emailError && (
                    <div className="formError">
                      Veuillez entrer une adresse mail valide
                    </div>
                  )}
                </FormInput>
              </FormRow>
            </FormGroup>
            <FormGroup>
              <small className={"smallForm"}>Je vous contacte parce que</small>
              <FormRow>
                <FormInputFullWidth>
                  <select
                    className={"formSelect"}
                    onChange={handleChange}
                    name={"subject"}
                  >
                    <option>Choisir le sujet de votre message</option>
                    {props.options &&
                      props.options.options &&
                      props.options.options.acf &&
                      props.options.options.acf.sujets_contact &&
                      props.options.options.acf.sujets_contact.map((item) => {
                        return <option>{item.sujet}</option>;
                      })}
                  </select>
                  {formSubmitted && !subject && (
                    <div className="formError">Veuillez choisir un sujet</div>
                  )}
                </FormInputFullWidth>
              </FormRow>
            </FormGroup>
            <FormGroup>
              <small className={"smallForm"}>Votre message</small>
              <FormRow>
                <FormInputFullWidth>
                  <div className={"formMessageLabel"}></div>
                  <textarea
                    name={"message"}
                    className="formMessage"
                    id="message"
                    rows="3"
                    placeholder="Saisissez ici votre message"
                    onChange={handleChange}
                  />
                  {formSubmitted && !message && (
                    <div className="formError">
                      Veuillez entrer votre message
                    </div>
                  )}
                </FormInputFullWidth>
              </FormRow>
            </FormGroup>
            <FormRowFullWidth className={"mandatoryFields"}>
              <small className={"smallForm"}>
                * informations indispensables
              </small>
            </FormRowFullWidth>
            <FormRowFullWidth>
              {formSubmitted && !formError && (
                <div className="formSuccess">
                  Votre message a bien été envoyé, merci !
                </div>
              )}

              <SubmitButton>Envoyer</SubmitButton>
            </FormRowFullWidth>
            <FormRowFullWidth>
              <TermsAndConditions
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    contactTemplate &&
                      contactTemplate.acf &&
                      contactTemplate.acf.mentions_legales
                  ),
                }}
              />
            </FormRowFullWidth>
          </form>
        </ContactForm>
      </div>
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { options: store.options };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
