import { useState } from "react";

import { useRequest } from "./request.hook";

// import { DirectoryPathContext } from "../context/directoryPathContext";

export const useSearchFile = () => {
  //   const { getFullPath, changeCurrentPath } = useContext(DirectoryPathContext);
  const { ajaxRequest } = useRequest();
  const [searchValue, setSearchValue] = useState(null);
  const [searchResultFiles, setSearchResultFiles] = useState(null);
  const [loadingSearchFiles, setLoadingSearchFiles] = useState(false);

  const getSearchResultsStorage = async (inputValue) => {
    try {
      setLoadingSearchFiles(true);
      setSearchValue(inputValue);

      const searchResult = await ajaxRequest(
        `/api/storage/search/file/${inputValue}`
      );

      if (searchResult) {
        setSearchResultFiles(searchResult);
        setLoadingSearchFiles(false);
      }
    } catch (e) {
      setSearchValue(null);
      setLoadingSearchFiles(false);
      console.warn("Не удалось найти запрошенный файл: ", e.message);
    }
  };

  return {
    getSearchResultsStorage,
    searchValue,
    loadingSearchFiles,
    searchResultFiles,
  };
};
