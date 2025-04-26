import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import AuthTabs from "./components/AuthTabs";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body></Body>}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<AuthTabs />}></Route>
              <Route path="/profile" element={<Profile></Profile>}></Route>
              <Route path="/editProfile" element={<EditProfile />}></Route>
              <Route path="/connections" element={<Connections />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
