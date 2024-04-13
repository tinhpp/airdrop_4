import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import noteApi from "@api/note";
import CustomLink from "@components/common/CustomLink";
import styles from "./styles.module.scss";
import {
  setNoteList,
  togglePage,
  reset as resetPage,
} from "@app/slices/pageSlice";
import { logout } from "@app/slices/authSlice";
import { reset as resetNote } from "@app/slices/noteSlice";
import InputDialog from "@components/common/InputDialog";
import { DIALOG_TYPE } from "@constants/enum";

const defaultImage =
  "https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const pages = useSelector((state) => state.pages);
  const [dialog, setDialog] = useState({
    active: false,
    title: "",
    type: "",
    data: {
      _id: "",
      text: "",
    },
  });

  const handlePageItemClick = async (pageId) => {
    if (!pages[pageId].isOpen) {
      const { data } = await noteApi.getNotesByPageId(pageId);
      dispatch(setNoteList({ page: pageId, note: data }));
    }
    dispatch(togglePage(pageId));
  };

  const handleResetDialog = () => {
    setDialog({
      active: false,
      title: "",
      type: "",
      data: {
        _id: "",
        text: "",
      },
    });
  };

  const handleOpenDialog = (type, data, event) => {
    if(event)  event.preventDefault();

    const newDialog = {
      active: true,
      title: "",
      type,
      data: {
        _id: "",
        text: "",
      },
    };
    switch (type) {
      case DIALOG_TYPE.RENAME_PAGE:
        newDialog.title = "Rename page";
        newDialog.data = {
          _id: data._id,
          text: data.title,
        };
        break;
      case DIALOG_TYPE.RENAME_NOTE:
        newDialog.title = "Rename note";
        newDialog.data = {
          _id: data.slug,
          text: data.title,
        };
        break;
      case DIALOG_TYPE.REMOVE_PAGE:
        newDialog.title = `Remove page <b>${data.title}</b>? `;
        newDialog.data = {
          _id: data._id,
          text: data.title,
        };
        break;
      case DIALOG_TYPE.REMOVE_NOTE:
        newDialog.title = `Remove note <b>${data.title}</b>? `;
        newDialog.data = {
          _id: data.slug,
          text: data.title,
          page: data.page
        };
        break;
      case DIALOG_TYPE.ADD_NOTE:
        newDialog.title = `Add new note`;
        newDialog.data = {
          _id: data._id,
          text: "",
        };
        break;
      case DIALOG_TYPE.ADD_PAGE:
        newDialog.title = `Add new page`;
        newDialog.data = {
          _id: "",
          text: "",
        };
        break;
      default:
        break;
    }
    setDialog(newDialog);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(resetPage());
    dispatch(resetNote());
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user.name.split(" ")[user.name.split(" ").length - 1][0]}
          </div>
          <div className={styles.name}>{user.name}'s Note</div>
        </div>
        <div className={styles.pageList}>
          {Object.values(pages)?.map((item) => (
            <div className={styles.pageItem} key={item._id}>
              <div className={styles.pageItemBlock}>
                <div
                  className={styles.pageItemInfo}
                  onClick={() => handlePageItemClick(item._id)}
                >
                  {item.isOpen ? (
                    <Icon
                      icon="material-symbols:keyboard-arrow-down"
                      style={{ fontSize: "20px" }}
                    />
                  ) : (
                    <Icon
                      icon="material-symbols:chevron-right-rounded"
                      style={{ fontSize: "20px" }}
                    />
                  )}
                  <img
                    src={item.image || defaultImage}
                    alt={item.title}
                    className={styles.pageImage}
                  />
                  <div className={styles.pageName}>{item.title}</div>
                </div>
                <div className={styles.moreBtn}>
                  <Icon icon="ic:outline-more-horiz" />
                  <div className={styles.moreMenu}>
                    <div
                      className={styles.moreMenuOption}
                      onClick={() =>
                        handleOpenDialog(DIALOG_TYPE.ADD_NOTE, item)
                      }
                    >
                      <Icon icon="material-symbols:add" />
                      <span>Add</span>
                    </div>
                    <div
                      className={styles.moreMenuOption}
                      onClick={() =>
                        handleOpenDialog(DIALOG_TYPE.RENAME_PAGE, item)
                      }
                    >
                      <Icon icon="material-symbols:edit-outline" />
                      <span>Rename</span>
                    </div>
                    <div
                      className={styles.moreMenuOption}
                      onClick={() =>
                        handleOpenDialog(DIALOG_TYPE.REMOVE_PAGE, item)
                      }
                    >
                      <Icon icon="uil:trash-alt" />
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.noteList} ${
                  item.isOpen ? styles.active : ""
                }`}
              >
                {item.notes?.map((note) => (
                  <CustomLink key={note._id} to={`/user/${note.slug}`}>
                    <div className={styles.noteItem}>
                      <div className={styles.noteItemInfo}>
                        <Icon
                          icon="material-symbols:chevron-right-rounded"
                          style={{
                            fontSize: "20px",
                            color: "rgba(25, 23, 17, 0.6)",
                          }}
                        />
                        <img
                          src={note.image || item.image || defaultImage}
                          alt={note.slug}
                          className={styles.noteImage}
                        />
                        <div className={styles.noteTitle}>{note.title}</div>
                      </div>
                      <div className={styles.moreBtn}>
                        <Icon icon="ic:outline-more-horiz" />
                        <div className={styles.moreMenu}>
                          <div
                            className={styles.moreMenuOption}
                            onClick={(event) =>
                              handleOpenDialog(DIALOG_TYPE.RENAME_NOTE, note, event)
                            }
                          >
                            <Icon icon="material-symbols:edit-outline" />
                            <span>Rename</span>
                          </div>
                          <div
                            className={styles.moreMenuOption}
                            onClick={(event) =>
                              handleOpenDialog(DIALOG_TYPE.REMOVE_NOTE, note, event)
                            }
                          >
                            <Icon icon="uil:trash-alt" />
                            <span>Delete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomLink>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.pageItem}>
            <div className={styles.pageItemBlock}>
              <div
                className={styles.pageItemInfo}
                onClick={() => handleOpenDialog(DIALOG_TYPE.ADD_PAGE)}
              >
                <Icon
                  icon="material-symbols:add"
                  style={{ fontSize: "20px" }}
                />
                <div className={styles.pageName}>Add a page</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer} onClick={handleLogoutClick}>
        <Icon icon="heroicons-outline:logout" />
        <span>Log out</span>
      </div>
      {dialog.active && <InputDialog {...dialog} cancel={handleResetDialog} />}
    </div>
  );
}
