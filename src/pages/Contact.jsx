import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CommentSection from "../components/CommentSection";

const StyledList = styled.ul`
  list-style: none;

  & svg {
    font-size: 1.8rem;
  }

  & a {
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: fit-content;
  }

  & img {
    width: 150px;
  }
`;

const Contact = () => {
  const [t] = useTranslation("global");
  return (
    <div>
      <StyledList>
        <li>
          <a>
            <Icon icon="bi:facebook" />
            <p>{t("contact.messageUnavailable")}</p>
          </a>
        </li>
        <li>
          <a>
            <Icon icon="bi:telegram" />
            <p>{t("contact.messageUnavailable")}</p>
          </a>
        </li>

        <img
          src="https://archive.org/download/alarshif-high-resolution-logo/alarshif-high-resolution-logo.png"
          alt="logo"
        />
        <CommentSection postId="general" />
      </StyledList>
    </div>
  );
};

export default Contact;
