const TYPE = 'schema.add';

function add(table, record) {
  return {
    schema: table,
    type: TYPE,
    payload: record,
  };
}

add.TYPE = TYPE;

export default add;
