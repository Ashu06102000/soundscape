import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "./auth/Login";
import { Playlist } from "./interfaces/interface";
import Playlists from "./components/playlist/PlaylistList";
import Layout from "./Layout";

const App: React.FC = () => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get("spotifyToken") || ""
  );
  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotifyToken");

    if (!token && hash) {
      const tokenFromHash = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (tokenFromHash) {
        window.location.hash = "";
        Cookies.set("spotifyToken", tokenFromHash, { expires: 1 });
        setToken(tokenFromHash);
      }
    } else {
      setToken(token);
    }
  }, []);
  const logout = () => {
    setToken("");
    Cookies.remove("spotifyToken");
  };

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <Layout logout={logout} />
        </>
      )}
    </div>
  );
};

export default App;
