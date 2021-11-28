import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { config } from "../../config";
import { colors } from "../../colors";
import { sendMail } from "../../utils/api/API";
import Reaptcha from "reaptcha";

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
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
  padding: ${(props) => (props.isMobile ? "30px" : "121px 12% 58px")};
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position: bottom right;
  margin-bottom: 78px;
`;
const HeaderTitleContainer = styled.h2`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
`;
const HeaderSubTitleContainer = styled.h3`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 42px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0 0 34px;
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
  const [captchaError, setCaptchaError] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

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
      } else if (!isCaptchaVerified) {
        setCaptchaError(true);
      } else {
        setEmailError(false);
        sendEmail();
      }
    }
  };

  //send email on submit
  const sendEmail = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      tel: phone,
      message: message,
      subject: subject,
      destination:
        contactTemplate.acf && contactTemplate.acf.mail_destination_contact
          ? contactTemplate.acf.mail_destination_contact
          : "",
    };
    sendMail(data)
      .then((res) => {
        if (res && res.status === "success") {
          setFormError(false);
          setFormSuccess(true);
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

  const onVerify = () => {
    setIsCaptchaVerified(true);
  };

  return (
    <div>
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
                    name={"tel"}
                    type="tel"
                    className="form-control"
                    id="tel"
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
                    {contactTemplate &&
                      contactTemplate.acf &&
                      contactTemplate.acf.sujets_contact &&
                      contactTemplate.acf.sujets_contact.length > 0 &&
                      contactTemplate.acf.sujets_contact.map((item) => {
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

            <FormGroup>
              <small className={"smallForm"}></small>
              <FormRow>
                <FormRowFullWidth>
                  <Reaptcha
                    sitekey="6LftnV8dAAAAAJUUeKlp5u-MWgP0qAfCiEODp7_4"
                    onVerify={onVerify}
                  />
                  {formSubmitted && captchaError && (
                    <div className="formError">Veuillez vérfier le Captcha</div>
                  )}
                  <p className="mandatoryFields">
                    * informations indispensables
                  </p>
                  <div className="text-center">
                    {formSubmitted && !formError && (
                      <div className="formSuccess">
                        <i
                          class="bi bi-check-lg"
                          style={{ marginRight: 8 }}
                        ></i>
                        Votre message a bien été envoyé, merci !
                      </div>
                    )}
                    {formSubmitted && formError && (
                      <div className="formError">Une erreur s'est produite</div>
                    )}
                  </div>

                  <p className="text-center">
                    <SubmitButton>Envoyer</SubmitButton>
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
      </div>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { options: store.options, pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
