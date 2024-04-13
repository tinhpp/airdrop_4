import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.title}>
          One workspace. <br />
          Every team.
        </div>
        <div className={styles.description}>
          We're more than a doc. Or a table. Customize <br />
          Smart note to work the way you do.
        </div>
        <Link className={styles.btnTry} to="/register">Try Smart Note free</Link>
      </div>
      <div className={styles.right}>
        <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png" alt="Smart note" />
      </div>
    </div>
  );
}
