function compareString(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
}

function schemaMap(R, fn) {
  return R.allIds.map(r => fn(R.byId[r]));
}

function schemaFilter(R, fn) {
  return R.allIds.reduce((res, r) => {
    const o = R.byId[r];
    if (fn(o)) {
      res.push(o);
    }
    return res;
  }, []);
}

export default function createItemTree({ Category, Item, MenuItem }) {
  const cats = schemaMap(Category, cat => ({
    id: cat.id,
    title: cat.name,
    groups: schemaFilter(Item, item => item.categoryId === cat.id).map(item => ({
      id: item.id,
      title: item.name,
      unit: item.unit,
      threshold: item.threshold,
      items: schemaFilter(MenuItem, m => m.itemId === item.id).map(m => ({
        id: m.id,
        title: m.name,
        qty: m.qty,
        price: m.price,
      })),
    })).sort((a, b) => compareString(a.title, b.title)),
  }));
  return cats;
}
