import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import {
  getDocumentById,
  getRessourceBySlug,
} from "../../utils/api/RessourcesApi";
import { getMediaById, addLikeView } from "../../utils/api/API";
import moment from "moment";
import { config } from "../../config";
import DOMPurify from "dompurify";
import Comments from "../../components/Ressource/Comments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
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
  @media screen and (max-width:900px){
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
  padding: ${(props) => (props.isMobile ? "20px" : "103px 9% 63px 6.3%")};
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
    @media screen and (max-width:900px){
      min-height:auto;
  
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
const CategoryContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 32px;
  letter-spacing: 0.05rem;
  @media screen and (max-width:900px){
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
  @media screen and (max-width:900px){
    font-size:1.2rem;
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
  @media screen and (max-width:900px){
    font-size:1.2rem;
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
  @media screen and (max-width:900px){
    font-size: 2.4rem;
    line-height:1.4;
  }
  @media screen and (max-width:900px){
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
  @media screen and (max-width:900px){
    min-height:1.2rem;

  }
`;

const LikeContainer = styled.div`
  display: flex;
  padding: ${(props) => (props.isMobile ? "15px 20px" : "15px 6.3%")};
  border-bottom: 0.5px solid #dce2ef;
  width: fit-content;
`;

const UpdateContainer = styled.time`
  padding: ${(props) =>
    props.isMobile ? "10px 20px 0 20px" : "14px 0px 0 6.3%"};
`;

const BodyContainer = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  padding: ${(props) => (props.isMobile ? "30px 0px" : "100px 0px")};
  width: 90%;
  margin: auto;
  max-width: 1350px;
`;

const LeftSideBodyComponent = styled.section`
  max-width: 660px;
  margin: auto;
`;

const ContentContainer = styled.div`
  line-height: 1.9;
  margin-bottom: 54px;
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
  @media screen and (max-width:900px){
    margin-bottom:20px;
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.7rem;
    }
  }
`;

const BottomContainer = styled.div`
  background-color: ${colors.grisBackground};
  padding: 89px 4% 50px;
`;
const BottomTitleContainer = styled.h4`
  padding: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${colors.gris};
  font-weight: 600;
  margin: 0;
  text-align: center;
  @media screen and (max-width:900px){
    font-size: 1.2rem;
  }
`;

const UploadButton = styled.a`
  display: flex;
  margin: auto;
  text-transform: uppercase;
  font-size: 1.4rem;
  background-color: ${colors.rouge};
  color: white;
  font-weight: 700;
  padding: 17px 40px;
  cursor: pointer;
  max-width: max-content;
  transition: all 0.3s;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.99);
  }
  @media screen and (max-width:900px){
    font-size:1.2rem;
    padding: 17px 16px;
  }
`;

const VideoContainer = styled.div`
  margin-top: 20px;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 47px auto 0;
  @media screen and (max-width:900px){
    margin: 30px 0 0;
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
  @media screen and (max-width:900px){
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
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

const Document = (props) => {
  const [document, setDocument] = useState(null);
  const [media, setMedia] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hoverRef, isHovered] = useHover();
  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  useEffect(() => {
    props.resetAllFilter();
    if (slug) {
      getRessourceBySlug(slug, "documents")
        .then((res) => {
          if (res.length) {
            setDocument(res[0]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getDocumentById(documentId)
        .then((res) => setDocument(res))
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (document) {
      addLikeView(
        document.type,
        document.id,
        document.acf.datas.likes,
        document.acf.datas.vues,
        props.user.token
      );
    }
  }, [document]);

  const domaineActionId =
    document && document.acf && document.acf.domaine_daction_principal.term_id;

  const domaineImpactId =
    document && document.acf && document.acf.domaine_dimpact_principal.term_id;

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
    if (document) {
      if (document && document.featured_media) {
        getMediaById(document.featured_media)
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
  }, [document, domaineAction, props.options]);

  const documentId = document && document.id;

  const slug = props.match && props.match.params && props.match.params.id;

  let tags = document && document.post_tag;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }

  const showCommment =
    document && document.comment_status === "open" ? true : false;

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
    if (document && props.user) {
      addLikeView(
        document.type,
        document.id,
        parseInt(document.acf.datas.likes) + 1,
        document.acf.datas.vues,
        props.user.token
      ).then(() => setIsLiked(true));
    }
  };

  const ressources_complementaires =
    document &&
    document.acf &&
    document.acf.ressources_complementaires.filter(
      (item) => item.status === "publish"
    );

  return (
    <MainContainer>
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

            {document !== null && document.title && (
              <TitleContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(document.title.rendered),
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
            {document && document.acf && document.acf.datas && (
              <LikeContainer isMobile={isMobile}>
                <Comment>
                  <AiOutlineLike
                    size={18}
                    style={{ color: colors.gris, marginRight: "7px" }}
                  />
                  {isLiked
                    ? parseInt(document.acf.datas.likes) + 1
                    : document.acf.datas.likes}
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
                  {document.acf.datas.vues}
                </Comment>
              </LikeContainer>
            )}
            <UpdateContainer isMobile={isMobile}>
              <LastUpdateContainer>
                publié le{" "}
                {document && moment(document.date).format("DD MMMM YYYY")}
              </LastUpdateContainer>
              <LastUpdateContainer>
                mis à jour le{" "}
                {document && moment(document.modified).format("DD MMMM YYYY")}
              </LastUpdateContainer>
            </UpdateContainer>
          </HeaderRightSideBottomContainer>
        </RightSideContainer>
      </HeaderContainer>
      <BodyContainer isMobile={isMobile}>
        <LeftSideBodyComponent>
          {document && document.content && document.content.rendered && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(document.content.rendered),
              }}
            />
          )}
          {document &&
            document.acf &&
            document.acf.document &&
            (document.acf.document.video &&
            document.acf.document.format === "Vidéo" ? (
              <>
                <VideoContainer
                  dangerouslySetInnerHTML={{
                    __html: document.acf.document.video,
                  }}
                />
              </>
            ) : document.acf.document.format === "Image" &&
              document.acf.document.image.sizes &&
              document.acf.document.image.sizes.article ? (
              <img
                style={isMobile ? {} : { maxWidth: "100%", height: "auto" }}
                src={document.acf.document.image.sizes.article}
                alt={media && media.alt_text ? media.alt_text : "A la une"}
              />
            ) : document.acf.document.format === "Web" ? (
              <VideoContainer
                dangerouslySetInnerHTML={{
                  __html: document.acf.document.iframe,
                }}
              />
            ) : document.acf.document.format === "Lien" &&
              document.acf.document.lien ? (
                <UploadButton
                id="download-document"
                href={document.acf.document.lien.url}
                target={document.acf.document.lien.target}
                >
                  {document.acf.document.lien.title}
                </UploadButton>
            ) : document.acf.document.fichier_joint &&
              document.acf.document.fichier_joint.url ? (

                <UploadButton
                  id="download-document"
                  href={document.acf.document.fichier_joint.url}
                  target={document.acf.document.fichier_joint.target}>
                  <BsDownload
                    style={{ marginRight: "14px", fontSize: "1.6rem" }}
                  />
                  Télécharger le document{" "}
                  {document.acf.document.fichier_joint.filesize && (
                    <span style={{ marginLeft: "5px" }}>
                      {"(" +
                        (
                          document.acf.document.fichier_joint.filesize / 10000
                        ).toFixed(1)}{" "}
                      Mo)
                    </span>
                  )}
                </UploadButton>
            ) : document.acf.document.fichier_joint ? (
                <UploadButton
                id="download-document"
                href={document.acf.document.fichier_joint}
                target={document.acf.document.fichier_joint.target}>
                  <BsDownload style={{ marginRight: "8px" }} />
                  Télécharger le document
                </UploadButton>
            ) : null)}

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
              />
            </div>
          </AddLikeContainer>
          <Comments postID={documentId} showCommment={showCommment} />
        </LeftSideBodyComponent>
      </BodyContainer>
      {ressources_complementaires && ressources_complementaires.length > 0 && (
        <BottomContainer>
          <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>

          <AvailableRessourceContainer isMobile={isMobile}>
            {ressources_complementaires.map((item, index) => {
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
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Document);
