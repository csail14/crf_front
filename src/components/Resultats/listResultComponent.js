import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDownload, BsDot } from "react-icons/bs";

import { BiComment } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { config } from "../../config";
import { colors } from "../../colors";
import moment from "moment";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
} from "../../actions/filter/filterActions";
import {
  getRessourceById,
  getCommentaireByPost,
} from "../../utils/api/RessourcesApi";
import useMediaQuery from "@mui/material/useMediaQuery";
require("moment/locale/fr.js");

const MainContainer = styled.article`
  align-items: center;
  display: flex;
  margin: 10px auto;
  width: 100%;
  background-color: white;
  position: relative;
  box-shadow: 0px 10px 30px rgba(17, 38, 146, 0.05);
  height: fit-content;
  cursor: pointer;
  transition: box-shadow 150ms linear, background-color 150ms linear,
    transform 150ms linear;
  &:hover {
    box-shadow: 6px 8px 15px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.99);
  }
`;

const IconContainer = styled.div`
  display: flex;
  padding: 13px 28px;
  font-size: 2.5rem;
  align-items: center;
  background-color: ${(props) =>
    props.type === "documents"
      ? colors.yellowBackground
      : props.type === "articles"
      ? colors.blueBackground
      : colors.redBackground};
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.05);
`;
const DetailsContainer = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

const LastUpdateContainer = styled.time`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 14px;
  text-transform: uppercase;
  color: #6c757d;
  padding-right: 5px;
  flex-basis: 8.5%;
  & + div:last-of-type {
    margin-left: auto;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${colors.rouge};
  flex-basis: 10%;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  font-size: 1.4rem;
  padding-right: 5px;
  & + div:last-of-type {
    margin-left: auto;
  }
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;
const Domaine = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding-right: 5px;
  color: ${colors.marine};
  font-size: 1.4rem;
  cursor: pointer;
  flex-basis: 10%;
  & + div:last-of-type {
    margin-left: auto;
  }
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const TitleContainer = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  cursor: pointer;
  color: #131313;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const DescriptionContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.gris};
  p {
    margin: 10px 0 0;
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  flex-wrap: wrap;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  color: black;
  padding-right: 5px;
  cursor: pointer;
  flex-basis: 12%;
  transition: opacity 150ms linear, transform 150ms linear;
  margin-right: 0;
  margin-left: auto;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
  span {
    text-decoration: underline;
  }
`;

const PostInfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 12.5%;
  justify-content: flex-end;
  padding-right: 2%;
  margin-right: 0;
`;
const Comment = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  cusor: pointer;
  margin-right: 5%;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const OtherTypePicto = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  margin-right: 5%;
`;

const UploadContainer = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  color: black;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const FirstPartContainer = styled.div`
  display: flex;
  flex-basis: ${(props) => (props.isMobile ? "" : "47%")};
`;

const CategoryContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 13px;
`;

const GridResultComponent = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  let history = useHistory();

  const domaineAction =
    props.info && props.info.domaine_action
      ? props.taxonomie.domainesActions.filter(
          (item) => item.id === props.info.domaine_action.term_id
        )[0]
      : null;
  const domaineImpact =
    props.info && props.info.domaine_impact
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === props.info.domaine_impact.term_id
          )[0]
        : null
      : null;

  const type = props.info && props.info.type;
  const icon =
    type === "articles"
      ? "bi bi-folder"
      : type === "indicateurs"
      ? "bi bi-file-earmark-bar-graph"
      : props.info && props.info.format === "Lien"
      ? "bi bi-link-45deg"
      : props.info && props.info.format === "Web"
      ? "bi bi-file-code"
      : props.info && props.info.format === "Texte"
      ? "bi bi-file-earmark-font"
      : props.info && props.info.format === "Tableau"
      ? "bi bi-file-earmark-excel"
      : props.info && props.info.format === "Image"
      ? "bi bi-file-earmark-image"
      : props.info && props.info.format === "Vidéo"
      ? "bi bi-file-earmark-play"
      : "";

  const handleClickAction = (e) => {
    e.stopPropagation();
    let array = [];
    array.push(domaineAction);
    props.loadActionsFilter(array);
    history.push("/recherche");
  };

  const handleClickImpact = () => {
    let array = [];
    array.push(domaineImpact);
    props.loadImpactsFilter(array);
    history.push("/recherche");
  };
  const handleClickTag = (item) => {
    props.loadKeywordsFilter(item);
    history.push("/recherche");
  };

  return (
    <MainContainer>
      <FirstPartContainer isMobile={isMobile}>
        <IconContainer type={type}>
          <i className={icon}></i>
        </IconContainer>

        <DetailsContainer>
          {isMobile && (
            <>
              {" "}
              <CategoryContainer>
                {domaineAction && (
                  <Category onClick={handleClickAction}>
                    {domaineAction.name}
                  </Category>
                )}
                <BsDot />
                {domaineImpact && (
                  <Domaine onClick={handleClickImpact}>
                    {domaineImpact.name}
                  </Domaine>
                )}
              </CategoryContainer>{" "}
            </>
          )}
          {props.info && props.info.title && (
            <TitleContainer
              onClick={() => {
                history.push({
                  pathname: props.info.link ? "/" + props.info.link : "",
                  state: { id: props.info.link.id },
                });
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.info.title.rendered),
              }}
            ></TitleContainer>
          )}
          {props.info && props.info.excerpt && !isMobile && (
            <DescriptionContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  props.info.excerpt.length > 150
                    ? props.info.excerpt.substr(0, 150)
                    : props.info.excerpt
                ),
              }}
            ></DescriptionContainer>
          )}{" "}
          {props.info &&
            props.info.download &&
            (props.info.format === "Texte" ||
              props.info.format === "Tableau") && (
              <UploadContainer href={props.info.download.url} target="_blank">
                <BsDownload style={{ marginRight: "8px" }} />
                TÉLÉCHARGER
                {props.info.download.filesize && (
                  <div style={{ color: "grey", marginLeft: "5px" }}>
                    {"(" + (props.info.download.filesize / 10000).toFixed(1)}{" "}
                    Mo)
                  </div>
                )}
              </UploadContainer>
            )}
        </DetailsContainer>
      </FirstPartContainer>
      {isMobile ? (
        <></>
      ) : (
        <>
          <LastUpdateContainer>
            {props.info &&
              moment(props.info.date_modified).format("DD/MM/YYYY")}
          </LastUpdateContainer>

          {domaineAction && (
            <Category onClick={handleClickAction}>
              {domaineAction.name}
            </Category>
          )}

          {domaineImpact && (
            <Domaine onClick={handleClickImpact}>{domaineImpact.name}</Domaine>
          )}

          {props.info && props.info.tags && props.info.tags.length > 0 && (
            <TagContainer>
              {props.info.tags.map((item, index) => {
                let comma = index < props.info.tags.length - 1 ? ", " : "";
                return (
                  <div key={index}>
                    {" "}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickTag(item.name);
                      }}
                    >
                      {item.name}
                    </span>
                    {""}
                    {comma}
                  </div>
                );
              })}
            </TagContainer>
          )}
          <PostInfoContainer>
            <Comment>
              <BiComment size={18} style={{ marginRight: "7px" }} />
              {props.info && props.info.nb_com}
            </Comment>
            {props.info && props.info.datas && (
              <div style={{ display: "flex" }}>
                <OtherTypePicto>
                  <AiOutlineLike
                    size={18}
                    style={{
                      color: colors.gris,
                      marginRight: "7px",
                      marginLeft: "7px",
                    }}
                  />
                  {props.info.datas.likes}
                </OtherTypePicto>
                <OtherTypePicto>
                  <AiOutlineEye
                    size={18}
                    style={{
                      color: colors.gris,
                      marginRight: "7px",
                      marginLeft: "10px",
                    }}
                  />
                  {props.info.datas.vues}
                </OtherTypePicto>
              </div>
            )}
          </PostInfoContainer>
        </>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {
  loadImpactsFilter,
  loadActionsFilter,
  loadKeywordsFilter,
};

const mapStateToProps = (store) => {
  return {
    taxonomie: store.taxonomie,
    options: store.options,
    filters: store.filters,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridResultComponent);
