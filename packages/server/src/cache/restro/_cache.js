import LRU from 'lru-cache';

const restros = LRU({ max: 10 });

export default restros;
