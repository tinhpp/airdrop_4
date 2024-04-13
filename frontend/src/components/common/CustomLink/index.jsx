import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './styles.module.scss';

const CustomLink = ({ children, to, ...props }) => {
  const location = useLocation();
  const match = location.pathname === to;

  return (
    <Link to={to} {...props}>
      <div className={match ? styles.active : ''} >{children}</div>
    </Link>
  );
};

export default CustomLink;
