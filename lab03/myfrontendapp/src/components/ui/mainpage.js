import ProductList from "../api/products";
import React, {useState, useEffect} from "react";
import { PlusButton } from "./plus_button";
import { MinusButton } from "./minus_button";

const MainPage=()=>{
    const [counter, setCounter] = useState(0)

    return(
        <div>
            <div>
                {counter}
                <PlusButton counter={counter} setCounter={setCounter}/>
                <MinusButton counter={counter} setCounter={setCounter}/>


            </div>
            <ProductList/>
        </div>
    )
}

export default MainPage