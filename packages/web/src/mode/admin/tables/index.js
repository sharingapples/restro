// @flow
import React from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import { Button, Overlay } from '@blueprintjs/core';

import { Consumer } from '../../../App';
import TableForm from './TableForm';

type Props = {
  tables: Array<{
    id: string,
    number: string,
    status: string,
    items: Array<{}>
  }>
}

class Tables extends React.Component<Props> {
  state = {
    editId: null,
  }

  onEdit = tableId => () => {
    this.setState({
      editId: tableId,
    });
  }

  onAdd = () => {
    this.setState({
      editId: -1,
    });
  }

  hideForm = () => {
    this.setState({
      editId: null,
    });
  }

  render() {
    const { tables } = this.props;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Tables');
          app.getTopBar().setActionButton((
            <div>
              <Button onClick={this.onAdd}>Add</Button>
              <Overlay
                canEscapeKeyClose
                hasBackdrop={false}
                onClose={this.hideForm}
                isOpen={this.state.editId === -1}
              >
                <TableForm record={{}} close={this.hideForm} />
              </Overlay>
            </div>
          ));

          return (
            <div>
              <table className="pt-html-table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {tables.map(tbl => (
                    <tr key={tbl.id}>
                      <td>{tbl.number}</td>
                      <td>{tbl.status}</td>
                      <td>{tbl.items.length}</td>
                      <td>
                        <Button className="pt-small" onClick={this.onEdit(tbl.id)}>Edit</Button>
                        <Overlay
                          canEscapeKeyClose
                          hasBackdrop={false}
                          onClose={this.hideForm}
                          isOpen={this.state.editId === tbl.id}
                        >
                          <TableForm record={tbl} close={this.hideForm} />
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
  tables: schema.all(database.Table),
});

export default connect(mapStateToProps)(Tables);
