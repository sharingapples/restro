const TYPE = 'schema.update';

function update(schema, record) {
  return {
    type: TYPE,
    schema,
    payload: record,
  };
}

update.TYPE = TYPE;

export default update;
