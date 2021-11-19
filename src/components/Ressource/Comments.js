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
require("moment/locale/fr.js");

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
  justify-content: ${(props) => (props.isMobile ? "center" : "flex-end")};
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
  max-width: ${(props) => (props.isMobile ? "" : "max-content")};
  width: ${(props) => (props.isMobile ? "-webkit-fill-available" : "")};
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transition: box-shadow 150ms linear, background-color 150ms linear,
      transform 150ms linear;
    transform: scale(0.98);
  }
`;

const Comments = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const maxComments = isMobile ? 0 : 5;
  useEffect(() => {
    getCommentaireByPost(props.postID)
      .then((res) => setAllComments(res))
      .catch((error) => console.log(error));
  }, []);

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

  return (
    <MainContainer>
      <TitleContainer>
        {allComments.length}
        {allComments.length > 1 ? " commentaires" : " commentaire"}
      </TitleContainer>
      {(showAllComments
        ? allComments && allComments
        : comments && comments
      ).map((item, index) => {
        return (
          <CommentContainer key={index}>
            <Title>
              <Name>{item.author_name}</Name>
              <Date> {moment(item.date).format("DD MMMM YYYY - HH:mm")}</Date>
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
      {props.showCommment && (
        <>
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
          <SendButton isMobile={isMobile}>Laisser un commentaire</SendButton>
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
