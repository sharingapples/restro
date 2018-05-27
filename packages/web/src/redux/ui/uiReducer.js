import { setTitle } from 'restro-common/actions';

const INITIAL_STATE = {
  title: '',
};

export default function reducer() {
  return (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case setTitle.TYPE:
        return {
          ...state,
          title: action.payload,
        };
      default:
        return state;
    }
  };
}
