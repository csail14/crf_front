import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import { getMediaById, addLikeView } from "../../utils/api/API";
import {
  getArticleById,
  getRessourceBySlug,
} from "../../utils/api/RessourcesApi";
import Comments from "../../components/Ressource/Comments";
import moment from "moment";
import DOMPurify from "dompurify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

require("moment/locale/fr.js");

const MainContainer = styled.div``;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  figure {
    margin: 0;
    flex-basis: 42%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const LastUpdateContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  margin-top: 4px;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const RightSideContainer = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  flex-basis: 58%;
`;
const HeaderRightSideTopContainer = styled.div`
  width: -webkit-fill-available;
  min-height: 378px;
  padding: ${(props) => (props.isMobile ? "20px 5%" : "103px 9% 63px 6.3%")};
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    radial-gradient(
      68.37% 320.65% at -18.36% 111.75%,
      rgba(0, 57, 86, 0.5) 0%,
      rgba(0, 57, 86, 0.19) 44.84%,
      rgba(255, 255, 255, 0.09) 100%
    ),
    radial-gradient(
      132.83% 171.01% at 94.89% 166.27%,
      rgba(227, 6, 19, 0.33) 0%,
      rgba(227, 6, 19, 0.219) 46.47%,
      rgba(255, 255, 255, 0.108) 100%
    );
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
`;
const BottomContainer = styled.div`
  background-color: ${colors.grisBackground};
  padding: 89px 4% 50px;
  @media screen and (max-width: 1024px) {
    padding: 30px 5%;
  }
`;
const BottomTitleContainer = styled.h4`
  padding: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${colors.gris};
  font-weight: 600;
  margin: 0;
  text-align: center;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 47px auto 0;
  @media screen and (max-width: 1024px) {
    margin: 30px 0 0;
  }
`;
const CategoryContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 32px;
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
  padding: ${(props) => (props.isMobile ? "15px 5%" : "15px 0 15px 6.5%")};
  border-bottom: 0.5px solid #dce2ef;
  width: fit-content;
`;

const UpdateContainer = styled.time`
  padding: ${(props) => (props.isMobile ? "10px 5% 0" : "14px 0px 0 6.3%")};
`;

const BodyContainer = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  padding: ${(props) => (props.isMobile ? "30px 0px" : "100px 0px")};
  width: 90%;
  margin: auto;
  max-width: 1350px;
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
`;

const LeftSideBodyComponent = styled.section`
  flex-basis: 52%;
  max-width: 660px;
  &:only-child {
    margin: 0 auto;
  }
  @media screen and (max-width: 1024px) {
    margin: 0 auto;
    width: 90%;
  }
`;
const RightSideBodyContainer = styled.aside`
  display: ${(props) => (props.isMobile ? "flex" : "")};
  flex-direction: ${(props) => (props.isMobile ? "column" : "")};
  align-items: ${(props) => (props.isMobile ? "center" : "")};
  flex-basis: 35%;
  max-width: 363px;
  @media screen and (max-width: 1280px) {
    margin-top: 30px;
    max-width: none;
    flex-wrap: wrap;
    display: flex;
  }
`;

const ContentContainer = styled.div`
  line-height: 1.9;
  & > *:first-child {
    margin-top: 0;
  }
  h2 {
    font-size: 3rem;
    line-height: 45px;
    color: #003956;
    margin: 20px 0 12px;
  }
  h3 {
    color: #003956;
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

const TitleRessourceContainer = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  margin-bottom: 20px;
  text-transform: uppercase;
  flex-basis: 100%;
  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [media, setMedia] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hoverRef, isHovered] = useHover();
  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    props.resetAllFilter();
    if (slug) {
      getRessourceBySlug(slug, "articles")
        .then((res) => {
          if (res.length) {
            setArticle(res[0]);
          } else if (slug) {
            setNotFound(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getArticleById(articleId)
        .then((res) => setArticle(res))
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (article) {
      addLikeView(
        "articles",
        article.id,
        article.acf.datas.likes,
        article.acf.datas.vues,
        props.user.token
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const domaineActionId =
    article && article.acf && article.acf.domaine_daction_principal.term_id;

  const domaineImpactId =
    article && article.acf && article.acf.domaine_dimpact_principal.term_id;

  const domaineAction =
    props.taxonomie &&
    props.taxonomie.domainesActions.filter(
      (item) => item.id === domaineActionId
    )[0];

  const domaineImpact =
    props.taxonomie &&
    props.taxonomie.domainesImpacts.filter(
      (item) => item.id === domaineImpactId
    )[0];

  useEffect(() => {
    if (article) {
      if (article && article.featured_media) {
        getMediaById(article.featured_media)
          .then((res) => {
            if (
              res.media_details &&
              res.media_details.sizes &&
              res.media_details.sizes.article
            ) {
              setMedia(res.media_details.sizes.article.source_url);
            } else {
              setMedia(res.media_details.sizes.full.source_url);
            }
          })
          .catch((error) => console.log("error", error));
      } else if (
        domaineAction &&
        domaineAction.acf &&
        domaineAction.acf.image_par_defaut
      ) {
        if (domaineAction.acf.image_par_defaut.sizes.article) {
          setMedia(domaineAction.acf.image_par_defaut.sizes.article);
        } else {
          setMedia(domaineAction.acf.image_par_defaut.sizes.full);
        }
      } else if (
        props.options &&
        props.options.options &&
        props.options.options.image_par_defaut_ressources
      ) {
        setMedia(props.options.options.image_par_defaut_ressources.url);
      }
    }
  }, [article, domaineAction, props.options]);
  const slug = props.match && props.match.params && props.match.params.id;
  const articleId = article && article.id;

  let tags = article && article.post_tag;
  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }
  const showCommment =
    article && article.comment_status === "open" ? true : false;

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
    if (article && props.user) {
      addLikeView(
        article.type,
        article.id,
        parseInt(article.acf.datas.likes) + 1,
        article.acf.datas.vues,
        props.user.token
      ).then(() => setIsLiked(true));
    }
  };

  const ressources_secondaires =
    article &&
    article.acf &&
    article.acf.ressources_secondaires.filter(
      (item) => item.status === "publish"
    );

  const ressources_principales =
    article &&
    article.acf &&
    article.acf.ressources_principales.filter(
      (item) => item.status === "publish"
    );

  return (
    <MainContainer>
      {notFound && <Redirect to="/404Error" />}

      <HeaderContainer isMobile={isMobile}>
        {media && (
          <figure>
            <img
              src={media}
              alt={media && media.alt_text ? media.alt_text : "A la une"}
            />
          </figure>
        )}
        <RightSideContainer>
          <HeaderRightSideTopContainer isMobile={isMobile}>
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
            {article !== null && article.title && (
              <TitleContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.title.rendered),
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

          <HeaderRightSideBottomContainer>
            {article && article.acf && article.acf.datas && (
              <LikeContainer isMobile={isMobile}>
                <Comment>
                  <AiOutlineLike
                    size={18}
                    style={{
                      color: "#8A92A6",
                      verticalAlign: "middle",
                      marginRight: "7px",
                    }}
                  />
                  {isLiked
                    ? parseInt(article.acf.datas.likes) + 1
                    : article.acf.datas.likes}
                </Comment>
                <Comment>
                  <AiOutlineEye
                    size={18}
                    style={{
                      color: "#8A92A6",
                      verticalAlign: "middle",
                      marginRight: "7px",
                      marginLeft: "10px",
                    }}
                  />
                  {article.acf.datas.vues}
                </Comment>
              </LikeContainer>
            )}
            <UpdateContainer isMobile={isMobile}>
              <LastUpdateContainer>
                publi?? le{" "}
                {article && moment(article.date).format("DD MMMM YYYY")}
              </LastUpdateContainer>
              <LastUpdateContainer>
                mis ?? jour le{" "}
                {article && moment(article.modified).format("DD MMMM YYYY")}
              </LastUpdateContainer>
            </UpdateContainer>
          </HeaderRightSideBottomContainer>
        </RightSideContainer>
      </HeaderContainer>
      <BodyContainer isMobile={isMobile}>
        <LeftSideBodyComponent isMobile={isMobile}>
          {article && article.content && article.content.rendered && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content.rendered),
              }}
            />
          )}
          {!isMobile && (
            <>
              <AddLikeContainer isMobile={isMobile}>
                Cette ressource vous a inspir?? ?{" "}
                <div
                  ref={hoverRef}
                  style={{
                    backgroundColor: isLiked ? "#fdd2d2" : "",
                    padding: "10px 5px",
                    borderRadius: "50%",
                    marginLeft: "5px",
                  }}
                >
                  {article !== null && article.title && (
                    <AiOutlineLike
                      onClick={addOneLike}
                      id="like"
                      size={18}
                      color={isHovered || isLiked ? colors.rouge : colors.gris}
                      style={{ marginRight: "7px", marginLeft: "7px" }}
                      cursor={"pointer"}
                      data-name={article.title.rendered}
                    />
                  )}
                </div>
              </AddLikeContainer>
              <Comments postID={articleId} showCommment={showCommment} />
              <div id="comments"></div>
            </>
          )}
        </LeftSideBodyComponent>
        {ressources_principales && ressources_principales.length > 0 && (
          <RightSideBodyContainer isMobile={isMobile}>
            <TitleRessourceContainer>
              Ressources principales
            </TitleRessourceContainer>
            {ressources_principales.map((item, index) => {
              if (isMobile) {
                return <ListResultComponent key={index} info={item} />;
              } else {
                return <GridResultComponent key={index} info={item} />;
              }
            })}
          </RightSideBodyContainer>
        )}
        {isMobile && (
          <>
            <AddLikeContainer isMobile={isMobile}>
              Cette ressource vous a inspir?? ?{" "}
              <div
                ref={hoverRef}
                style={{
                  backgroundColor: isLiked ? "#fdd2d2" : "",
                  padding: "10px 5px",
                  borderRadius: "50%",
                  marginLeft: "5px",
                }}
              >
                {article !== null && article.title && (
                  <AiOutlineLike
                    onClick={addOneLike}
                    id="like"
                    size={18}
                    color={isHovered || isLiked ? colors.rouge : colors.gris}
                    style={{ marginRight: "7px", marginLeft: "7px" }}
                    cursor={"pointer"}
                    data-name={article.title.rendered}
                  />
                )}
              </div>
            </AddLikeContainer>
            <Comments postID={articleId} showCommment={showCommment} />
            <div id="comments"></div>
          </>
        )}
      </BodyContainer>
      {ressources_secondaires && ressources_secondaires.length > 0 && (
        <BottomContainer>
          <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>
          <AvailableRessourceContainer isMobile={isMobile}>
            {ressources_secondaires.length > 0 &&
              ressources_secondaires.map((item, index) => {
                if (item.status === "publish")
                  if (isMobile) {
                    return <ListResultComponent key={index} info={item} />;
                  } else {
                    return <GridResultComponent key={index} info={item} />;
                  }
                return undefined;
              })}
          </AvailableRessourceContainer>
        </BottomContainer>
      )}
    </MainContainer>
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
    options: store.options,
    filters: store.filters,
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
