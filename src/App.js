import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login";
import { Feed } from "./pages/feed";
import { RequiresAuth } from "./components/RequiresAuth";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import PostView from "./pages/Post";


function App() {
  return (
    <div className="App scroll-smooth ">


      <Routes>
        <Route path="/" element={<RequiresAuth> <Feed /> </RequiresAuth>} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/explore" element={<RequiresAuth><Explore /></RequiresAuth>} ></Route>
        <Route path="/bookmarks" element={<RequiresAuth><Bookmarks /></RequiresAuth>} ></Route>
        <Route path="/profile" element={<RequiresAuth><Profile /></RequiresAuth>} ></Route>
        <Route path="/post/:id" element={<RequiresAuth><PostView /></RequiresAuth>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
