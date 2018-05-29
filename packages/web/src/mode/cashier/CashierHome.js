// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import CashierTableIcon from './CashierTableIcon';

import { Consumer } from '../../App';

type Props = {
  tables: Array<{
    id: string,
    number: string,
  }>,
};

// eslint-disable-next-line react/prefer-stateless-function
class CashierHome extends Component<Props> {
  render() {
    const { tables } = this.props;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Select Table');
          app.getTopBar().setActionButton(null);
          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              { tables.map(t => <CashierTableIcon key={t.id} table={t} />) }
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ database }) => ({
  tables: schema.all(database.Table),
});

export default connect(mapStateToProps)(CashierHome);
