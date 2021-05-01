import { useEffect, useState } from "react";

export const useGetStorage = () => {
  const [loadingProcess, setLoading] = useState(true);
  const [storageFiles, setStorageFiles] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function getUserStorage() {
      try {
        const response = await fetch("/api/storage/load", { method: "GET" });
        const userStorage = await response.json();

        if (!response.ok) {
          throw new Error(userStorage.message || "Запрос был выполнен неверно");
        }

        if (!isCancelled) {
          if (userStorage.length > 1) {
            setStorageFiles(userStorage);
          }
          setLoading(false);
        }
      } catch (e) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    getUserStorage();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    loadingProcess,
    storageFiles,
  };
};
