import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components
import Cookies from "js-cookie";
import Login from "./auth/Login";

import Layout from "./Layout"; // Main layout component
import Sidebar from "./components/sidebar/Sidebar"; // Sidebar component
import Settings from "./components/settings/Settings";
import Favorites from "./components/Favorites/Favorites";
import Home from "./components/home/home";
import PlaylistList from "./components/playlist/PlaylistList";
import Playlist from "./components/playlist/Playlist";

const App: React.FC = () => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get("spotifyToken") || ""
  );

  useEffect(() => {
    const hash = window.location.hash;
    let tokenFromCookies = Cookies.get("spotifyToken");

    if (!tokenFromCookies && hash) {
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
      setToken(tokenFromCookies);
    }
  }, []);

  const logout = () => {
    setToken("");
    Cookies.remove("spotifyToken");
  };

  return (
    <Router>
      <div className="App">
        {!token ? (
          <Login />
        ) : (
          <div className="flex">
            <Sidebar logout={logout} />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Playlist />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Layout>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
