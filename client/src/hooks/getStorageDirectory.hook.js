import { useEffect, useState } from "react";

export const useGetStorage = (focusDirectory) => {
  const [loadingProcess, setLoading] = useState(false);
  const [storageFiles, setStorageFiles] = useState(null);

  const getUserStorage = async (focusUpdate) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/storage/load/${focusUpdate}`, {
        method: "GET",
      });
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

          const fullPath = focusDirectory.reduce((path, dirItem) => {
            return path + dirItem.pathValue;
          }, "");

          const response = await fetch(`/api/storage/load/${fullPath}`, {
            method: "GET",
          });
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
  }, [focusDirectory]);

  return {
    loadingProcess,
    storageFiles,
    getUserStorage,
  };
};
