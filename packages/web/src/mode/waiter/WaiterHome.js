// @flow
import React from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import TableIcon from './TableIcon';
import { Consumer } from '../../App';

type Table = {
  id: string,
  status: string,
};

type Props = {
  tables: Array<Table>,
}

const Home = ({ tables }: Props) => (
  <Consumer>
    {(app) => {
      app.getTopBar().setTitle('Select Table');
      app.getTopBar().setActionButton(null);
      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px',
            alignContent: 'flex-start',
            justifyContent: 'space-around',
          }}
        >
          {tables.map(t => <TableIcon key={t.id} id={t.id} number={t.number} status={t.status} />)}
        </div>
      );
    }}
  </Consumer>
);

const mapStateToProps = ({ database }) => ({
  tables: schema.all(database.Table),
});

export default connect(mapStateToProps)(Home);
