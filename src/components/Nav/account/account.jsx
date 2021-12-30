import { ethers } from "ethers";
import React, { useState } from "react";
import classes from "./account.module.scss";
export const Account = ({ id, isOpenModal }) => {
  const [userBalance, setUserBalance] = useState();
  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  if (id != 'test') {
    getAccountBalance(id);
  }
  return (
    <div
      className={`${classes.userAccount} ${
        isOpenModal ? classes.userAccount__open : ""
      } `}
    >
      <div className={classes.userAccount__token}>
        Wallet: {id.substring(0, 6)}...
      </div>
      <div className={classes.userAccount__balance}>Balance: {userBalance}</div>
    </div>
  );
};
