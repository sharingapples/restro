export default function all(schema) {
  return schema.allIds.map(id => schema.byId[id]);
}