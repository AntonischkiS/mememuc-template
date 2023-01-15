import "./Login.css"
import React from "react";
import {useNavigate} from "react-router-dom";

interface UserData {
    name: String,
    password: String;
    error: { status: Boolean, message: String };
    success: Boolean;
}

const Login = () => {
//TODO find out how to remove header of layout
    const navigate = useNavigate();

    const [userData, setData] = React.useState<UserData>({
        name: "", password: "", error: {status: false, message: ""}, success: false
    });

    function validateLogin() {
        if (userData.name === "" || userData.password === "") {
            setData({
                success: false,
                password: userData.password,
                error: {status: true, message: ""},
                name: userData.name
            })
        }
        try {
            //TODO validate user name and password in backend
            if (userData.name === "Adam" || userData.password === "1") {
                setData({
                    success: true, password: userData.password, error: userData.error, name: userData.name
                })
            } else {
                setData({
                    success: false,
                    password: userData.password,
                    error: {status: true, message: "Invalid Credentials!"},
                    name: userData.name
                })
            }
        } catch (error: any) {
            setData({
                success: false,
                password: "",
                name: userData.name,
                error: {status: true, message: error}
            })
        }
    }

    function handleLoginClick() {
        validateLogin() //Needs proper credentials to login
        if (userData.success) {
            navigate("/profile")
            console.log(userData) //Only for debug, remove for production
        }
    }

    return (
        <div className={"login"}>
            <h1>
                Log In
            </h1>
            <ul>
                <li><label>
                    Username:</label>
               <input id="user" name="user" type={"text"} onChange={(event) => setData({
                   name: event.target.value,
                   password: userData.password,
                   error: userData.error,
                   success: userData.success
               })}></input>
                </li>
                <li><label>
                    Password: </label>
                    <input id="pw" name="pw" type={"password"} onChange={(event) => setData({
                        name: userData.name,
                        password: event.target.value,
                        error: userData.error,
                        success: userData.success
                    })}></input>
                </li>
                <li>
                    {userData.error.status && (<div className={"error"}>{
                        userData.error.message}
                    </div>)}
                </li>
                <li>
                    <button onClick={handleLoginClick}> Login</button>
                </li>
            </ul>
        </div>);
}

export default Login;