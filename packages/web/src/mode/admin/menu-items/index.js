// @flow
import React from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import { Button, Overlay } from '@blueprintjs/core';

import { Consumer } from '../../../App';

import MenuItemForm from './MenuItemForm';

type Props = {
  menuItems: {
    id: string,
    name: string,
    item: string,
    qty: number,
    price: number,
  }
}

class MenuItems extends React.Component<Props> {
  state = {
    editId: null,
  }

  onAdd = () => {
    this.setState({ editId: -1 });
  }

  onEdit = id => () => {
    this.setState({ editId: id });
  }

  hideForm = () => {
    this.setState({
      editId: null,
    });
  }

  render() {
    const { menuItems } = this.props;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Menu Items');
          app.getTopBar().setActionButton((
            <div>
              <Button onClick={this.onAdd}>Add</Button>
              <Overlay
                canEscapeKeyClose
                hasBackdrop={false}
                onClose={this.hideForm}
                isOpen={this.state.editId === -1}
              >
                <MenuItemForm record={{}} close={this.hideForm} />
              </Overlay>
            </div>
          ));

          return (
            <div>
              <table className="pt-html-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(m => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td>{m.item}</td>
                      <td>{m.qty}</td>
                      <td>{m.price}</td>
                      <td>
                        <Button className="pt-small" onClick={this.onEdit(m.id)}>Edit</Button>
                        <Overlay
                          canEscapeKeyClose
                          hasBackdrop={false}
                          onClose={this.hideForm}
                          isOpen={this.state.editId === m.id}
                        >
                          <MenuItemForm record={m} close={this.hideForm} />
                        </Overlay>
                      </td>
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

const mapStateToProps = ({ database }) => ({
  menuItems: schema.all(database.MenuItem).map(t => ({
    ...t,
    item: schema.get(database.Item, t.itemId).name,
  })),
});

export default connect(mapStateToProps)(MenuItems);
