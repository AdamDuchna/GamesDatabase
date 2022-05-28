import React, {useState} from "react";

export const MinusButton=({counter, setCounter, ...props})=>{
    const handleOperation=()=>{
        if(counter>0){
            setCounter(counter-1)
        }else{
            setCounter(0)
        }
    }
    return(
        <div>
            <button onClick={()=>handleOperation()}>-</button>
        </div>
    )
}