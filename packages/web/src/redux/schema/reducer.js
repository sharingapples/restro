import schemaRedux from 'restro-common/schema';

export default function schemaReducer(...schemes) {
  const structure = schemes.reduce((res, scheme) => {
    res[scheme] = {
      byId: {},
      allIds: [],
    };
    return res;
  }, {});

  return (state = structure, action) => {
    const { schema } = action;

    // Only process actions that have schema
    if (!schema || !state[schema]) {
      return state;
    }

    switch (action.type) {
      case schemaRedux.init.TYPE:
        return {
          ...state,
          [schema]: action.payload.reduce((res, item) => {
            res.byId[item.id] = item;
            res.allIds.push(item.id);
            return res;
          }, { byId: {}, allIds: [] }),
        };

      case schemaRedux.add.TYPE:
        return {
          ...state,
          [schema]: {
            byId: { ...state[schema].byId, [action.payload.id]: action.payload },
            allIds: state[schema].allIds.concat(action.payload.id),
          },
        };

      case schemaRedux.remove.TYPE: {
        const temp = Object.assign({}, state[schema].byId);
        delete temp[action.payload.id];

        return {
          ...state,
          [schema]: {
            allIds: state[schema].allIds.filter(id => id !== action.payload.id),
            byId: temp,
          },
        };
      }

      case schemaRedux.update.TYPE:
        return {
          ...state,
          [schema]: {
            byId: {
              ...state[schema].byId,
              [action.payload.id]: {
                ...state[schema].byId[action.payload.id],
                ...action.payload,
              },
            },
            allIds: state[schema].allIds,
          },
        };

      default:
        return state;
    }
  };
}
