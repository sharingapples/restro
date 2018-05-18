import LRU from 'lru-cache';

const userOptions = {
  max: 100,
};

const users = LRU(userOptions);

export default {
  users,
};
