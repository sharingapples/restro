// @flow
import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import client from '../../../socket';
import { Consumer } from '../../../App';

type Props = {

};

class Orders extends React.Component<Props> {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.refreshOrders();
  }

  async refreshOrders() {
    const admin = await client.scope('Admin');
    const orders = await admin.getOrders();
    this.setState({
      orders: Object.keys(orders).map(k => orders[k]).sort((a, b) => b.timestamp - a.timestamp),
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Orders');
          app.getTopBar().setActionButton((<div />));
          return (
            <div>
              <table className="pt-html-table">
                <thead>
                  <th>Table</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Service Charge</th>
                  <th>VAT</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.table}</td>
                      <td>{order.status}</td>
                      <td>{moment(order.timestamp).format('YYYY-MM-DD')}</td>
                      <td>{numeral(order.amount).format('#,###0.00')}</td>
                      <td>{numeral(order.serviceCharge).format('#,###0.00')}</td>
                      <td>{numeral(order.vat).format('#,###0.00')}</td>
                      <td>{numeral(order.amount + order.serviceCharge + order.vat).format('#,###0.00')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Orders;
