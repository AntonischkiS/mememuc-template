// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Editor from "./components/editor";
import React, {useState} from "react";
import Overview from "./components/overview/Overview";
import SingleView from "./components/SingleView";


const App: React.FC = () => {
    const [token, setToken] = useState();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="/meme/:id/" element={<SingleView/>} />
                    <Route path="profile" element={<Profile />} />
                    {/*<Route path={"editor"} element={Editor}></Route>*/}
                </Route>
                <Route path="login" element={<Login setToken={setToken}/>}  />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
