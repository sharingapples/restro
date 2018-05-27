export default function map(schema, fn) {
  return schema.allIds.map(id => fn(schema.byId[id]));
}
