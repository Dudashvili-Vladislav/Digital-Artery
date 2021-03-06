import React from "react";
import classes from "@styles/auth/authorisation.module.scss";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import img from "../../../../assets/wallets icons/meta.svg";
import requests from "../../../api/requests";



export const AuthPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    const { ethereum } = window;
    const account = (
      await ethereum.request({ method: "eth_requestAccounts" })
    )[0];
    try {
      // const token = (await requests.auth.create()).data.token;
      await requests.auth.createUsersInDb(account, account);
      dispatch(actions.setUser(account));
      localStorage.setItem("token", token);
      M.toast({ html: "auth succes", classes: "succes" });

      history.push("/");
    } catch (error) {
      try {
        const token = await (
          await requests.auth.create(account, account)
        ).data.token;
        localStorage.setItem("token", token);
        dispatch(actions.setUser(account));
        history.push("/");
        window.location.reload();
      } catch (e) {
        console.log(e);
        M.toast({ html: error });
      }
    } finally {
      const provider = await detectEthereumProvider();
      if (provider) ethereum.enable();
      localStorage.setItem("hash", account);
    }
  };

  return (
    <div className={classes.AuthPage}>
      <div className={classes.AuthPage__title}>Sign in with your wallet</div>
      <div className={classes.AuthPage__subtitle}>
        Sign in with one of available wallet providers or create a new wallet.
        What is a wallet?
      </div>
      <div className={classes.buttons}>
        <button className={classes.button}>
          {isMetaMaskInstalled() ? (
            <div onClick={onClickConnect}>
              <img src={img} alt="" /> MetaMask
            </div>
          ) : (
            <a href="https://metamask.io/download.html" target="_blank">
              Install MetaMask
            </a>
          )}
        </button>
      </div>
    </div>
  );
};
