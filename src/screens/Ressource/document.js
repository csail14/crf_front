import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import imageExemple from "../../assets/exemple-image.png";
import { BsDot, BsDownload } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import {
  getDocumentById,
  getRessourceBySlug,
} from "../../utils/api/RessourcesApi";
import { getMediaById } from "../../utils/api/API";
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
  padding: ${(props) => (props.isMobile ? "10px 20px" : "100px 280px")};
`;

const LeftSideBodyComponent = styled.div`
  margin: auto;
`;

const ContentContainer = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 31px;
  color: ${colors.text};
  text-align: left;
`;

const BottomContainer = styled.section`
  background-color: ${colors.grisBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const BottomTitleContainer = styled.div`
  margin: 50px 5% 30px;
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.gris};
  font-weight: 600;
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

const VideoContainer = styled.div`
  margin-top: 20px;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 5%;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 0 auto;
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
const Document = (props) => {
  const [document, setDocument] = useState(null);
  const [media, setMedia] = useState(null);
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
  }, [document, domaineAction, props.options]);

  const documentId =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.id;

  const slug = props.match && props.match.params && props.match.params.id;

  let tags = document && document.tags;

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
                  {document.acf.datas.likes}
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
              <a
                style={{ color: "inherit", textDecoration: "none" }}
                id="download-document"
                href={document.acf.document.lien.url}
                target={document.acf.document.lien.target}
              >
                <UploadButton>{document.acf.document.lien.title}</UploadButton>
              </a>
            ) : document.acf.document.fichier_joint ? (
              <a
                style={{ color: "inherit", textDecoration: "none" }}
                id="download-document"
                href={document.acf.document.fichier_joint.url}
                target={document.acf.document.fichier_joint.target}
              >
                <UploadButton>
                  <BsDownload style={{ marginRight: "8px" }} />
                  Télécharger le document
                </UploadButton>
              </a>
            ) : null)}

          <AddLikeContainer>
            Cette ressource vous a inspiré ?{" "}
            <AiOutlineLike
              id="like"
              size={18}
              color={colors.gris}
              style={{ marginRight: "7px", marginLeft: "7px" }}
              cursor={"pointer"}
            />
          </AddLikeContainer>
          <Comments postID={documentId} showCommment={showCommment} />
        </LeftSideBodyComponent>
      </BodyContainer>
      {document &&
        document.acf &&
        document.acf.ressources_complementaires.length > 0 && (
          <BottomContainer>
            <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>

            <AvailableRessourceContainer isMobile={isMobile}>
              {document.acf.ressources_complementaires.map((item, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Document);
