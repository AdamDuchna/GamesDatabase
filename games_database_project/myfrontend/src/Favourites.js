import React,{useState} from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [favourites,setFavourites]=useState([])
  const [err,SetErr] = useState(undefined)
  const apiUnprotectedEndpoint = "http://localhost/api/frontend/favourites";

  useEffect(() => {
        axios
        .get(apiUnprotectedEndpoint)
        .then((result) => { setFavourites(result.data.favourites) })
        .catch((error) => { SetErr(error.message) });
  }, []);

  return (
    <>
    { !err ?
    <div className="game-box">
    <div className="game plus"><Link to="/add" style={{ textDecoration: 'none', color: "black"}}>+</Link></div>
      {favourites && favourites.map((favourite)=><div className="game" key={favourite.title}><img src={favourite.cover}></img><div>{favourite.title}</div></div>)}
    </div>
    : <div className="error">{err}</div>
    }
    </>
  );
};

export default Favourites;
