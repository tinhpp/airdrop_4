import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
      <Icon icon="ic:outline-note-alt" />
        <span>Smart Note</span>
      </Link>
    </div>
  )
}
