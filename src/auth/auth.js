const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

// Ensure the required environment variables are set
if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error("Missing Spotify API environment variables.");
}

// Update the authUrl to include the necessary scopes
export const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming user-read-playback-state user-modify-playback-state user-top-read user-library-read`;
