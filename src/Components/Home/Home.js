import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {  useHistory } from "react-router-dom";
import { abi, contractAddress, tokencontractAddress, tokenabi } from '../Constants/constant';
import {  toast } from 'react-toastify';
import { loadWeb3 } from '../Api/Api';
import "./home.css"

export default function Home() {

    let history = useHistory();
    // let [animalCheck, setAnimalChek] = useState(false);
    let [gameCard, setGameCard] = useState("");
    let [userCard, setUserCard] = useState("");
    let [Amount, setAmount] = useState("")
    let [boolFunc, setBoolFunc] = useState(true)
    let [btnText, setbtnText] = useState("Start")
    const [account, setAccount] = useState("");
    const get = async () => {
        let acc = await loadWeb3();
        setAccount(acc);
        console.log("get add", account);
    }



    const Register = async () => {
        
        const web3 = window.web3;
        let tokenContract = new web3.eth.Contract(tokenabi, tokencontractAddress);
        
        let AccountinfoAll = await tokenContract.methods.allowance(account, contractAddress).call();
        let Allowance = await web3.utils.fromWei(AccountinfoAll);
        console.log("Allowance= ", Allowance);
        if(Allowance>=500){
            setBoolFunc(false)
        }else{
            setBoolFunc(true)
        }
        if (boolFunc) {
            try {
                console.log("Called Register")
                const web3 = window.web3;
                let contract = new web3.eth.Contract(abi, contractAddress);
                let tokenContract = new web3.eth.Contract(tokenabi, tokencontractAddress);

                let RemainingArbiCoins = await tokenContract.methods.balanceOf(account).call();
                let ActualRemainingArbiCoins = await web3.utils.fromWei(RemainingArbiCoins);
                console.log("You Have ArbiCoins =", ActualRemainingArbiCoins);
                console.log("Account= ", account);
                setbtnText("Wait Processing...");

                if (ActualRemainingArbiCoins > 500) {

                    if (Allowance < 500) {
                        await tokenContract.methods.approve(contractAddress, web3.utils.toWei("" + 500)).send({
                            from: account
                        })
                    } else {

                        await contract.methods.register().send({
                            from: account
                        });
                        setbtnText("Get Aninaml Card")
                        setBoolFunc(!boolFunc);
                        toast.success("Transaction Successfull")
                    }

                } else if (ActualRemainingArbiCoins < 500) {
                    toast.error("Out of Balance, Please Recharge");
                }
                //   if(Allowance>=500){
                //     await contract.methods.register().send({
                //         from:account
                //     });
                //     setbtnText("Get Aninaml Card")
                //     setBoolFunc(!boolFunc);
                //     toast.success("Transanction Successfull")   
                // }
                else {
                    toast.error("Please Approve 500 ArbiCoins First");
                }
            }
            catch (error) {

                setbtnText("Start")
                toast.error("Oops! You Cancelled Transaction ");

            }
        }
        else if(!boolFunc) {
            setbtnText("Get Animal card")
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            let Userinfo = await contract.methods.User(account).call();
            let Status = Userinfo.status;
            console.log("Status = ", Status)
            if (Status == false) {
                try {
                    // setAnimalChek(true);
                    console.log("User's Card", userCard);
                    console.log("AI's Card", gameCard);
                    console.log("Called Get Animal")
                    const web3 = window.web3;
                    let contract = new web3.eth.Contract(abi, contractAddress);
                    await contract.methods.GetAnimal().send({
                        from: account
                    })
                    setBoolFunc(!boolFunc);
                    toast.success("Transaction Successfull")
                    let Userinfo = await contract.methods.User(account).call();
                    let amount = Userinfo.amount;
                    let actualAmount = await web3.utils.fromWei(amount);
                    let Card_No = Userinfo.Card_No;
                    let random_Card = Userinfo.random_Card;
                    setAmount(actualAmount);
                    setUserCard(Card_No);
                    setGameCard(random_Card);
                    let Food_card = Userinfo.Food_card;
                    console.log(amount);
                    console.log("User's Card", Amount);
                    console.log("AI's Card", random_Card);
                    history.push("/gamePlay/" + Card_No + "/" + random_Card);
                }
                catch {
                    toast.error("Oops! You Cancelled Transaction ");
                }

            }
            else {

                toast.error("Oops! You Have Already Puchased Animal Card");
            }
        }
    }
    const check = async () => {
        if (!account) {

            let acc = await loadWeb3();
            setAccount(acc);
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            console.log("acccount =", account);

            let Userinfo = await contract.methods.User(acc).call();
            let amount = Userinfo.amount;
            console.log("Amount ==", Amount)

            if (amount >= 500) {
                console.log(Amount)
                // alert("You Have Already Registered");
                setbtnText("Get Aninaml Card")
                setBoolFunc(!boolFunc);
            }
        }
    }

    useEffect(() => {
        setInterval(() => {
            get();
        }, 1000);
        check();
        get();
    }, [])

    //end


    return (
        <div className="App-containor">
            <div className="Containor">
                <div className="text-Containor">
                    <div className="text-Data">
                        <p className="welcome-txt">
                            Welcome
                        </p>
                        <div >
                            <p className="to-txt">
                                T0
                            </p>
                        </div>

                        <p className="main-txt">
                            Feed My Pet
                        </p>
                    </div>
                </div>
                <div className="img-containor1">
                    <img className="myimg1" alt="Game Card" src="CardBack03.jpg" />
                </div>

                <div className="btn-containor">
                    {/* <div className="homebtn">
                        <Link className="link-txt" to="/#">
                            Register
                        </Link>
                    </div> */}

                    <button id="cola" className="btn btn-lg btan" onClick={() => Register()}>{btnText}</button>
                    {/* <Link id="cola"  className="btn btn-lg btan" onClick={()=>Register()} to="/gamePlay">
                        {btnText}
                        </Link> */}
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}