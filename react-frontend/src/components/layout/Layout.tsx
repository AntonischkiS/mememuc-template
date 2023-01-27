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
                        <Link to={"/editor"}>Editor</Link>
                    </nav>
                </h1>
                <nav className={"navAuth"} id={"navAuth"}>
                    <Link to="/login">Log in</Link>
                    <a href="src/components/register"> Register</a>
                </nav>
            </header>
            <Outlet/>
            <body>
            <div className="meme-generator">
                <label>Select an Image</label>
                <input type="file" id="imageFileInput"></input>

                <label>Top Text</label>
                <input type="text" id="topTextInput"></input>

                <label>Bottom Text</label>
                <input type="text" id="bottomTextInput"></input>

                <canvas id="meme"></canvas>
            </div>
            </body>
        </>
    );
}

export default Layout;