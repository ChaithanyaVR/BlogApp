import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ username: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Prevent route render before auth check

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username");

    if (token && username) {
      setAccount({ username });
      setIsAuthenticated(true);
    }
    setLoading(false); // Done checking sessionStorage
  }, []);

  if (loading) return null; // Don’t render anything until auth is checked

  return (
    <DataContext.Provider
      value={{ account, setAccount, isAuthenticated, setIsAuthenticated}}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
