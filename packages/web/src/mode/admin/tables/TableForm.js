// @flow
import React from 'react';
import { Label, InputGroup, Button, Intent } from '@blueprintjs/core';
import client from '../../../socket';

type Props = {
  close: () => {},
  record: {
    id: string,
    number: string,
  };
}
class TableForm extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateNumber = this.update('number');
  }

  state = {
    id: this.props.record.id,
    number: this.props.record.number || '',
  };

  onSave = async () => {
    const admin = await client.scope('Admin');
    await admin.updateTable(this.state);
    this.props.close();
  }

  update(name) {
    return (e) => {
      this.setState({
        [name]: e.target.value,
      });
    };
  }

  render() {
    const { number } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
           backgroundColor: 'white',
            marginTop: '50px',
            padding: '20px',
          }}
      >
        <div style={{ backgroundColor: 'white', maxWidth: '400px' }}>
          <Label text="Number">
            <InputGroup type="text" value={number} onChange={this.updateNumber} />
          </Label>
          <Button onClick={this.onSave} intent={Intent.PRIMARY}>Save</Button>
        </div>
      </div>
    );
  }
}

export default TableForm;
