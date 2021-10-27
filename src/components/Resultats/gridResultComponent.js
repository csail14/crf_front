import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import resultImage from "../../assets/resultImage.png";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

import { colors } from "../../colors";
import moment from "moment";
import DOMPurify from "dompurify";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import { Link } from "react-router-dom";
require("moment/locale/fr.js");

const MainContainer = styled.div`
  margin: 10px;
  max-width: 350px;
  position: relative;
  box-shadow: 0px 10px 30px rgba(17, 38, 146, 0.05);
`;

const IconContainer = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  background-color: ${colors.yellowBackground};
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.05);
`;
const ImageContainer = styled.div`
  background-color: #f7f9fa;
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

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellowBackground};
  padding: 20px;
  font-weight: 700;
  color: ${colors.marine};
`;
const GridResultComponent = (props) => {
  const [details, setDetails] = useState(null);
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
    }
  }, [props.info]);

  const domaineAction =
    details && details.acf && details.acf.domaine_daction_principal
      ? props.taxonomie.domainesActions.filter(
          (item) => item.id === details.acf.domaine_daction_principal
        )[0]
      : null;

  const domaineImpact =
    details && details.acf && details.acf.domaine_dimpact_principal
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === details.acf.domaine_dimpact_principal
          )[0]
        : null
      : null;

  let tags = details && details.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }
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
          <IconContainer />
          <img src={resultImage} alt="result-illu" />
        </ImageContainer>
        <DetailsContainer>
          <LastUpdateContainer>
            mis à jour le{" "}
            {props.info &&
              moment(props.info.post_modified).format("DD MMMM YYYY")}
          </LastUpdateContainer>
          <CategoryContainer>
            {domaineAction && <Category>{domaineAction.name}</Category>}
            <BsDot />
            {domaineImpact && <Domaine>{domaineImpact.name}</Domaine>}
          </CategoryContainer>
          <TitleContainer>{props.info && props.info.post_title}</TitleContainer>
          {details && details.acf && (
            <DescriptionContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(details.acf.extrait),
              }}
            ></DescriptionContainer>
          )}
          {tags && (
            <TagContainer>
              <BsTags style={{ marginRight: "8px" }} />
              {tags.map((item) => {
                return item.name + ", ";
              })}
            </TagContainer>
          )}
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
        {details && details.acf && details.acf.document && (
          <UploadContainer
            onClick={() => {
              openInNewTab(details.acf.document.fichier_joint.url);
            }}
          >
            <BsDownload style={{ marginRight: "8px" }} />
            TÉLÉCHARGER
            <div style={{ color: "grey", marginLeft: "5px" }}>
              {"(" +
                (details.acf.document.fichier_joint.filesize / 10000).toFixed(
                  1
                )}{" "}
              Mo)
            </div>
          </UploadContainer>
        )}
      </Link>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridResultComponent);
