import React, { Component } from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import numeral from 'numeral';

import { Button } from '@blueprintjs/core';

import { Consumer } from '../../../App';

import Menu from './Menu';
import client from '../../../socket';

class WaiterTable extends Component {
  placeOrder = async (items) => {
    const waiter = await client.scope('Waiter');
    console.log(waiter, this.props.table);
    // place order on the given table
    await waiter.placeOrder(this.props.table.id, items);
  }

  render() {
    const { getMenuItem } = this.props;
    const tbl = this.props.table;

    return (
      <Consumer>
      {(app) => {
        const bar = app.getTopBar();
        bar.setTitle(`Table ${tbl.number}`);
        bar.setActionButton(
          <Button onClick={() => window.history.back()}>Cancel</Button>
        );

        return (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ display: 'flex', flex: 2, padding: '5px' }}>
              <Menu onConfirm={this.placeOrder} />
            </div>
            <div style={{ display: 'flex', flex: 1, padding: '5px', overflowY: 'scroll' }}>
              <table className="pt-html-table pt-small" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Item ({tbl.items.length})</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>{numeral(tbl.items.reduce((res, itm) => res + (itm.qty * itm.rate), 0)).format('0,0.00') }</th>
                  </tr>
                </thead>
                <tbody>
                  {tbl.items.map((itm, idx) => (
                    <tr key={itm.id}>
                      <td>{idx + 1}</td>
                      <td>{getMenuItem(itm.menuItemId).name}</td>
                      <td>{numeral(itm.qty).format('0')}</td>
                      <td>{numeral(itm.rate).format('0,0.00')}</td>
                      <td>{numeral(itm.qty * itm.rate).format('0,0.00')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ database }, ownProps) => {
  const { id } = ownProps.match.params;
  // const table = schema.get(database.tables, id);

  // // Get all orders for the table
  // const order = schema(database.orders).all().find(o => o.tableId === id);
  // const orderItems = schema(database.orderItems).all().filter(o => o.orderId === order.id);

  console.log('Tables', database.Table, id);

  return {
    table: schema.get(database.Table, id),
    getMenuItem: id => schema.get(database.MenuItem, id),
  };
};

export default connect(mapStateToProps)(WaiterTable);

