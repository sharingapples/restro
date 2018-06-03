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
    categoryId: string,
    unit: string,
    threshold: number,
  },
  categories: Array<{}>,
  close: () => {},
}

class ItemForm extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.updateName = this.update('name');
    this.updatecategoryId = this.update('categoryId');
    this.updateUnit = this.update('unit');
    this.updateThreshold = this.update('threshold');
  }

  state = {
    id: this.props.record.id,
    name: this.props.record.name,
    categoryId: this.props.record.categoryId,
    unit: this.props.record.unit,
    threshold: this.props.record.threshold,
  };


  onSave = async () => {
    const admin = await client.scope('Admin');
    try {
      await admin.updateItem(this.state);
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
    const { categories } = this.props;
    const { name, categoryId, unit, threshold } = this.state;

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
          <Label text="Item name">
            <InputGroup type="text" name="name" value={name} onChange={this.updateName} />
          </Label>
          <Label text="Category">
            <div className="pt-select">
              <select name="categoryId" onChange={this.updatecategoryId} defaultValue={categoryId}>
                <option value={0}>Choose a category...</option>
                { categories.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
          </Label>
          <Label text="Unit">
            <InputGroup type="text" name="unit" value={unit} onChange={this.updateUnit} />
          </Label>
          <Label text="Threshold">
            <InputGroup type="text" name="threshold" value={threshold} onChange={this.updateThreshold} />
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
  categories: schema.all(database.Category),
});

export default connect(mapStateToProps)(ItemForm);
