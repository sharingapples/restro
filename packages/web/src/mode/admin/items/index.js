// @flow
import React from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import { Button, Overlay } from '@blueprintjs/core';

import { Consumer } from '../../../App';
import ItemForm from './ItemForm';

type Props = {
  items: Array<{}>,
}

class Items extends React.Component<Props> {
  state = {
    editId: null,
  }

  onEdit = id => () => {
    this.setState({
      editId: id,
    });
  }

  hideForm = () => {
    this.setState({
      editId: null,
    });
  }

  render() {
    const { items } = this.props;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Items');
          app.getTopBar().setActionButton((
            <div>
              <Button onClick={this.onEdit(-1)}>Add</Button>
              <Overlay
                canEscapeKeyClose
                hasBackdrop={false}
                onClose={this.hideForm}
                isOpen={this.state.editId === -1}
              >
                <ItemForm record={{}} close={this.hideForm} />
              </Overlay>
            </div>
          ));

          return (
            <div>
              <table className="pt-html-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Unit</th>
                    <th>Threshold</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.stock}</td>
                      <td>{item.unit}</td>
                      <td>{item.threshold}</td>
                      <th>
                        <Button onClick={this.onEdit(item.id)}>Edit</Button>
                        <Overlay
                          canEscapeKeyClose
                          hasBackdrop={false}
                          onClose={this.hideForm}
                          isOpen={this.state.editId === item.id}
                        >
                          <ItemForm record={item} close={this.hideForm} />
                        </Overlay>
                      </th>
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
  items: schema.all(database.Item).map(item => ({
    ...item,
    category: schema.get(database.Category, item.categoryId).name,
  })),
});

export default connect(mapStateToProps)(Items);
