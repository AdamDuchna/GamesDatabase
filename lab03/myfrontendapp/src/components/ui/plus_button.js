import React, {useState} from "react";


export const PlusButton=({setCounter, counter, ...props})=>{
    return(
        <div>
            <button onClick={()=>setCounter(counter+1)}>+</button>
        </div>
    )
}