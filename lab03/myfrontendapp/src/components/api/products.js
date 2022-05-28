import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';






function ProductList(){
    const [productsList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)

    const loadProducts=()=>{
        try{
            axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
                setProductList(response.data)
            })
            
            
            setLoading(false)
        }catch(error){
            setLoading(true)
            console.log('error');
        }
    }

    useEffect(()=>{
        loadProducts()
    }, [])



    return(
        <div>{loading ? 
            <div>Loading...</div> :
        <div>{productsList.map((item)=>(
            <div>
                <h1>{item.title}</h1>
                <div>{item.id}</div>
                <Link to={`/detail/${item.id}`}>
                    <button type="button">
                        Detail
                    </button>
                </Link>

            </div>
        ))}</div>
        }</div>
    )

}

export default ProductList