import React, { useState, useEffect } from "react";
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
  loadTypeFilter,
  loadKeywordsFilter,
  loadFormatsFilter,
  loadCategoriesFilter,
  loadDateFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";
import {
  getRessourceById,
  getCommentaireByPost,
} from "../../utils/api/RessourcesApi";
import { Link } from "react-router-dom";
require("moment/locale/fr.js");

const MainContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 10px auto;
  width: 100%;
  background-color: white;
  position: relative;
  box-shadow: 0px 10px 30px rgba(17, 38, 146, 0.05);
  height: fit-content;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 13px 28px;
  align-items: center;
  background-color: ${(props) =>
    props.type === "documents"
      ? colors.yellowBackground
      : props.type === "post"
      ? colors.blueBackground
      : colors.redBackground};
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.05);
`;
const DetailsContainer = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

const LastUpdateContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.marine};
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${colors.rouge};
  cursor: pointer;
`;
const Domaine = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${colors.marine};
  cursor: pointer;
`;

const TitleContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  text-transform: uppercase;
  text-align: left;
  color: ${colors.marine};
`;

const DescriptionContainer = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  color: ${colors.gris};
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  text-decoration: underline;
  font-size: 14px;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  text-align: left;
  color: black;
  cursor: pointer;
`;

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
`;
const Comment = styled.div`
  display: flex;
  font-size: 12px;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  text-align: left;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  color: ${colors.marine};
`;

const FirstPartContainer = styled.div`
  display: flex;
  width: 50%;
`;

const GridResultComponent = (props) => {
  const [details, setDetails] = useState(null);

  const [nbComments, setNbComments] = useState(0);
  let history = useHistory();
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  useEffect(() => {
    if (props.info) {
      getRessourceById(
        props.info.ID,
        props.info.post_type === "post" ? "posts" : props.info.post_type
      )
        .then((res) => setDetails(res))
        .catch((error) => console.log(error));
      getCommentaireByPost(props.info.ID)
        .then((res) => setNbComments(res.length))
        .catch((error) => console.log(error));
    }
  }, [props.info]);

  const domaineAction =
    details && details.acf && details.acf.domaine_daction_principal
      ? props.taxonomie.domainesActions.filter(
          (item) => item.id === details.acf.domaine_daction_principal.term_id
        )[0]
      : null;
  const domaineImpact =
    details && details.acf && details.acf.domaine_dimpact_principal
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === details.acf.domaine_dimpact_principal.term_id
          )[0]
        : null
      : null;

  let tags = details && details.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }
  const type = details && details.type;
  const icon =
    type === "post"
      ? "bi bi-folder"
      : type === "indicateurs"
      ? "bi bi-file-earmark-bar-graph"
      : details && details.acf && details.acf.document.format === "Lien"
      ? "bi bi-link-45deg"
      : details && details.acf && details.acf.document.format === "Texte"
      ? "bi bi-file-earmark-font"
      : details && details.acf && details.acf.document.format === "Tableau"
      ? "bi bi-file-earmark-excel"
      : details && details.acf && details.acf.document.format === "Image"
      ? "bi bi-file-earmark-image"
      : details && details.acf && details.acf.document.format === "Vidéo"
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
      <FirstPartContainer>
        <IconContainer type={type}>
          <i className={icon}></i>
        </IconContainer>

        <DetailsContainer>
          <Link
            to={
              props && props.info && props.info.post_type
                ? "/" + props.info.post_type + "/" + props.info.ID
                : ""
            }
            style={{ textDecoration: "none" }}
          >
            {" "}
            {details && details.title && (
              <TitleContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(details.title.rendered),
                }}
              ></TitleContainer>
            )}
            {details && details.acf && (
              <DescriptionContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    details.acf.extrait.length > 150
                      ? details.acf.extrait.substr(0, 150)
                      : details.acf.extrait
                  ),
                }}
              ></DescriptionContainer>
            )}{" "}
          </Link>
          {details &&
            details.acf &&
            details.acf.document &&
            details.acf.document.fichier_joint.subtype === "pdf" && (
              <UploadContainer
                onClick={() => {
                  openInNewTab(details.acf.document.fichier_joint.url);
                }}
              >
                <BsDownload style={{ marginRight: "8px" }} />
                TÉLÉCHARGER
                {details.acf.document.fichier_joint.filesize && (
                  <div style={{ color: "grey", marginLeft: "5px" }}>
                    {"(" +
                      (
                        details.acf.document.fichier_joint.filesize / 10000
                      ).toFixed(1)}{" "}
                    Mo)
                  </div>
                )}
              </UploadContainer>
            )}
        </DetailsContainer>
      </FirstPartContainer>
      <LastUpdateContainer>
        {details && moment(details.modified).format("DD/MM/YYYY")}
      </LastUpdateContainer>

      {domaineAction && (
        <Category onClick={handleClickAction}>{domaineAction.name}</Category>
      )}

      {domaineImpact && (
        <Domaine onClick={handleClickImpact}>{domaineImpact.name}</Domaine>
      )}

      {tags && (
        <TagContainer>
          {tags.map((item, index) => {
            let comma = index < tags.length - 1 ? ", " : "";
            return (
              <>
                {" "}
                <div onClick={() => handleClickTag(item.name)}>
                  {item.name}
                </div>{" "}
                {comma}
              </>
            );
          })}
        </TagContainer>
      )}
      <PostInfoContainer>
        <div>
          <Comment>
            <BiComment size={18} style={{ marginRight: "7px" }} />
            {nbComments}
          </Comment>
        </div>
        {details && details.acf && details.acf.datas && (
          <div style={{ display: "flex" }}>
            <Comment>
              <AiOutlineLike
                size={18}
                style={{
                  color: colors.gris,
                  marginRight: "7px",
                  marginLeft: "7px",
                }}
              />
              {details.acf.datas.likes}
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
              {details.acf.datas.vues}
            </Comment>
          </div>
        )}
      </PostInfoContainer>
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
