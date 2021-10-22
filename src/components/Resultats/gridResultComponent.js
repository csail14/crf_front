import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import resultImage from "../../assets/resultImage.png";
import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { colors } from "../../colors";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
require("moment/locale/fr.js");

const MainContainer = styled.div`
  margin: 10px;
  max-width: 350px;
`;
const ImageContainer = styled.div`
  background-color: #f7f9fa;
  border: 0.5 solid black;
`;
const DetailsContainer = styled.div`
  padding: 30px 22px;
  background-color: white;
`;

const LastUpdateContainer = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 13px;
  color: ${colors.marine};
`;

const CategoryContainer = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 13px;
`;
const Category = styled.div`
  color: ${colors.rouge};
  margin-right: 3px;
`;
const Domaine = styled.div`
  margin-left: 2px;
  color: ${colors.marine};
`;

const TitleContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 16px;
  color: ${colors.marine};
`;

const DescriptionContainer = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 16px;
  text-align: left;
  color: ${colors.gris};
`;

const TagContainer = styled.div`
  font-size: 14px;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  text-align: left;
  color: ${colors.marine};
  margin-bottom: 20px;
`;

const BottomContainer = styled.div`
  border-top: 0.5px solid lightgrey;
`;

const PostInfoContainer = styled.div`
  display: flex;
  padding-top: 13px;
  justify-content: space-between;
`;
const Comment = styled.div`
  display: flex;
  font-size: 12px;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  text-align: left;
`;
const GridResultComponent = (props) => {
  console.log(props.info);
  return (
    <MainContainer>
      <Link
        to={
          props && props.info && props.info.post_type
            ? "/" + props.info.post_type + "/" + props.info.ID
            : ""
        }
        style={{ textDecoration: "none" }}
      >
        <ImageContainer>
          <img src={resultImage} alt="result-illu" />
        </ImageContainer>
        <DetailsContainer>
          <LastUpdateContainer>
            mis à jour le{" "}
            {props.info &&
              moment(props.info.post_modified).format("DD MMMM YYYY")}
          </LastUpdateContainer>
          <CategoryContainer>
            <Category>automonie</Category>
            <BsDot />
            <Domaine>ehpad</Domaine>
          </CategoryContainer>
          <TitleContainer>{props.info && props.info.post_title}</TitleContainer>
          {props.info && (
            <DescriptionContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.info.post_content),
              }}
            ></DescriptionContainer>
          )}
          <TagContainer>
            <BsTags style={{ marginRight: "8px" }} />
            Repères
          </TagContainer>
          <BottomContainer>
            <PostInfoContainer>
              <div>
                <Comment>
                  <BiComment size={18} style={{ marginRight: "7px" }} />
                  13 Commentaires
                </Comment>
              </div>
              <div style={{ display: "flex" }}>
                <Comment>
                  <AiOutlineLike
                    size={18}
                    style={{ color: colors.gris, marginRight: "7px" }}
                  />
                  425
                </Comment>
                <Comment>
                  <AiOutlineEye
                    size={18}
                    style={{
                      color: colors.gris,
                      marginRight: "7px",
                      marginLeft: "10px",
                    }}
                  />
                  736
                </Comment>
              </div>
            </PostInfoContainer>
          </BottomContainer>
        </DetailsContainer>
      </Link>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridResultComponent);
