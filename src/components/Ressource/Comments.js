import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
import { getCommentaireByPost } from "../../utils/api/RessourcesApi";
import moment from "moment";
import DOMPurify from "dompurify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
import { useHistory } from "react-router-dom";
import { postComment } from "../../utils/api/API";

require("moment/locale/fr.js");

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const TitleContainer = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 23px;
  color: black;
  text-transform: uppercase;
  margin-bottom: 20px;
  @media screen and (max-width:900px){
    font-size: 1.5rem;
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 36px;
`;
const Title = styled.div`
  display: flex;
  margin-bottom: 11px;
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 19px;
  color: black;
  margin-right: 8px;
`;
const Date = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 19px;
  color: ${colors.gris};
`;

const Contenu = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 27px;
  color: ${colors.gris};
`;
const MoreCommentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.marine};
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const SendButton = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isMobile ? "center" : "flex-end")};
  padding: 18px 30px;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  background-color: ${colors.marine};
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 10px 40px rgba(0, 32, 49, 0.26);
  text-transform: uppercase;
  margin: 24px 0 20px auto;
  max-width: ${(props) => (props.isMobile ? "" : "max-content")};
  width: ${(props) => (props.isMobile ? "-webkit-fill-available" : "")};
  transition: box-shadow 150ms linear, background-color 150ms linear,
    transform 150ms linear;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);

    transform: scale(0.98);
  }
`;

const Comments = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const hash = history.location.hash;
    // Check if there is a hash and if an element with that id exists

    const el = hash && document.getElementById(hash.substr(1));

    if (el) {
      el.scrollIntoView({ block: "center" });
    }
  }, [history.location.hash]);
  const maxComments = isMobile ? 0 : 5;
  useEffect(() => {
    if (props.postID) {
      getCommentaireByPost(props.postID)
        .then((res) => setAllComments(res))
        .catch((error) => console.log(error));
    }
  }, [props.postID]);
  useEffect(() => {
    if (allComments.length) {
      if (allComments.length < maxComments + 1) {
        setComments(allComments);
      } else {
        setComments(allComments.slice(0, maxComments));
      }
    }
  }, [allComments]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const sendComment = () => {
    let num = Math.floor(Math.random() * 10000);

    if (props.postID && newComment !== "") {
      postComment("Anonyme", num + "@gmail.com", newComment, props.postID).then(
        (res) => {
          if (res.status === 201) {
            setNewComment("");
            setFormError(false);
            setFormSubmitted(true);
            window.location.reload(false);
          } else {
            setFormError(true);
            setFormSubmitted(false);
          }
        }
      );
    }
  };
  return (
    <MainContainer>
      {props.showCommment && (
        <>
          <TitleContainer id="comments">
            {allComments.length}
            {allComments.length > 1 ? " commentaires" : " commentaire"}
          </TitleContainer>
          {(showAllComments
            ? allComments && allComments
            : comments && comments
          ).map((item, index) => {
            return (
              <CommentContainer key={index}>
                <div id="comments"></div>
                <Title>
                  <Name>{item.author_name}</Name>
                  <Date>
                    {" "}
                    {moment(item.date).format("DD MMMM YYYY - HH:mm")}
                  </Date>
                </Title>
                <Contenu
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.content.rendered),
                  }}
                />
              </CommentContainer>
            );
          })}
          {allComments.length > maxComments && (
            <MoreCommentContainer
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments
                ? "Voir moins de commentaires"
                : "Voir tous les commentaires"}{" "}
              <MdArrowForwardIos style={{ marginLeft: "5px" }} />
            </MoreCommentContainer>
          )}

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
          <SendButton onClick={sendComment} isMobile={isMobile}>
            Laisser un commentaire
          </SendButton>

          {formSubmitted && !formError && (
            <div className="formSuccess">
              Votre message a bien été envoyé, merci !
            </div>
          )}
          {formError && (
            <div className="formError">Une erreur s'est produite </div>
          )}
        </>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
