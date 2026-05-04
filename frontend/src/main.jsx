// frontend/src/main.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import api from "./utils/axios";

axios.defaults.withCredentials = true;

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: null,
  setUser: () => {},
  authReady: false,
  refreshUser: async () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/api/v1/user/getuser");
      setUser(data.user);
      setIsAuthorized(true);
      return data.user;
    } catch {
      setUser(null);
      setIsAuthorized(false);
      return null;
    } finally {
      setAuthReady(true);
    }
  }, []);

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