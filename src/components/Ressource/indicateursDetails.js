import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import {
  getRessourceById,
  getRessourceBySlug,
} from "../../utils/api/RessourcesApi";
import moment from "moment";
import { config } from "../../config";
import DOMPurify from "dompurify";
import Comments from "../../components/Ressource/Comments";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

require("moment/locale/fr.js");

const LastUpdateContainer = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 13px;
`;

const RightSideContainer = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`;
const HeaderRightSideTopContainer = styled.header`
  width: -webkit-fill-available;
  padding: ${(props) => (props.isMobile ? "10px 20px" : "50px 0px")};
`;

const Comment = styled.div`
  display: flex;
  font-size: 12px;
  color: ${colors.gris};
  align-items: center;
  font-weight: 400;
  text-align: left;
`;
const HeaderRightSideBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isMobile ? "10px 20px" : "0px")};
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
  font-size: 35px;
  font-weight: 700;
  line-height: 58px;
  text-align: left;
  color: ${colors.marine};
  margin: 0;
`;
const TagContainer = styled.div`
  font-size: 14px;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  align-items: center;
  text-align: left;
  color: ${colors.marine};
  margin-top: 20px;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;

const LikeContainer = styled.div`
  display: flex;
  padding: 15px 0px;
  border-bottom: 0.5px solid lightgrey;
  width: fit-content;
`;

const UpdateContainer = styled.time`
  padding: 10px 0px 0 0px;
`;

const BodyContainer = styled.div`
  display: flex;
  padding: ${(props) => (props.isMobile ? "10px 20px" : "50px 0px")};
  justify-content: ${(props) => (props.isMobile ? "center" : "")};
`;

const LeftSideBodyComponent = styled.div``;

const ContentContainer = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 31px;
  color: ${colors.text};
  text-align: left;
`;

const UploadButton = styled.div`
  display: flex;
  margin: auto;
  text-transform: uppercase;
  font-size: 14px;
  background-color: ${colors.rouge};
  color: white;
  font-weight: 700;
  padding: 17px 29px;
  cursor: pointer;
  max-width: max-content;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transition: box-shadow 150ms linear, background-color 150ms linear,
      transform 150ms linear;
    transform: scale(0.98);
  }
`;

const AddLikeContainer = styled.div`
  display: flex;
  margin: 50px auto;
  padding: 27px;
  justify-content: center;
  font-weight: 700;
  align-items: center;
  border-top: 0.5px solid lightGrey;
  border-bottom: 0.5px solid lightGrey;
`;

const ArianeContainer = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #99a0b1;
  padding-bottom: 40px;
`;

const TitleBodyContainer = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 130%;
  text-transform: uppercase;
  margin-bottom: 34px;
`;
const Indicateur = (props) => {
  const [indicateur, setIndicateur] = useState(null);
  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  useEffect(() => {
    props.resetAllFilter();
    if (slug) {
      getRessourceBySlug(slug, props.type)
        .then((res) => {
          if (res.length) {
            setIndicateur(res[0]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getRessourceById(indicateurId, props.type)
        .then((res) => setIndicateur(res))
        .catch((error) => console.log(error));
    }
  }, []);

  const indicateurId = props.id && props.id.length && props.id[0];
  const slug = props.match && props.match.params && props.match.params.id;

  const domaineAction =
    indicateur && indicateur.acf && indicateur.acf.domaine_daction_principal;

  const domaineImpact =
    indicateur && indicateur.acf && indicateur.acf.domaine_dimpact_principal;

  const listIndicateurTemplate = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "liste-des-indicateurs"
      )[0]
    : null;

  let tags = indicateur && indicateur.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const showCommment =
    indicateur && indicateur.comment_status === "open" ? true : false;
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
    <RightSideContainer>
      <HeaderRightSideTopContainer isMobile={isMobile}>
        <ArianeContainer>
          <Link
            className="cliquable_link"
            to={"/liste-des-indicateurs"}
            style={{
              textDecoration: "none",
              color: colors.gris,
              margin: "0 5px",
            }}
          >
            {listIndicateurTemplate &&
              listIndicateurTemplate.title &&
              listIndicateurTemplate.title.rendered}{" "}
          </Link>
          {" > "}

          <div
            className="cliquable_link"
            onClick={() => {
              history.push({
                pathname: "/domaine-impact/" + domaineImpact.term_id,
                state: { id: domaineImpact.term_id },
              });
            }}
            style={{
              color: colors.gris,
              margin: "0 5px",
              cursor: "pointer",
            }}
          >
            {domaineImpact && domaineImpact.name}
          </div>

          {" > "}
          <div
            style={{
              color: colors.gris,
              margin: "0 5px",
            }}
          >
            {indicateur && indicateur.title && indicateur.title.rendered}
          </div>
        </ArianeContainer>

        <CategoryContainer>
          {domaineAction && (
            <Category onClick={handleClickAction}>
              {domaineAction.name}
            </Category>
          )}
          <BsDot />
          {domaineImpact && (
            <Domaine onClick={handleClickImpact}>{domaineImpact.name}</Domaine>
          )}
        </CategoryContainer>
        {indicateur !== null && indicateur.title && (
          <TitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(indicateur.title.rendered),
            }}
          />
        )}
        {tags && (
          <TagContainer>
            <BsTags style={{ marginRight: "8px" }} />
            {tags.map((item, index) => {
              let comma = index < tags.length - 1 ? ", " : "";
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
          </TagContainer>
        )}
      </HeaderRightSideTopContainer>

      <HeaderRightSideBottomContainer isMobile={isMobile}>
        {indicateur && indicateur.acf && indicateur.acf.datas && (
          <LikeContainer>
            <Comment>
              <AiOutlineLike
                className="cliquable_link"
                size={18}
                style={{ color: colors.gris, marginRight: "7px" }}
              />
              {indicateur.acf.datas.likes}
            </Comment>
            <Comment>
              <AiOutlineEye
                className="cliquable_link"
                size={18}
                style={{
                  color: colors.gris,
                  marginRight: "7px",
                  marginLeft: "10px",
                }}
              />
              {indicateur.acf.datas.vues}
            </Comment>
          </LikeContainer>
        )}
        <UpdateContainer>
          <LastUpdateContainer>
            publié le {document && moment(document.date).format("DD MMMM YYYY")}
          </LastUpdateContainer>
          <LastUpdateContainer>
            mis à jour le{" "}
            {document && moment(document.modified).format("DD MMMM YYYY")}
          </LastUpdateContainer>
        </UpdateContainer>
      </HeaderRightSideBottomContainer>

      <BodyContainer isMobile={isMobile}>
        <LeftSideBodyComponent>
          {indicateur && indicateur.content && indicateur.content.rendered && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(indicateur.content.rendered),
              }}
            />
          )}

          {indicateur &&
            indicateur.acf &&
            indicateur.acf.dernier_resultat_connu && (
              <>
                <TitleBodyContainer>
                  {indicateur.acf.dernier_resultat_connu.titre}
                </TitleBodyContainer>
                <ContentContainer
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      indicateur.acf.dernier_resultat_connu.texte
                    ),
                  }}
                />
              </>
            )}

          {indicateur &&
            indicateur.acf &&
            indicateur.acf.fiche_indicateur &&
            indicateur.acf.fiche_indicateur.subtype === "pdf" && (
              <UploadButton
                onClick={() => {
                  openInNewTab(indicateur.acf.fiche_indicateur.url);
                }}
              >
                <BsDownload style={{ marginRight: "8px" }} />
                Télécharger la fiche complète de l’indicateur
              </UploadButton>
            )}
          <AddLikeContainer>
            Cette ressource vous a inspiré ?{" "}
            <AiOutlineLike
              size={18}
              color={colors.gris}
              style={{ marginRight: "7px", marginLeft: "7px" }}
              cursor={"pointer"}
            />
            <AiOutlineDislike
              size={18}
              color={colors.gris}
              style={{ marginRight: "7px" }}
              cursor={"pointer"}
            />
          </AddLikeContainer>
          <Comments postID={indicateurId} showCommment={showCommment} />
        </LeftSideBodyComponent>
      </BodyContainer>
    </RightSideContainer>
  );
};

const mapDispatchToProps = {
  loadImpactsFilter,
  loadActionsFilter,
  loadKeywordsFilter,
  resetAllFilter,
};

const mapStateToProps = (store) => {
  return {
    taxonomie: store.taxonomie,
    pages: store.pages,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicateur);
