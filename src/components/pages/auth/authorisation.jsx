import React from "react";
import classes from "./authorisation.module.scss";
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
export const AuthPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(async () => {
    const provider = await detectEthereumProvider();
    

    if (provider) {
      console.log(provider);
      window.ethereum;
      ethereum.enable()
      console.log(ethereum.enable())
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const onClickConnect = async () => {
    const { ethereum } = window;

    try {
      dispatch(
        actions.setUser(
          (await ethereum.request({ method: "eth_requestAccounts" }))[0]
        )
      );
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.buttons}>
      <button className={classes.button}>
        {isMetaMaskInstalled() ? (
          <div onClick={onClickConnect}>MetaMask</div>
        ) : (
          <a href="https://metamask.io/download.html" target="_blank">
            Установить MetaMask
          </a>
        )}
      </button>
    </div>
  );
};
