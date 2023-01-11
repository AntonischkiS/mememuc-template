import "./login.css"
import React from "react";
import {useNavigate} from "react-router-dom";

interface UserData {
    name: String,
    password: String;
}

const Login = () => {
//TODO find out how to remove header of layout
    const navigate = useNavigate();
    const [userData, setData] = React.useState<UserData>({
        name: "", password: ""
    });

    function login() {
        navigate("/profile")
        console.log(userData)
    }

    return (
        <div className={"login"}>
            <h1>
                Log In
            </h1>
            <ul>
                <li>
               <textarea id="user" name="user" rows={1} defaultValue={"Username"} onChange={(event) => setData({
                   name: event.target.value,
                   password: userData.password
               })}></textarea>
                </li>
                <li>
                    <input id="pw" name="pw" type={"password"} defaultValue={"Password"} onChange={(event) => setData({
                        name: userData.name,
                        password: event.target.value
                    })}></input>
                </li>
                <li>
                    <button onClick={login}> Login</button>
                </li>
            </ul>
        </div>);
}

export default Login;