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
import { getMediaById } from "../../utils/api/API";
import { getArticleById } from "../../utils/api/RessourcesApi";
import Comments from "../../components/Ressource/Comments";
import moment from "moment";
import DOMPurify from "dompurify";
require("moment/locale/fr.js");

const MainContainer = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
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
  padding: 50px 50px;
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
const BottomContainer = styled.div`
  background-color: ${colors.grisBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const BottomTitleContainer = styled.div`
  margin: 50px;
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.gris};
  font-weight: 600;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin: 0 auto;
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
  font-size: 35px;
  font-weight: 700;
  line-height: 58px;
  text-align: left;
  color: ${colors.marine};
`;
const TagContainer = styled.div`
  font-size: 14px;
  display: flex;
  font-weight: 400;
  line-height: 16px;
  align-items: center;
  text-align: left;
  color: ${colors.marine};
  margin-top: 20px;
  text-decoration: underline;
`;

const LikeContainer = styled.div`
  display: flex;
  padding: 15px 50px;
  border-bottom: 0.5px solid lightgrey;
  width: fit-content;
`;

const UpdateContainer = styled.div`
  padding: 10px 50px 0 50px;
`;

const BodyContainer = styled.div`
  display: flex;
  padding: 100px 80px;
`;

const LeftSideBodyComponent = styled.div`
  margin-right: 100px;
`;
const RightSideBodyContainer = styled.div``;

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

  useEffect(() => {
    getArticleById(articleId)
      .then((res) => setArticle(res))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (article) {
      getMediaById(article.featured_media)
        .then((res) => setMedia(res))
        .catch((error) => console.log("res", error));
    }
  }, [article]);

  const articleId = props.match.params.id;

  const domaineAction =
    article && article.acf && article.acf.domaine_daction_principal
      ? props.taxonomie.domainesActions.filter(
          (item) => item.id === article.acf.domaine_daction_principal
        )[0]
      : null;

  const domaineImpact =
    article && article.acf && article.acf.domaine_dimpact_principal
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === article.acf.domaine_dimpact_principal
          )[0]
        : null
      : null;

  let tags = article && article.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <img
          style={{ maxWidth: "45%", height: "auto" }}
          src={
            media && media.media_details
              ? media.media_details.sizes.full.source_url
              : imageExemple
          }
          alt={media && media.alt_text ? media.alt_text : "A la une"}
        />
        <RightSideContainer>
          <HeaderRightSideTopContainer>
            <CategoryContainer>
              {domaineAction && <Category>{domaineAction.name}</Category>}
              <BsDot />
              {domaineImpact && <Domaine>{domaineImpact.name}</Domaine>}
            </CategoryContainer>
            <TitleContainer>
              {article !== null && article.title.rendered}
            </TitleContainer>
            {tags && (
              <TagContainer>
                <BsTags style={{ marginRight: "8px" }} />
                {tags.map((item) => {
                  return item.name + ", ";
                })}
              </TagContainer>
            )}
          </HeaderRightSideTopContainer>

          <HeaderRightSideBottomContainer>
            <LikeContainer>
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
            </LikeContainer>
            <UpdateContainer>
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
      <BodyContainer>
        <LeftSideBodyComponent>
          {article && article.content && article.content.rendered && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content.rendered),
              }}
            />
          )}
          {/* <TitleBodyContainer>Titre H2</TitleBodyContainer>
          <ContentContainer>
            Le développement de la mesure d'impact à une échelle macro, s'il
            représente un grand défi pour notre association, est aussi une
            formidable opportunité pour la Croix-Rouge française de se
            positionner comme un partenaire incontournable des pouvoirs publics
            en attestant de la valeur sociale générée par ses actions. Plus
            globalement, cet outil nous permettra de renforcer notre visibilité
            et notre légitimité vis-à-vis de l'ensemble de nos partenaires –
            pouvoirs publics, bailleurs, partenaires financiers – en rendant
            compte de nos actions.
          </ContentContainer>
          <TitleBodyContainer>Titre H2</TitleBodyContainer>
          <ContentContainer>
            Le développement de la mesure d'impact à une échelle macro, s'il
            représente un grand défi pour notre association, est aussi une
            formidable opportunité pour la Croix-Rouge française de se
            positionner comme un partenaire incontournable des pouvoirs publics
            en attestant de la valeur sociale générée par ses actions. Plus
            globalement, cet outil nous permettra de renforcer notre visibilité
            et notre légitimité vis-à-vis de l'ensemble de nos partenaires –
            pouvoirs publics, bailleurs, partenaires financiers – en rendant
            compte de nos actions.
          </ContentContainer> */}

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
          <Comments />
        </LeftSideBodyComponent>
        <RightSideBodyContainer>
          <TitleRessourceContainer>
            Ressources principales
          </TitleRessourceContainer>
          {article &&
            article.acf &&
            article.acf.ressources_principales.map((item) => {
              return <GridResultComponent info={item} />;
            })}
        </RightSideBodyContainer>
      </BodyContainer>
      <BottomContainer>
        <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>
        <AvailableRessourceContainer>
          {article &&
            article.acf &&
            article.acf.ressources_secondaires.length &&
            article.acf.ressources_secondaires.map((item) => {
              return <GridResultComponent info={item} />;
            })}
        </AvailableRessourceContainer>
      </BottomContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
