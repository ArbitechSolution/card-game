import React, { useState, useEffect } from 'react';
import "./Appbar.css";
import { loadWeb3 } from '../Api/Api';
export default function AppBar() {

let [address, setAddress] = useState("Crypto Connect");

const get = async () => {
    let acc= await loadWeb3();
       let account = acc.substring(0, 4) + "..." + acc.substring(acc.length - 4)
    setAddress(account);
  }

useEffect(() => {
    get();
},[])

//end

    return (
        <div className="appContainor">
        <div className="btn-conwal"
        // onClick={()=>register()}
        >
            <p className ="btn-txt">{address}</p>
        </div>
        </div>
    )
}
