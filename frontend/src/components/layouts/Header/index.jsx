import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import toast from '@utils/toast';

const defaultImage =
  "https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png";

export default function Header() {
  const location = useLocation();
  const params = useParams();
  const note = useSelector((state) => state.notes);

  const handleShareClick = () => {
    const { slug } = params;
    const url = `${window.location.origin}/share/${slug}`
    navigator.clipboard.writeText(url);
    toast.info("Copied link to clipboard");
  }

  return (
    <div className={styles.headerWrap}>
      <div className={styles.header}>
        <img src={note.image || defaultImage} />
        <span>
          {location.pathname === "/user" ? "Welcome to Smart Note" : note.path}
        </span>
      </div>
      {location.pathname !== "/user" && <button className={styles.btnShare} onClick={handleShareClick}>Share</button>}
      
    </div>
  );
}
