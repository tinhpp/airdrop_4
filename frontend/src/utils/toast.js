import { toast as toastFunc } from 'react-toastify';

const toast = {
  success: (text = 'Saving successfully') => {
    toastFunc.success(text, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      colored: true,
      theme: 'colored',
    });
  },
  error: (text = 'An error occurred. Please try again later!') => {
    toastFunc.error(text, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  },
  info: (text) => {
    toastFunc.info(text, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
};

export default toast;
