import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFavourite = () => {
    const [cover,setCover] = useState("");
    const [title,setTitle] = useState("");
    const apiUnprotectedEndpoint = "http://localhost:4000/frontend/favourites";
    const navigate = useNavigate();
    const submitForm = () => { 
        axios
        .post(apiUnprotectedEndpoint, {data: { cover: cover , title: title} } )
        .then(()=>{navigate("/")})
        .catch((error) => { console.log(error); })
    }
    return (
        <div>
            <form id="form">
            <label>Cover url: </label>
            <input type="text" id="cover" name="cover" onChange={e=>setCover(e.target.value)} />
            <label>Title: </label>
            <input type="text" id="title" name="title" onChange={e=>setTitle(e.target.value)}/>
            <button type="button" onClick={()=>{submitForm()}}>Submit</button>
            </form>
        </div>
    );
};

export default AddFavourite;
