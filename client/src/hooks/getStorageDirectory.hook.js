import { useEffect, useState } from "react";

import { useRequst } from "./request.hook";

export const useGetStorage = () => {
  const [loadingProcess, setLoading] = useState(true);
  const [storageFiles, setStorageFiles] = useState(null);
  const {ajaxRequest} = useRequst();

  const updateUserStorage = async () => {
    try {
      setLoading(true)
      const storageUpdated = await ajaxRequest("/api/storage/load");

      if (storageUpdated.length) {
        setStorageFiles(storageUpdated);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const getUserStorage = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/storage/load", { method: "GET" });
        const userStorage = await response.json();

        if (!response.ok) {
          throw new Error(userStorage.message || "Запрос был выполнен неверно");
        }

        if (!isCancelled) {
          if (userStorage.length) {
            setStorageFiles(userStorage);
          }
          setLoading(false);
        }
      } catch (e) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    getUserStorage();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    loadingProcess,
    storageFiles,
    updateUserStorage
  };
};
