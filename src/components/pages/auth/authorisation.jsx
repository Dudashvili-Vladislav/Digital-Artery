import React from "react";
import classes from "./authorisation.module.scss";
export const AuthPage = () => {
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  console.log(isMetaMaskInstalled());
  return (
    <div className={classes.buttons}>
      <div className={classes.button}>
        {isMetaMaskInstalled() ? (
          <div>MetaMask</div>
        ) : (
          <a href="https://metamask.io/download.html">Установить MetaMask</a>
        )}
      </div>
    </div>
  );
};
