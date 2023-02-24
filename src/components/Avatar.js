import React from "react";
import styles from "../styles/Avatar.module.css";

/*
* Avatar component with default height prop
* Credit: CI "Moments" Walkthrough
*/

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;