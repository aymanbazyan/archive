import { useState } from "react";
import { Button } from "antd";

import styled from "styled-components";
import Search from "antd/es/transfer/search";
import { DEFAULT_POSTS_NUM } from "../helpers/config";
import ArchiveBox from "../components/ArchiveBox";
import { aCode, saveToLocal } from "../helpers/helpers";
import { searchPosts } from "../features/firebase";
import { useTranslation } from "react-i18next";

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;

  & div {
    max-width: 20rem;
  }
`;

const StyledContainer = styled.div`
  padding: 1rem;

  display: grid;
  justify-items: center;

  & button {
    width: fit-content;
    margin: 0 auto;
  }

  & .ant-input-affix-wrapper {
    width: 90%;
    max-width: 20rem;
    margin: 1rem 0;
  }

  a {
    color: var(--color-main);
  }

  & form {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & button {
      font-size: 1.2rem;
    }
  }
`;

function Archive({ loadNum, setLoadNum }) {
  const [search, setSearch] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [thereIsPosts, setThereIsPosts] = useState(false);
  const [stopRendering, setStopRendering] = useState(false);
  const [t] = useTranslation("global");

  return (
    <StyledContainer>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!search.trim()) {
            setSearchedPosts([]);
            return;
          }

          const searchText = aCode(search.trim());
          const results = await searchPosts(searchText);
          setSearchedPosts(results);
        }}
      >
        {thereIsPosts && (
          <Search
            placeholder={t("archive.searchHolder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </form>
      {!thereIsPosts && (
        <p>
          {t("archive.vpnWarning")}{" "}
          <a href="https://riseup.net/en/vpn" target="_blank" rel="noreferrer">
            VPN
          </a>
        </p>
      )}
      {searchedPosts.length > 0 && <p>{t("archive.searchResult")}</p>}

      <StyledBox>
        {searchedPosts.length > 0 &&
          searchedPosts.map((post) => {
            saveToLocal(post.id, { ...post, downloadedAt: Date.now() });
            return <ArchiveBox key={post.id} index={post.id} />;
          })}

        {searchedPosts.length <= 0 &&
          [...Array(loadNum)].map((_, index) => {
            // in case it's not by search
            if (!thereIsPosts) setThereIsPosts(true);
            return (
              <ArchiveBox
                key={index + 1}
                index={index + 1}
                setStopRendering={setStopRendering}
              />
            );
          })}
      </StyledBox>

      {thereIsPosts && !stopRendering && (
        <Button
          type="dashed"
          onClick={() => {
            setLoadNum((prev) => prev + DEFAULT_POSTS_NUM);
          }}
        >
          {t("archive.loadMore")}
        </Button>
      )}
    </StyledContainer>
  );
}

export default Archive;
