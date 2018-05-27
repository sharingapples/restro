import LRU from 'lru-cache';
import restro from './restro';

const users = LRU({
  max: 100,
});

export { restro };

export default {
  users,
};
