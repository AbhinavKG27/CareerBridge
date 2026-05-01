import { createContext, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({
  isAuthorized: false,
  user: null,
  refreshUser: async () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const refreshUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/api/v1/user/getuser`, { withCredentials: true });
      setUser(response.data.user);
      setIsAuthorized(true);
      return response.data.user;
    } catch {
      setUser(null);
      setIsAuthorized(false);
      return null;
    } finally {
      setAuthReady(true);
    }
  }, [API]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        authReady,
        refreshUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);