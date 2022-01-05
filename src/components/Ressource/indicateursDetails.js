import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import { Redirect } from "react-router-dom";
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
import { addLikeView } from "../../utils/api/API";

require("moment/locale/fr.js");

const LastUpdateContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 4px;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const RightSideContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  margin-bottom: 50px;
  max-width: 660px;
  @media screen and (max-width: 1024px) {
    width: 90%;
    margin: 0 auto;
  }
`;
const HeaderRightSideTopContainer = styled.header`
  min-height: 378px;
  padding: ${(props) => (props.isMobile ? "20px 0px" : "63px 0px 30px")};
  @media screen and (max-width: 1024px) {
    min-height: auto;
  }
`;

const Comment = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #8a92a6;
  align-items: center;
  font-weight: 400;
  margin-right: 20px;
`;
const HeaderRightSideBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  @media screen and (max-width: 1024px) {
    padding: 0px;
  }
`;
const CategoryContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 14px;
  letter-spacing: 0.05rem;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
    font-size: 1.2rem;
  }
`;
const Category = styled.div`
  color: ${colors.rouge};
  margin-right: 3px;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;
const Domaine = styled.div`
  margin-left: 2px;
  color: ${colors.marine};
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const TitleContainer = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 58px;
  text-transform: uppercase;
  color: ${colors.marine};
  margin: 0;
  letter-spacing: 0.05rem;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
    line-height: 1.4;
    margin-bottom: 22px;
  }
`;
const TagContainer = styled.div`
  font-size: 1.4rem;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  color: ${colors.marine};
  cursor: pointer;
  margin-top: 20px;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.99);
  }
  @media screen and (max-width: 1024px) {
    min-height: 1.2rem;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  padding: ${(props) => (props.isMobile ? "15px 20px" : "15px 0")};
  border-bottom: 0.5px solid #dce2ef;
  width: fit-content;
`;

const UpdateContainer = styled.time`
  padding: ${(props) => (props.isMobile ? "10px px" : "14px 0px 0 0")};
`;

const BodyContainer = styled.section`
  margin-top: 33px;
  @media screen and (max-width: 1024px) {
    padding: 0px;
  }
`;

const LeftSideBodyComponent = styled.section``;
const ContentContainer = styled.div`
  line-height: 1.9;
  & > *:first-child {
    margin-top: 0;
  }
  h2 {
    font-size: 3.5rem;
    line-height: 45px;
    color: #003956;
    text-transform: uppercase;
    margin: 20px 0 12px;
  }
  h3 {
    text-transform: uppercase;
    font-size: 1.8rem;
    margin: 20px 0 12px;
  }
  ul {
    padding-left: 13px;
    li {
      margin: 17px 0;
      &::marker {
        color: ${colors.rouge};
      }
    }
  }
  a {
    color: ${colors.rouge};
    font-weight: bold;
  }
  p {
    margin: 12px 0;
  }
  @media screen and (max-width: 1024px) {
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.7rem;
    }
  }
`;

const UploadButton = styled.div`
  display: flex;
  margin: auto;
  text-transform: uppercase;
  font-size: 1.4rem;
  background-color: ${colors.rouge};
  color: white;
  font-weight: 700;
  padding: 17px 40px;
  margin-top: 50px;
  cursor: pointer;
  max-width: max-content;
  transition: all 0.3s;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.99);
  }
  @media screen and (max-width: 1024px) {
    padding: 17px 14px;
    svg {
      min-width: 25px;
    }
  }
`;

const AddLikeContainer = styled.div`
  display: flex;
  font-weight: 700;
  margin: 83px auto 52px;
  padding: 27px;
  justify-content: center;
  align-items: center;
  border-top: 0.5px solid #e6e6e6;
  border-bottom: 0.5px solid #e6e6e6;
  @media screen and (max-width: 1024px) {
    margin: 40px auto 52px;
    padding: 27px 0;
  }
`;

const ArianeContainer = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #99a0b1;
  padding-bottom: 45px;
  a,
  div {
    color: #99a0b1;
    margin: 0 5px;
  }
  div:not(:last-of-type) {
    cursor: pointer;
  }
  a {
    margin-left: 0;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const TitleBodyContainer = styled.h3`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 130%;
  text-transform: uppercase;
  margin: 20px 0 12px;
`;

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

const Indicateur = (props) => {
  const [indicateur, setIndicateur] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const [notFound, setNotFound] = useState(false);
  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  useEffect(() => {
    props.resetAllFilter();
    if (slug) {
      getRessourceBySlug(slug, props.type)
        .then((res) => {
          if (res.length) {
            setIndicateur(res[0]);
          } else if (props.slug) {
            setNotFound(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getRessourceById(indicateurId, props.type)
        .then((res) => setIndicateur(res))
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (indicateur) {
      addLikeView(
        indicateur.type,
        indicateur.id,
        indicateur.acf.datas.likes,
        indicateur.acf.datas.vues,
        props.user.token
      );
    }
  }, [indicateur]);

  const indicateurId = indicateur && indicateur.id;
  const slug = props.slug;

  const domaineActionId =
    indicateur &&
    indicateur.acf &&
    indicateur.acf.domaine_daction_principal.term_id;

  const domaineAction =
    props.taxonomie &&
    props.taxonomie.domainesActions.filter(
      (item) => item.id === domaineActionId
    )[0];

  const domaineImpactId =
    indicateur &&
    indicateur.acf &&
    indicateur.acf.domaine_dimpact_principal.term_id;

  const domaineImpact =
    props.taxonomie &&
    props.taxonomie.domainesImpacts.filter(
      (item) => item.id === domaineImpactId
    )[0];

  const listIndicateurTemplate = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "liste-des-indicateurs"
      )[0]
    : null;

  let tags = indicateur && indicateur.post_tag;

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
  const addOneLike = () => {
    if (indicateur && props.user) {
      addLikeView(
        indicateur.type,
        indicateur.id,
        parseInt(indicateur.acf.datas.likes) + 1,
        indicateur.acf.datas.vues,
        props.user.token
      ).then(() => setIsLiked(true));
    }
  };
  return (
    <RightSideContainer>
      {notFound && <Redirect to="/404Error" />}
      <HeaderRightSideTopContainer isMobile={isMobile}>
        <ArianeContainer>
          <Link className="cliquable_link" to={"/liste-des-indicateurs"}>
            {listIndicateurTemplate &&
              listIndicateurTemplate.title &&
              listIndicateurTemplate.title.rendered}{" "}
          </Link>
          {" > "}
          <div
            className="cliquable_link"
            onClick={() => {
              history.push({
                pathname: "/domaine-impact/" + domaineImpact.slug,
                state: { id: domaineImpact.term_id },
              });
            }}
          >
            {domaineImpact && domaineImpact.name}
          </div>

          {" > "}
          <div>
            {indicateur && indicateur.title && indicateur.title.rendered}
          </div>
        </ArianeContainer>

        {(domaineAction || domaineImpact) && (
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
        {indicateur !== null && indicateur.title && (
          <TitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(indicateur.title.rendered),
            }}
          />
        )}
        {tags && tags.length > 0 && (
          <TagContainer>
            <BsTags style={{ marginRight: "8px" }} />
            {tags.map((item, index) => {
              let comma = index < tags.length - 1 ? ", " : "";
              return (
                <div style={{ display: "flex" }} key={index}>
                  {" "}
                  <div
                    style={{ textDecoration: "underline" }}
                    onClick={() => handleClickTag(item.name)}
                  >
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
              {isLiked
                ? parseInt(indicateur.acf.datas.likes) + 1
                : indicateur.acf.datas.likes}
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
            publié le{" "}
            {indicateur && moment(indicateur.date).format("DD MMMM YYYY")}
          </LastUpdateContainer>
          <LastUpdateContainer>
            mis à jour le{" "}
            {indicateur && moment(indicateur.modified).format("DD MMMM YYYY")}
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
            indicateur.acf.fiche_indicateur.filename && (
              <UploadButton
                id="download-indicateur"
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
            <div
              ref={hoverRef}
              style={{
                backgroundColor: isLiked ? "#fdd2d2" : "",
                padding: "10px 5px",
                borderRadius: "50%",
                marginLeft: "5px",
              }}
            >
              <AiOutlineLike
                onClick={addOneLike}
                id="like"
                size={18}
                color={isHovered || isLiked ? colors.rouge : colors.gris}
                style={{ marginRight: "7px", marginLeft: "7px" }}
                cursor={"pointer"}
                data-name={indicateur.title.rendered}
              />
            </div>
          </AddLikeContainer>
          <div id="comments"></div>
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
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicateur);
