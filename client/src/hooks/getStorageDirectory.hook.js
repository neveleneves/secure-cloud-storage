import { useEffect, useState } from "react";

export const useGetStorage = () => {
  const [loadingProcess, setLoading] = useState(false);
  const [storageFiles, setStorageFiles] = useState(null);

  const getUserStorage = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/storage/load", { method: "GET" });
      const userStorage = await response.json();

      if (!response.ok) {
        throw new Error(userStorage.message || "Запрос был выполнен неверно");
      }

      if (userStorage.length) {
        setStorageFiles(userStorage);
      } else {
        setStorageFiles(null);
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
        if (!isCancelled) {
          setLoading(true);

          const response = await fetch("/api/storage/load", { method: "GET" });
          const userStorage = await response.json();

          if (!response.ok) {
            throw new Error(
              userStorage.message || "Запрос был выполнен неверно"
            );
          }

          if (userStorage.length) {
            setStorageFiles(userStorage);
          } else {
            setStorageFiles(null);
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
    getUserStorage,
  };
};
