import "./login.css"
import React from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
//TODO find out how to remove header of layout
    const navigate = useNavigate();
    function login(){
        navigate("/profile")
    }

    return (
        <div className={ "login"}>
        <h1>
            Log In
        </h1>
        <ul>
           <li>
               <textarea id = "user" name="user" rows={1} defaultValue={"Username"}></textarea>
           </li>
            <li>
                <textarea id = "pw" name="pw" rows={1} defaultValue={"Password"}></textarea>
            </li>
            <li>
                <button onClick={login}> Login </button>
            </li>
        </ul>
        </div>);
}

export default Login;