import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DOMPurify from "dompurify";

import { colors } from "../../colors";
import { sendMail } from "../../utils/api/API";
import ReCAPTCHA from "react-google-recaptcha";
import header from "../../assets/header.jpeg";

const MainContainer = styled.div`
  min-height: 96vh;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ContactForm = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`;
const FormRow = styled.div`
  width: 90%;
  max-width: 660px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    max-width: none;
    width: 100%;
  }
`;
const FormInputFullWidth = styled.div`
  width: 100%;
`;
const FormGroup = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    .smallForm {
      text-align: left;
      margin-bottom: 20px;
      margin-right: 0;
      width: auto;
      max-width: none;
    }
  }
`;
const FormRowFullWidth = styled.div`
  .mandatoryFields {
    text-transform: uppercase;
    font-size: 1rem;
  }
`;
const SubmitButton = styled.button`
  background: #e30613;
  box-shadow: 0px 10px 40px rgba(125, 0, 7, 0.3);
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 130%;
  /* or 18px */
  border: 0;
  padding: 17px 76px;
  text-transform: uppercase;
  margin: 20px auto;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.3s;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.98);
  }
`;

const HeaderContainer = styled.header`
  padding: 121px 9% 58px;
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
  margin-bottom: 78px;
  @media screen and (max-width: 1024px) {
    padding: 55px 6%;
    margin-bottom: 40px;
  }
`;
const HeaderTitleContainer = styled.h2`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
    line-height: 1.4;
  }
`;
const HeaderSubTitleContainer = styled.h3`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 42px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0 0 34px;
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 20px;
  }
`;
const TermsAndConditions = styled.div`
  line-height: 1.5;
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 12px;
  text-align: center;
  margin-bottom: 30px;
  color: #939393;
  margin-top: 1rem;
  a {
    color: ${colors.rouge};
  }
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
  max-width: 800px;
  line-height: 1.8;
`;

const FormSuccess = styled.div`
  margin: 20px;
  color: #1aa053;
  font-weight: bold;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
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

  const recaptchaRef = useRef(null);
  const idToPreSelected =
    window.location.search &&
    window.location.search.replace("?object=", "") &&
    !isNaN(window.location.search.replace("?object=", "")) &&
    parseInt(window.location.search.replace("?object=", ""));

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "tel") {
      setPhone(e.target.value);
    } else if (e.target.name === "message") {
      setMessage(e.target.value);
    } else if (e.target.name === "subject") {
      setSubject(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    recaptchaRef.current.reset();
    recaptchaRef.current.executeAsync().then((token) => {
      if (token) {
        setFormSubmitted(true);
        setFormSuccess(false);
        if (
          firstName === "" ||
          lastName === "" ||
          email === "" ||
          message === "" ||
          subject === ""
        ) {
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setEmailError(true);
          setFormSuccess(false);
        } else {
          sendEmail();
        }
      }
    });
  };

  const cleanForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSubject("");
  };

  //send email on submit
  const sendEmail = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      referer:
        props.previousPage && props.previousPage !== ""
          ? props.previousPage
          : window.location.href,
      message: message,
      subject:
        contactTemplate &&
        contactTemplate.acf &&
        contactTemplate.acf.sujets_contact &&
        contactTemplate.acf.sujets_contact.length === 1
          ? subject
          : contactTemplate &&
            contactTemplate.acf &&
            contactTemplate.acf.sujets_contact &&
            contactTemplate.acf.sujets_contact[subject] &&
            contactTemplate.acf.sujets_contact[subject].sujet,
      destination:
        contactTemplate.acf && contactTemplate.acf.mail_destination_contact
          ? contactTemplate.acf.mail_destination_contact
          : "",
    };
    console.log(data);
    sendMail(data)
      .then((res) => {
        if (res && res.status === "success") {
          setFormError(false);
          setFormSuccess(true);
          setEmailError(false);
          cleanForm();
          setFormSubmitted(false);
        } else {
          setFormError(true);
          setFormSuccess(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const slug = props.slug || "contact";
  const contactTemplate =
    props.pages && props.pages.templates && props.pages.templates.length
      ? props.pages.templates.filter((template) => template.slug === slug)[0]
      : null;
  useEffect(() => {
    if (
      contactTemplate &&
      contactTemplate.acf &&
      contactTemplate.acf.sujets_contact &&
      contactTemplate.acf.sujets_contact.length === 1
    ) {
      setSubject(contactTemplate.acf.sujets_contact[0].sujet);
    }
    window.scrollTo(0, 0);
  }, [contactTemplate]);
  return (
    <MainContainer>
      <HeaderContainer>
        {contactTemplate && contactTemplate.title ? (
          <HeaderTitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(contactTemplate.title.rendered),
            }}
          />
        ) : (
          <HeaderTitleContainer>Je contacte</HeaderTitleContainer>
        )}
        <HeaderSubTitleContainer>
          {" "}
          {contactTemplate
            ? contactTemplate.acf.sous_titre
            : "L'EQUIPE DE MESURE D'IMPACT SOCIAL"}
        </HeaderSubTitleContainer>
        {contactTemplate && (
          <SubtitleContainer
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
        {!formSuccess && (
          <ContactForm>
            <form>
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
                      value={firstName}
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
                      value={lastName}
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
                      Téléphone
                    </label>
                    <input
                      name={"tel"}
                      type="tel"
                      value={phone}
                      className="form-control"
                      id="tel"
                      onChange={handleChange}
                    />
                  </FormInput>
                  <FormInput>
                    <label htmlFor="email" className={"contactLabel"}>
                      Adresse Email{" "}
                      <strong style={{ color: colors.rouge }}>*</strong>
                    </label>
                    <input
                      name={"email"}
                      type="email"
                      value={email}
                      className="form-control"
                      id="email"
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
                <small className={"smallForm"}>
                  Je vous contacte parce que
                </small>
                <FormRow>
                  {contactTemplate &&
                  contactTemplate.acf &&
                  contactTemplate.acf.sujets_contact &&
                  contactTemplate.acf.sujets_contact.length === 1 ? (
                    <p>{contactTemplate.acf.sujets_contact[0].sujet}</p>
                  ) : (
                    <FormInputFullWidth>
                      <select
                        className={"formSelect"}
                        onChange={handleChange}
                        value={
                          idToPreSelected && idToPreSelected !== ""
                            ? idToPreSelected - 1
                            : undefined
                        }
                        name={"subject"}
                      >
                        <option>Choisir le sujet de votre message</option>
                        {contactTemplate &&
                          contactTemplate.acf &&
                          contactTemplate.acf.sujets_contact &&
                          contactTemplate.acf.sujets_contact.length > 0 &&
                          contactTemplate.acf.sujets_contact.map(
                            (item, index) => {
                              return (
                                <option key={index} value={index}>
                                  {item.sujet}
                                </option>
                              );
                            }
                          )}
                      </select>
                      {formSubmitted && !subject && (
                        <div className="formError">
                          Veuillez choisir un sujet
                        </div>
                      )}
                    </FormInputFullWidth>
                  )}
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
                      value={message}
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

              <FormGroup>
                <small className={"smallForm"}></small>
                <FormRow>
                  <FormRowFullWidth>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITEKEY}
                      size="invisible"
                    />
                    <p className="mandatoryFields">
                      * informations indispensables
                    </p>
                    <div className="text-center">
                      {formError && (
                        <div className="formError">
                          Une erreur s'est produite
                        </div>
                      )}
                    </div>

                    <p className="text-center">
                      <SubmitButton onClick={handleSubmit}>
                        Envoyer
                      </SubmitButton>
                    </p>

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
                </FormRow>
              </FormGroup>
              <FormGroup>
                <small className={"smallForm"}></small>
                <FormRow>
                  <FormRowFullWidth></FormRowFullWidth>
                </FormRow>
              </FormGroup>
            </form>
          </ContactForm>
        )}
        {formSuccess && (
          <FormSuccess>
            <i className="bi bi-check-lg" style={{ marginRight: 8 }}></i>
            Votre message a bien été envoyé, merci !
          </FormSuccess>
        )}
      </div>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { options: store.options, pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
