// @flow
import React from 'react';
import { InputGroup, Label, Button, Intent } from '@blueprintjs/core';
import schema from 'restro-common/schema';
import { connect } from 'react-redux';

import client from '../../../socket';

type Props = {
  record: {
    id: string,
    name: string,
    itemId: string,
    qty: number,
    price: number,
  },
  items: Array<{}>,
  close: () => {},
}

class MenuItemForm extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateName = this.update('name');
    this.updateItemId = this.update('itemId');
    this.updateQty = this.update('qty');
    this.updatePrice = this.update('price');
  }

  state = {
    id: this.props.record.id,
    name: this.props.record.name,
    itemId: this.props.record.itemId,
    qty: this.props.record.qty,
    price: this.props.record.price,
  };


  onSave = async () => {
    const admin = await client.scope('Admin');
    try {
      await admin.updateMenuItem(this.state);
      this.props.close();
    } catch (err) {
      console.error(err);
    }
  }

  update(name) {
    return (e) => {
      this.setState({
        [name]: e.target.value,
      });
    };
  }

  render() {
    const { items } = this.props;
    const { name, itemId, qty, price } = this.state;

    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', backgroundColor: 'white', marginTop: '50px', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', maxWidth: '400px' }}>
          <Label text="Menu name">
            <InputGroup type="text" name="name" value={name} onChange={this.updateName} />
          </Label>
          <Label text="Item">
            <div className="pt-select">
              <select name="itemId" onChange={this.updateItemId} defaultValue={itemId}>
                <option value={0}>Choose an item...</option>
                { items.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
          </Label>
          <Label text="Qty">
            <InputGroup type="text" name="qty" value={qty} onChange={this.updateQty} />
          </Label>
          <Label text="Price">
            <InputGroup type="text" name="price" value={price} onChange={this.updatePrice} />
          </Label>
        </div>
        <div>
          <Button onClick={this.onSave} intent={Intent.PRIMARY}>Save</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ database }) => ({
  items: schema.all(database.Item),
});

export default connect(mapStateToProps)(MenuItemForm);
