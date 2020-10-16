/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {
  ComponentType, useContext, useState, FC,
} from 'react';
import { TSearchResults } from '../types';

type TSearchResultContextValue = {
  results: TSearchResults,
  setResult: React.Dispatch<React.SetStateAction<TSearchResults>>,
};

/**
 * Search result context
 */
const defaultSearchResults: TSearchResultContextValue = {
  results: [],
  setResult: () => {},
};
const searchResultContext = React.createContext<TSearchResultContextValue>(defaultSearchResults);

export const SearchResultProvider: FC = ({ children }) => {
  const [results, setResult] = useState<TSearchResults>([]);

  const contextValue = {
    results,
    setResult,
  };

  return (
    <searchResultContext.Provider value={contextValue}>
      {children}
    </searchResultContext.Provider>
  );
};

export const useSearchResultContext = () => useContext(searchResultContext);

export const withSearchResult = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <SearchResultProvider>
    <Component {...props} />
  </SearchResultProvider>
);