const TYPE = 'schema.remove';

function remove(schema, record) {
  return {
    schema,
    type: TYPE,
    payload: record,
  };
}

remove.TYPE = TYPE;

export default remove;
