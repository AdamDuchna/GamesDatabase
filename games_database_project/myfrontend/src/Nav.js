import React from "react";
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
    const { keycloak } = useKeycloak();
    return (
    <>
    <nav><h1>The Game Database</h1>
        <Link to='/' style={{ textDecoration: 'none', color: "white" }} ><h1>Our Favourite Games</h1></Link>
        <Link to='/games' style={{ textDecoration: 'none', color: "white" }} ><h1>All Games</h1></Link>
        <h1>
        { keycloak.authenticated ?
        ( <div onClick={() => keycloak.logout()}> {keycloak.tokenParsed.preferred_username} | LOGOUT  </div> )
        : ( <div onClick={() => keycloak.login()}> LOGIN</div> )}
        </h1>
    </nav>
    </>
    )
}

export default Nav;