import axiosClient from './axiosClient';

const pageApi = {
  getPageByUser: (userId) => {
    const url = `/pages/user/${userId}`;
    return axiosClient.get(url);
  },
  updatePageById: (pageId, data) => {
    const url = `/pages/${pageId}`;
    return axiosClient.patch(url, data);
  },
  removePageById: (pageId) => {
    const url = `/pages/${pageId}`;
    return axiosClient.delete(url);
  },
  createPage: (data) => {
    const url = '/pages';
    return axiosClient.post(url, data);
  }
}

export default pageApi;