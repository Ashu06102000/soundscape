import React from "react";
import { authUrl } from "./auth";

const Login: React.FC = () => {
  return (
    <div className="login">
      <h1>Welcome to SoundScape</h1>
      <a href={authUrl}>Login to Spotify</a>
    </div>
  );
};

export default Login;
