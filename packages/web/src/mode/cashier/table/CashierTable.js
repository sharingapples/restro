/* globals window */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import schema from 'restro-common/schema';
import { getRestro } from 'restro-common/selectors';

import numeral from 'numeral';

import { Consumer } from '../../../App';
import client from '../../../socket';

const SumRow = (({ caption, value }) : { caption: string, value: number }) => (
  <tr>
    <td colSpan="4" style={{ padding: '3px', textAlign: 'right', fontWeight: 'bold' }}>{caption}</td>
    <td style={{ padding: '3px', textAlign: 'right' }}>{numeral(value).format('#,##0.00')}</td>
    <td style={{ padding: '3px' }} />
  </tr>
);

type Props = {
  restro: { serviceCharge: number },
  getMenuItem: () => {},
  table: {
    items: Array<>,
  }
}

class CashierTable extends React.Component<Props> {
  cancelOrder = async () => {
    const { table } = this.props;
    const cashier = await client.scope('Cashier');

    const remark = '';

    await cashier.cancelOrder(table.id, remark);
    // Move to home page after cancelation
    window.history.back();
  }

  printOrder = async () => {
    const { table } = this.props;
    const cashier = await client.scope('Cashier');

    await cashier.printOrder(table.id);
  }

  cancelItem = async (id) => {
    const { table } = this.props;
    const cashier = await client.scope('Cashier');

    await cashier.cancelItem(table.id, id);
  }

  render() {
    const { getMenuItem, restro } = this.props;

    const tbl = this.props.table;
    const active = tbl.items && tbl.items.length > 0;
    const subTotal = tbl.items.reduce((res, item) => res + (item.qty * item.rate), 0);
    const serviceCharge = subTotal * restro.serviceCharge;
    const vat = (subTotal + serviceCharge) * restro.vat;
    const total = subTotal + serviceCharge + vat;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle(`Table ${tbl.number}`);
          app.getTopBar().setActionButton((
            <Button onClick={() => window.history.back()}>Back</Button>
          ));

          return (
            <div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px',
                }}
              >
                <h4 style={{ display: 'flex', flex: 1 }}>Total: {numeral(total).format('#,##0')}</h4>
                <Button onClick={this.cancelOrder} intent={Intent.DANGER} disabled={!active}>
                  Cancel Order
                </Button>
                <Button onClick={this.printOrder} intent={Intent.PRIMARY} disabled={!active}>
                  Print
                </Button>
              </div>
              <table className="pt-html-table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th align="left">Items ({tbl.items.length})</th>
                    <th>Rate</th>
                    <th align="center">Qty</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  { tbl.items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td align="left">{getMenuItem(item.menuItemId).name}</td>
                      <td>{numeral(item.rate).format('#,##0')}</td>
                      <td align="center">{item.qty}</td>
                      <td align="right">{numeral(item.rate * item.qty).format('#,##0')}</td>
                      <td><Button onClick={() => this.cancelItem(item.id)} className="pt-small" intent={Intent.DANGER}>Cancel</Button></td>
                    </tr>
                  ))}
                  <SumRow caption="Sub Total" value={subTotal} />
                  <SumRow caption="Service Charge" value={serviceCharge} />
                  <SumRow caption="VAT" value={vat} />
                  <SumRow caption="Total" value={total} />
                </tbody>
              </table>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ account, database }, ownProps) => {
  const { id } = ownProps.match.params;

  return {
    restro: getRestro(account),
    table: schema.get(database.Table, id),
    getMenuItem: itemId => schema.get(database.MenuItem, itemId),
  };
};

export default connect(mapStateToProps)(CashierTable);
