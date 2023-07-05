import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login";
import { Feed } from "./pages/feed";
import { RequiresAuth } from "./components/RequiresAuth";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import PostView from "./pages/Post";
import { ClimbingBoxLoader } from "react-spinners";

import { useAuthContext } from "./context/AuthContext";



function App() {

  const { showLoading } = useAuthContext();
  return (
    <div className="App scroll-smooth relative z-1 ">

      {showLoading && <div className="loader z-[99] absolute h-full w-full bg-black/80 grid place-content-center">
        <ClimbingBoxLoader color="#FE7575" />
      </div>}

      <Routes>
        <Route path="/" element={<RequiresAuth> <Feed /> </RequiresAuth>} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/explore" element={<RequiresAuth><Explore /></RequiresAuth>} ></Route>
        <Route path="/bookmarks" element={<RequiresAuth><Bookmarks /></RequiresAuth>} ></Route>
        <Route path="/profile/:userID" element={<RequiresAuth><Profile /></RequiresAuth>} ></Route>
        <Route path="/post/:postId" element={<RequiresAuth><PostView /></RequiresAuth>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
