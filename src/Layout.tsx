import PlaylistList from "./components/playlist/PlaylistList";

const Layout = ({ logout }: { logout: () => void }) => {
  return (
    <>
      <button onClick={logout}>Logout</button>
      <PlaylistList />
    </>
  );
};
export default Layout;
