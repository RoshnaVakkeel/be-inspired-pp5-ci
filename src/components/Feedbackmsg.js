import styles from "../styles/FeedbackMsg.module.css";
import css from "classnames";
import React from "react";
import { useState } from "react";

/** 
 * Credit: https://blog.logrocket.com/create-custom-react-alert-message/
 * To show message upon deletion of a post
*/
export default function FeedbackMsg({ variant, message }) {
  const [isShown, setIsShown] = useState(true);

  /*
    Handles closing of the alert message
  */
  const handleClose = (e) => {
    e.preventDefault();
    setIsShown(false);
  };

  return (
    <div
      className={css(styles.alert, styles[variant], !isShown && styles.hide)}
    >
      <span className={styles.closebtn} onClick={handleClose}>
        &times;
      </span>
      {message}
    </div>
  );
}