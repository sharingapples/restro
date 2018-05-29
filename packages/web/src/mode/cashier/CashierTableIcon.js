// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  table: {
    id: string,
    number: string,
    status: string,
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class CashierTableIcon extends Component<Props> {
  render() {
    const { id, number, status } = this.props.table;
    const active = status === 'Active';

    const color = active ? 'green' : 'red';

    return (
      <Link to={active ? `/table/${id}` : ''}>
        <div style={{ display: 'flex', flex: 1, padding: '8px' }}>
          <div
            style={{
              width: '180px',
              height: '80px',
              padding: '5px',
              color: 'white',
              backgroundColor: color,
            }}
          >
            <h4>{number}</h4>
            <span>{}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default CashierTableIcon;
