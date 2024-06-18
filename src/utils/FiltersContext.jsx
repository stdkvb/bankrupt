import { createContext, useState } from "react";

export const FiltersContext = createContext({});

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
