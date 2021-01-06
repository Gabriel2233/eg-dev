import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { DbIdea } from '../../types/types';

type TContext = {
  formUtils: UseFormMethods<{ q: string }>;
  searchData: DbIdea[];
  onSearch(): Promise<void>;
};

const SearchContext = createContext<TContext>({} as TContext);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const search = useProvideSearch();

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
};

const useProvideSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const formUtils = useForm<{ q: string }>();
  const router = useRouter();

  const onSearch = formUtils.handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/ideas/search?q=${data.q}`);
      const results = await res.json();

      setSearchData(results);
    } catch (err) {
      console.log(err);
    }

    router.push('/search-results');
  });

  return {
    formUtils,
    searchData,
    onSearch,
  };
};

export const useSearch = () => {
  return useContext(SearchContext);
};
