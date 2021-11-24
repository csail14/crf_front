import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import imageExemple from "../../assets/exemple-image.png";
import { BsDot } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import { getMediaById } from "../../utils/api/API";
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
`;

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
const HeaderRightSideTopContainer = styled.div`
  width: -webkit-fill-available;
  padding: ${(props) => (props.isMobile ? "20px" : "50px 50px")};
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
  padding: 0px;
`;
const BottomContainer = styled.section`
  background-color: ${colors.grisBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const BottomTitleContainer = styled.div`
  padding: 50px 5% 30px;
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.gris};
  font-weight: 600;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 0 auto;
  padding: 0 5%;
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
  align-items: center;
  text-align: left;
  color: ${colors.marine};
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;

const LikeContainer = styled.div`
  display: flex;
  padding: ${(props) => (props.isMobile ? "15px 20px" : "15px 50px")};
  border-bottom: 0.5px solid lightgrey;
  width: fit-content;
`;

const UpdateContainer = styled.time`
  padding: ${(props) =>
    props.isMobile ? "10px 20px 0 20px" : "10px 50px 0 50px"};
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  padding: ${(props) => (props.isMobile ? "30px 20px" : "100px 80px")};
`;

const LeftSideBodyComponent = styled.div`
  margin-right: ${(props) => (props.isMobile ? "" : "100px")};
`;
const RightSideBodyContainer = styled.aside`
  display: ${(props) => (props.isMobile ? "flex" : "")};
  flex-direction: ${(props) => (props.isMobile ? "column" : "")};
  align-items: ${(props) => (props.isMobile ? "center" : "")};
  min-width: ${(props) => (props.isMobile ? "" : "350px")};
`;

const ContentContainer = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 31px;
  color: ${colors.text};
  text-align: left;
`;

const TitleRessourceContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const AddLikeContainer = styled.div`
  display: flex;
  font-weight: 700;
  margin: 50px auto;
  padding: 27px;
  justify-content: center;
  align-items: center;
  border-top: 0.5px solid lightGrey;
  border-bottom: 0.5px solid lightGrey;
`;

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [media, setMedia] = useState(null);
  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  useEffect(() => {
    props.resetAllFilter();
    if (slug) {
      getRessourceBySlug(slug, "posts")
        .then((res) => {
          if (res.length) {
            setArticle(res[0]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getArticleById(articleId)
        .then((res) => setArticle(res))
        .catch((error) => console.log(error));
    }
  }, []);

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
          .then((res) => setMedia(res.media_details.sizes.article.source_url))
          .catch((error) => console.log("error", error));
      } else if (
        domaineAction &&
        domaineAction.acf &&
        domaineAction.acf.image_par_defaut
      ) {
        setMedia(domaineAction.acf.image_par_defaut.sizes.article);
      } else if (
        props.options &&
        props.options.options &&
        props.options.options.acf &&
        props.options.options.acf.image_par_defaut_ressources
      ) {
        setMedia(
          props.options.options.acf.image_par_defaut_ressources.sizes.article
        );
      }
    }
  }, [article, domaineAction, props.options]);
  const slug = props.match && props.match.params && props.match.params.id;
  const articleId =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.id;

  let tags = article && article.tags;

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
  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        {media && (
          <img
            style={isMobile ? {} : { maxWidth: "45%", height: "auto" }}
            src={media}
            alt={media && media.alt_text ? media.alt_text : "A la une"}
          />
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
                    style={{ color: colors.gris, marginRight: "7px" }}
                  />
                  {article.acf.datas.likes}
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
                  {article.acf.datas.vues}
                </Comment>
              </LikeContainer>
            )}
            <UpdateContainer isMobile={isMobile}>
              <LastUpdateContainer>
                publié le{" "}
                {article && moment(article.date).format("DD MMMM YYYY")}
              </LastUpdateContainer>
              <LastUpdateContainer>
                mis à jour le{" "}
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

          <AddLikeContainer isMobile={isMobile}>
            Cette ressource vous a inspiré ?{" "}
            <AiOutlineLike
              id="like"
              size={18}
              color={colors.gris}
              style={{ marginRight: "7px", marginLeft: "7px" }}
              cursor={"pointer"}
            />
          </AddLikeContainer>
          <Comments postID={articleId} showCommment={showCommment} />
          <div id="comments"></div>
        </LeftSideBodyComponent>
        {article &&
          article.acf &&
          article.acf.ressources_principales &&
          article.acf.ressources_principales.length > 0 && (
            <RightSideBodyContainer isMobile={isMobile}>
              <TitleRessourceContainer>
                Ressources principales
              </TitleRessourceContainer>
              {article.acf.ressources_principales.map((item, index) => {
                if (isMobile) {
                  return <ListResultComponent key={index} info={item} />;
                } else {
                  return <GridResultComponent key={index} info={item} />;
                }
              })}
            </RightSideBodyContainer>
          )}
      </BodyContainer>
      {article &&
        article.acf &&
        article.acf.ressources_secondaires &&
        article.acf.ressources_secondaires.length > 0 && (
          <BottomContainer>
            <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>
            <AvailableRessourceContainer isMobile={isMobile}>
              {article &&
                article.acf &&
                article.acf.ressources_secondaires.length > 0 &&
                article.acf.ressources_secondaires.map((item, index) => {
                  if (item.post_status === "publish")
                    if (isMobile) {
                      return <ListResultComponent key={index} info={item} />;
                    } else {
                      return <GridResultComponent key={index} info={item} />;
                    }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
