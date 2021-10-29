import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsDot, BsDownload } from "react-icons/bs";
import { colors } from "../../colors";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import moment from "moment";
import DOMPurify from "dompurify";
import Comments from "../../components/Ressource/Comments";
import { Link } from "react-router-dom";
import DomaineListDeroulante from "../../components/Ressource/DomainesListDeroulante";
require("moment/locale/fr.js");

const MainContainer = styled.div`
  display: flex;
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

  background-size: 100% 250px;
  background-repeat: no-repeat;
  padding-right: 100px;
`;

const LeftSideComponent = styled.div`
  display: flex;
  padding: 100px 85px;
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
  padding: 50px 0px;
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
  padding: 15px 0px;
  border-bottom: 0.5px solid lightgrey;
  width: fit-content;
`;

const UpdateContainer = styled.div`
  padding: 10px 0px 0 0px;
`;

const BodyContainer = styled.div`
  display: flex;
  padding: 50px 0px;
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
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
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

  useEffect(() => {
    getRessourceById(indicateurId, "indicateurs")
      .then((res) => setIndicateur(res))
      .catch((error) => console.log(error));
  }, []);

  const indicateurId = props.match.params.id;

  const domaineAction =
    indicateur && indicateur.acf && indicateur.acf.domaine_daction_principal
      ? props.taxonomie.domainesActions.filter(
          (item) => item.id === indicateur.acf.domaine_daction_principal
        )[0]
      : null;

  const domaineImpact =
    indicateur && indicateur.acf && indicateur.acf.domaine_dimpact_principal
      ? props.taxonomie
        ? props.taxonomie.domainesImpacts.filter(
            (item) => item.id === indicateur.acf.domaine_dimpact_principal
          )[0]
        : null
      : null;

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
  return (
    <>
      <MainContainer>
        <LeftSideComponent>
          <DomaineListDeroulante indicateurId={indicateurId} />
        </LeftSideComponent>
        <RightSideContainer>
          <HeaderRightSideTopContainer>
            <ArianeContainer>
              <Link
                to={"/liste-des-indicateurs"}
                style={{
                  textDecoration: "none",
                  color: colors.gris,
                  margin: "0 5px",
                }}
              >
                {listIndicateurTemplate &&
                  listIndicateurTemplate.title.rendered}{" "}
              </Link>
              {" > "}

              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: colors.gris,
                  margin: "0 5px",
                }}
              >
                {domaineAction && domaineAction.name}
              </Link>

              {" > "}
              <Link
                to={"#"}
                style={{
                  textDecoration: "none",
                  color: colors.gris,
                  margin: "0 5px",
                }}
              >
                {indicateur && indicateur.title.rendered}
              </Link>
            </ArianeContainer>

            <CategoryContainer>
              {domaineAction && <Category>{domaineAction.name}</Category>}
              <BsDot />
              {domaineImpact && <Domaine>{domaineImpact.name}</Domaine>}
            </CategoryContainer>
            <TitleContainer>
              {indicateur && indicateur.title.rendered}
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
                {document && moment(document.date).format("DD MMMM YYYY")}
              </LastUpdateContainer>
              <LastUpdateContainer>
                mis à jour le{" "}
                {document && moment(document.modified).format("DD MMMM YYYY")}
              </LastUpdateContainer>
            </UpdateContainer>
          </HeaderRightSideBottomContainer>

          <BodyContainer>
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
              <Comments />
            </LeftSideBodyComponent>
          </BodyContainer>
        </RightSideContainer>
      </MainContainer>
      <BottomContainer>
        <BottomTitleContainer>Ressources secondaires</BottomTitleContainer>
        <AvailableRessourceContainer>
          {indicateur &&
            indicateur.acf &&
            indicateur.acf.ressources_liees &&
            indicateur.acf.ressources_liees.length &&
            indicateur.acf.ressources_liees.map((item, index) => {
              return <GridResultComponent info={item} key={index} />;
            })}
        </AvailableRessourceContainer>
      </BottomContainer>
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie, pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicateur);
