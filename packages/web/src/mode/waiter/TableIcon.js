// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'inline-flex',
    width: '60px',
    height: '60px',
    margin: '5px',
    textAlign: 'center',
    backgroundColor: 'brown',
    borderRadius: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: '24pt',
    color: 'white',
  },
};

type Props = {
  id: string,
  number: string,
  status: 'Available' | 'Active',
};

// eslint-disable-next-line react/prefer-stateless-function
class TableIcon extends Component<Props> {
  render() {
    const { id, number, status } = this.props;
    const statusColor = status === 'Active' ? 'red' : 'green';
    return (
      // eslint-disable-next-line
      <Link to={`/table/${id}`}>
        <div style={{ ...styles.container, backgroundColor: statusColor }}>
          <span style={styles.number}>{number}</span>
        </div>
      </Link>
    );
  }
}

export default TableIcon;
