import { createContext, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

// ================= AXIOS GLOBAL CONFIG =================
const API = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API;
axios.defaults.withCredentials = true;

// ================= CONTEXT =================
export const Context = createContext({
  isAuthorized: false,
  user: null,
  refreshUser: async () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/user/getuser");
      setUser(response.data.user);
      setIsAuthorized(true);
      return response.data.user;
    } catch (err) {
      console.log("Auth check failed:", err?.response?.data || err.message);
      setUser(null);
      setIsAuthorized(false);
      return null;
    } finally {
      setAuthReady(true);
    }
  }, []);

 useEffect(() => {
  const initAuth = async () => {
    await refreshUser();
  };
  initAuth();
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