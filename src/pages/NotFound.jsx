import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

const NotFound = () => {
  const [t] = useTranslation("global");

  return (
    <StyledContainer>
      <h1>{t("notFound.title")}</h1>
      <Link to="/">{t("notFound.link")}</Link>
    </StyledContainer>
  );
};

export default NotFound;
