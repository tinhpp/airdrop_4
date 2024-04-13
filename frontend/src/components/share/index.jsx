import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import noteApi from "@api/note";
import styles from "./styles.module.scss";
const defaultImage =
  "https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png";

export default function ShareNote() {
  const { slug } = useParams();

  const [note, setNote] = useState({});

  const getNote = async () => {
    const { data } = await noteApi.getNoteBySlug(slug);
    setNote(data);
  };

  useEffect(() => {
    getNote();
  }, [slug]);

  if(!note?._id) return <></>

  return (
    <div>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <img src={note.image || note?.page?.image || defaultImage} />
          <span>
            {note?.page?.title} / {note.title}
          </span>
        </div>
        <Link to="/login" className={styles.btnTry}>Try Smart Note</Link>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: note.content }}>
      </div>
    </div>
  );
}
