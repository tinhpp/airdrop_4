import axiosClient from './axiosClient';

const noteApi = {
  getNotesByPageId: (pageId) => {
    const url = `/notes/page/${pageId}`;
    return axiosClient.get(url);
  },
  getNoteBySlug: (slug) => {
    const url = `/notes/${slug}`;
    return axiosClient.get(url);
  },
  updateNoteBySlug: (slug, data) => {
    const url = `/notes/${slug}`;
    return axiosClient.patch(url, data);
  },
  removeNoteBySlug: (slug) => {
    const url = `/notes/${slug}`;
    return axiosClient.delete(url);
  },
  createNote: (data) => {
    const url = '/notes';
    return axiosClient.post(url, data);
  }
}

export default noteApi;