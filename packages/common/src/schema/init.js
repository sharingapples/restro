const SCHEMA_INIT = 'schema.init';

function init(table, data) {
  return {
    type: SCHEMA_INIT,
    schema: table,
    payload: data,
  };
}

init.TYPE = SCHEMA_INIT;

export default init;
