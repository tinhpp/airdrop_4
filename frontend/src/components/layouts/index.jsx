import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import pageApi from "@api/page";
import { convertArrayToObject } from "@utils/convert";
import { setPages } from "@app/slices/pageSlice";
import SideBar from "./Sidebar";
import Header from "./Header";
import styles from "./styles.module.scss";

export default function UserLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const pages = useSelector((state) => state.pages);

  if (!auth.isAuth) return <Navigate to="/login" state={{ from: location }} />;

  const getPages = async () => {
    if (Object.values(pages).length != 0) return;
    const { data } = await pageApi.getPageByUser(auth.user._id);
    dispatch(
      setPages(
        convertArrayToObject(
          data.map((item) => ({ ...item, notes: [], isOpen: false }))
        )
      )
    );
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
