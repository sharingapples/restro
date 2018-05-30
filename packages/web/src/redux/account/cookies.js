/* global document */

export default {
  get: (cookie) => {
    const chk = `${cookie.trim()}=`;
    const cookies = document.cookie.split(';');
    const r = cookies.find(c => c.trim().indexOf(chk) === 0);
    if (!r) {
      return null;
    }

    const res = r.trim().substr(chk.length);
    return res;
  },

  set: (cookie, value) => {
    document.cookie = `${cookie.trim()}=${value}`;
  },

  clear: (cookie) => {
    document.cookie = `${cookie.trim()}= ;expires=${(new Date(Date.now() - 1)).toUTCString()}`;
  },
};
