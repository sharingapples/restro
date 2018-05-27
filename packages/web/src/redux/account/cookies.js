/* global document */

export default {
  get: (cookie) => {
    const chk = `${cookie}=`;
    const cookies = document.cookie.split(';');
    console.log(cookies);
    const r = cookies.find(c => c.trim().indexOf(chk) === 0);
    if (!r) {
      return null;
    }

    const res = r.trim().substr(chk.length);
    console.log(res);
    return res;
  },

  set: (cookie, value) => {
    document.cookie = `${cookie}=${value}`;
  },

  clear: (cookie) => {
    document.cookie = `${cookie}= ;expires=${(new Date(Date.now() - 1)).toUTCString()}`;
  }
}
