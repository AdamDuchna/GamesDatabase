import React,{useState} from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const [games,setGames]=useState([])
  const { keycloak } = useKeycloak();
  const apiProtectedEndpoint = "http://localhost/api/frontend/games";
  const [err,SetErr] = useState(undefined)

  useEffect(() => {
    const accessToken = keycloak.token || "";
    keycloak.authenticated &&
    axios
    .get( apiProtectedEndpoint, { headers: { Authorization: "Bearer " + accessToken }} )
    .then((result) => { 
        console.log(result)
        setGames(result.data.games) })
    .catch((error) => { SetErr(error.message) });
  }, []);

  return (
    <>
    { !err ?
    <div className="game-box">
        {keycloak.authenticated? <div className="game plus"><Link to="/games/add" style={{ textDecoration: 'none', color: "black" }}>+</Link></div> 
        : <div className="error">Please log in to view this page</div>}
        {games && games.map((game)=><div className="game" key={game.title}><img src={game.cover}></img><div>{game.title}</div></div>)}
    </div>
    : <div className="error">{err}</div>
    }
    </>
  );
};

export default Games;
