import {Link, Outlet} from "react-router-dom";
import "./Layout.css";

const Layout = () => {

    return (
        <>
            <header className={"appHeader"} id={"appHead"}>
                <h1 id={"profileHeader"}>
                    <nav className={"navLinks"} id={"navLinks"}>
                        <Link to="/profile">Profile</Link>
                        <Link to={""}>Overview</Link>
                    </nav>
                </h1>
                <nav className={"navAuth"} id={"navAuth"}>
                    <Link to="/login">Log in</Link>
                    <a href="src/components/register"> Register</a>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}

export default Layout;