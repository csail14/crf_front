import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { getMediaById } from "../../utils/api/API";
import { colors } from "../../colors";
import moment from "moment";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import {
  getRessourceById,
  getCommentaireByPost,
} from "../../utils/api/RessourcesApi";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
} from "../../actions/filter/filterActions";
import { HashLink } from "react-router-hash-link";
require("moment/locale/fr.js");

const MainContainer = styled.article`
  flex-basis: 24%;
  margin-right: 1.3%;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0px 10px 30px rgba(17, 38, 146, 0.05);
  height: fit-content;
  transition: box-shadow 150ms linear, background-color 150ms linear,
    transform 150ms linear;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.98);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  padding: 1px 5px 5px 5px;
  text-align: center;
  line-height: 52px;
  font-size: 2.5rem;
  width: 50px;
  height: 52px;
  background-color: ${(props) =>
    props.type === "documents"
      ? colors.yellowBackground
      : props.type === "articles"
      ? colors.blueBackground
      : colors.redBackground};
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.05);
`;
const ImageContainer = styled.div`
  background-color: #f7f9fa;
  cursor: pointer;
`;
const DetailsContainer = styled.div`
  padding: 27px 6% 20px;
  background-color: white;
`;

const LastUpdateContainer = styled.time`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 14px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
  color: ${colors.marine};
`;

const CategoryContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
`;
const Category = styled.div`
  color: ${colors.rouge};
  margin-right: 3px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;
const Domaine = styled.div`
  margin-left: 2px;
  color: ${colors.marine};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;

const TitleContainer = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  margin: 0 0 16px;
  color: #131313;
  cursor: pointer;
  transition: opacity 150ms linear;
  &:hover {
    opacity: 0.8;
  }
`;

const DescriptionContainer = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 22px;
  margin: 16px 0 22px;
  color: ${colors.gris};
`;

const TagContainer = styled.div`
  font-size: 1.4rem;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  color: ${colors.marine};
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
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
  font-size: 1.2rem;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;
const OtherTypePicto = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
`;

const UploadContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellowBackground};
  padding: 20px;
  font-weight: 700;
  color: ${colors.marine};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;
const GridResultComponent = (props) => {
  const [media, setMedia] = useState(null);

  let history = useHistory();

  const componentMounted = useRef(true);

  const domaineAction =
    props.info && props.info.domaine_action
      ? props.taxonomie
        ? props.taxonomie.domainesActions.filter(
            (item) => item.id === props.info.domaine_action.term_id
          )[0]
        : null
      : null;
  const domaineImpact =
    props.info && props.info.domaine_impact
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === props.info.domaine_impact.term_id
          )[0]
        : null
      : null;

  useEffect(() => {
    if (componentMounted.current) {
      if (props.info && props.info.image) {
        setMedia(props.info.image);
      } else if (
        domaineAction &&
        domaineAction.acf &&
        domaineAction.acf.image_par_defaut
      ) {
        if (domaineAction.acf.image_par_defaut.sizes.grille) {
          setMedia(domaineAction.acf.image_par_defaut.sizes.grille);
        } else {
          setMedia(domaineAction.acf.image_par_defaut.sizes.full);
        }
      } else if (
        props.options &&
        props.options.options &&
        props.options.options.acf &&
        props.options.options.acf.image_par_defaut_ressources
      ) {
        if (
          props.options.options.acf.image_par_defaut_ressources.sizes.grille
        ) {
          setMedia(
            props.options.options.acf.image_par_defaut_ressources.sizes.grille
          );
        } else {
          setMedia(
            props.options.options.acf.image_par_defaut_ressources.sizes.full
          );
        }
      }
      return () => {
        // This code runs when component is unmounted
        componentMounted.current = false; // (4) set it to false when we leave the page
      };
    }
  }, [props.info, domaineAction, props.options]);

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

  const handleClickAction = () => {
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
      <ImageContainer
        onClick={() => {
          history.push({
            pathname:
              props.info && props.info.link ? "/" + props.info.link : "",
            state: { id: props.info && props.info.id },
          });
        }}
      >
        <IconContainer type={type}>
          <i className={icon}></i>
        </IconContainer>

        {media ? (
          <img
            style={{
              height: "auto",
              padding: "  30px 7% 0",
            }}
            src={media}
            alt="result-illu"
          />
        ) : (
          <div style={{ width: "150px", height: "200px" }}></div>
        )}
      </ImageContainer>

      <DetailsContainer>
        <LastUpdateContainer>
          mis à jour le{" "}
          {props.info &&
            moment(props.info.date_modified).format("DD MMMM YYYY")}
        </LastUpdateContainer>
        {(domaineImpact || domaineAction) && (
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
          </CategoryContainer>
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

        {props.info && props.info.excerpt && (
          <DescriptionContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                props.info.excerpt.length > 150
                  ? props.info.excerpt.substr(0, 150)
                  : props.info.excerpt
              ),
            }}
          ></DescriptionContainer>
        )}
        {props.info && props.info.tags && props.info.tags.length > 0 && (
          <TagContainer>
            <BsTags style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {props.info.tags.map((item, index) => {
                let comma = index < props.info.tags.length - 1 ? ", " : "";
                return (
                  <div style={{ display: "flex" }} key={index}>
                    {" "}
                    <div onClick={() => handleClickTag(item.name)}>
                      {item.name}
                    </div>{" "}
                    {comma}
                  </div>
                );
              })}
            </div>
          </TagContainer>
        )}
        <BottomContainer>
          <PostInfoContainer>
            <Comment>
              <HashLink
                to={
                  props.info && props.info.link
                    ? "/" + props.info.link + "#comments"
                    : ""
                }
              >
                <BiComment
                  size={18}
                  style={{ marginRight: "7px", verticalAlign: "middle" }}
                />
                {props.info && props.info.nb_com}{" "}
                {props.info && props.info.nb_com > 1
                  ? "Commentaires"
                  : "Commentaire"}
              </HashLink>
            </Comment>
            {props.info && props.info.datas && (
              <div style={{ display: "flex" }}>
                <OtherTypePicto>
                  <AiOutlineLike
                    size={18}
                    style={{
                      color: colors.gris,
                      marginRight: "7px",
                      verticalAlign: "middle",
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
                      verticalAlign: "middle",
                    }}
                  />
                  {props.info.datas.vues}
                </OtherTypePicto>
              </div>
            )}
          </PostInfoContainer>
        </BottomContainer>
      </DetailsContainer>
      {props.info &&
        props.info.download &&
        (props.info.format === "Texte" || props.info.format === "Tableau") && (
          <UploadContainer href={props.info.download.url} target="_blank">
            <BsDownload style={{ marginRight: "8px" }} />
            TÉLÉCHARGER
            {props.info.download.filesize && (
              <div style={{ color: "grey", marginLeft: "5px" }}>
                {"(" + (props.info.download.filesize / 10000).toFixed(1)} Mo)
              </div>
            )}
          </UploadContainer>
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
