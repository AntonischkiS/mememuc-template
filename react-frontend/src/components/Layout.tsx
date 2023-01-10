import {Link, Outlet} from "react-router-dom";
import "./Layout.css";
// import exp = require("constants");

const Layout = () => {
    return (
        <>
            <header>
                <h1>
                    <nav>
                        <Link to="/profile">Profile</Link>
                    </nav>
                </h1>
                <nav>
                    <Link to="/login">Log in</Link>
                    <a href="Register"> Register</a>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}

export default Layout;