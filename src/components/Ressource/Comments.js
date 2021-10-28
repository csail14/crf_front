import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const TitleContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;
  color: black;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  margin-bottom: 36px;
`;
const Title = styled.div`
  display: flex;
  margin-bottom: 11px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  text-align: left;
  color: black;
  margin-right: 8px;
`;
const Date = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: ${colors.gris};
`;

const Contenu = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  color: ${colors.gris};
  text-align: justify;
`;
const MoreCommentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 700;
  color: ${colors.marine};
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const SendButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 17px 29px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: ${colors.marine};
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 10px 40px rgba(0, 32, 49, 0.26);
  text-transform: uppercase;
  margin: 20px 0 20px auto;
  max-width: max-content;
`;

const Comments = (props) => {
  const [newComment, setNewComment] = useState("");
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  return (
    <MainContainer>
      <TitleContainer>2 commentaires</TitleContainer>
      <CommentContainer>
        <Title>
          <Name>Estelle</Name>
          <Date>16 septembre 2021 - 13:48</Date>
        </Title>
        <Contenu>
          Nous candidatons avec le projet "Séniors et alors ?" à l'appel à
          projets de recherche participative de la Fondation Jacqueline Maillan.
          On nous demande de préciser l'impact social que nous pressentons pour
          le projet. Merci pour cet article qui m'aide à y voir plus clair… mais
          je n'exclue pas de vous contacter si je m'y perds tout de même ;-)
        </Contenu>
      </CommentContainer>
      <CommentContainer>
        <Title>
          <Name>Estelle</Name>
          <Date>16 septembre 2021 - 13:48</Date>
        </Title>
        <Contenu>
          Nous candidatons avec le projet "Séniors et alors ?" à l'appel à
          projets de recherche participative de la Fondation Jacqueline Maillan.
          On nous demande de préciser l'impact social que nous pressentons pour
          le projet. Merci pour cet article qui m'aide à y voir plus clair… mais
          je n'exclue pas de vous contacter si je m'y perds tout de même ;-)
        </Contenu>
      </CommentContainer>
      <MoreCommentContainer>
        Voir tous les commentaires{" "}
        <MdArrowForwardIos style={{ marginLeft: "5px" }} />
      </MoreCommentContainer>
      <form>
        <textarea
          type="text"
          name="comment"
          className="textArea"
          value={newComment}
          onChange={handleChange}
          placeholder={"Saisissez votre commentaire ici..."}
        />
      </form>
      <SendButton>Laisser un commentaire</SendButton>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
