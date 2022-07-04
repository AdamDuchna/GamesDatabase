import React,{useState} from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";


const AddGame = () => {
    const [cover,setCover] = useState("");
    const [title,setTitle] = useState("");
    const { keycloak } = useKeycloak();
    const apiProtectedEndpoint = "http://localhost:4000/frontend/games";
    const navigate = useNavigate();
    const accessToken = keycloak.token || "";

    const submitForm = () => { 
        keycloak.authenticated && 
        axios
        .post(apiProtectedEndpoint,{ headers: { Authorization: "Bearer " + accessToken, },data:{ cover: cover , title: title}})
        .then(()=>{navigate("/games")})
        .catch((error) => { console.log(error); })
    }
    return (
        <div>
            <form id="form">
            <label >Cover url: </label>
            <input type="text" id="cover" name="cover" onChange={e=>setCover(e.target.value)} />
            <label >Title: </label>
            <input type="text" id="title" name="title" onChange={e=>setTitle(e.target.value)}/>
            <button type="button" onClick={()=>{submitForm()}}>Submit</button>
            </form>
        </div>
    );
};

export default AddGame;
