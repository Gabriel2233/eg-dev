import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TContext = {
  favorites: number[];
  onIdeaLike(ideaId: number): void;
};

const STORAGE_KEY = "favorite-ideas";

const FavContext = createContext<TContext>({} as TContext);

export const FavContextProvider = ({ children }: { children: ReactNode }) => {
  const favorites = useProvideFavorites();

  return (
    <FavContext.Provider value={favorites}>{children}</FavContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavContext);
};

const useProvideFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storagedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (storagedData) {
      setFavorites(storagedData);
    }
  }, []);

  const onIdeaLike = (ideaId: number) => {
    const storagedFavs = JSON.parse(localStorage.getItem(STORAGE_KEY));

    let innerArray: number[] = [];

    if (storagedFavs) {
      innerArray = storagedFavs;
    }

    const presence = favorites.includes(ideaId);

    if (presence) {
      const index = innerArray.findIndex((id) => id === ideaId);

      innerArray.splice(index, 1);

      setFavorites(innerArray);
    } else {
      innerArray.push(ideaId);

      setFavorites(innerArray);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(innerArray));
  };

  return {
    favorites,
    onIdeaLike,
  };
};
