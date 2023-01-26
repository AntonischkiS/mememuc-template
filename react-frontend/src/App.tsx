// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import React, {useState} from "react";
import Overview from "./components/overview/Overview";


const App: React.FC = () => {
    const [token, setToken] = useState();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="profile" element={<Profile />} />
                    {/*<Route path={"editor"} element={}></Route>*/}
                </Route>
                <Route path="login" element={<Login setToken={setToken}/>}  />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
