
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {abi,contractAddress,tokencontractAddress,tokenabi} from '../Constants/constant';

export default function FoodCard() {
    const [account, setAccount] = useState("Connect");

    // let [disabe, setDisable] = (false);
    let [Opacity , setOpacity]=useState(false);
    console.log("Opacity = ", Opacity)


    //Connectivity
   
    //end
        return (
        <div className="app-Continor">
            <div className="main">
                <div className="btn-containor">
                    <div className="btn-class"
                       >
                            <p className="btn-txt1">
                                Get Food Card1
                            </p>
                    </div>
                </div>
            </div>
        </div>
)}
