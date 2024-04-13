import React from 'react';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import HomePage from '@pages/Home';
import UserPage from '@pages/User';
import NotePage from '@pages/Note';
import SharePage from '@pages/Share';

export const siteRoutes = [
  {
    path: '/',
    page: <HomePage />,
    isPrivate: false,
  },
  {
    path: '/login',
    page: <LoginPage />,
    isPrivate: false,
  },
  {
    path: '/register',
    page: <RegisterPage />,
    isPrivate: false,
  },
  {
    path: '/share/:slug',
    page: <SharePage />,
    isPrivate: false,
  },
]

export const userRoutes = [
  {
    path: '/user',
    page: <UserPage />,
    isPrivate: true,
  },
  {
    path: '/user/:slug',
    page: <NotePage />,
    isPrivate: true,
  },
];
