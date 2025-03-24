import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 1rem;
  line-height: 1.7;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    padding: 0 10%;
    max-width: 60rem;
  }

  & br {
    display: block;
    content: "";
    margin: 0.5rem 0;
  }
`;

const Home = () => {
  const [t] = useTranslation("global");

  return (
    <StyledContainer>
      <p>{t("home.head")}</p>
      <h3>{t("home.title")}</h3>
      <p>{t("home.body")}</p>
    </StyledContainer>
  );
};

export default Home;
