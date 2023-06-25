import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login";
import { Feed } from "./pages/feed";
import { RequiresAuth } from "./components/RequiresAuth";

function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<RequiresAuth><Feed /></RequiresAuth>} ></Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
