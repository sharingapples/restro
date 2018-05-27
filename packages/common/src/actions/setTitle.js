const SET_TITLE = 'SET_TITLE';

export default function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: title,
  }
}

setTitle.TYPE = SET_TITLE;

