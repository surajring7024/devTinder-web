import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./components/Feed";
import AuthTabs from "./components/AuthTabs";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { fetchRequests } from "./utils/sharedApi";
import { useEffect } from "react";

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      fetchRequests(dispatch);
    }
  }, [user]);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/login" element={<AuthTabs />}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/editProfile" element={<EditProfile />}></Route>
            <Route path="/connections" element={<Connections />}></Route>
            <Route path="/requests" element={<Requests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
