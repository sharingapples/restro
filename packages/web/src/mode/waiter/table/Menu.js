// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button, Intent, Alignment, Popover } from '@blueprintjs/core';
import numeral from 'numeral';

import colors from './colors';
import './menu.css';
import createItemTree from './_createItemTree';

const Group = ({ idx, text, onClick, active }) => {
  const color = colors[idx % colors.length];
  return (
    <Button
      alignText={Alignment.LEFT}
      fill
      style={{
        color: 'white',
        backgroundImage: 'none',
        boxShadow: 'none',
        backgroundColor: color,
        border: `3px solid ${color}`,
        borderColor: active ? 'black' : color,
        margin: '2px',
        padding: '8px',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>
    </Button>
  );
}

const Item = ({ grpIdx, text, onIncrease, onDecrease, qty }) => {
  const color = colors[grpIdx % colors.length];
  return (
    <Button
      onClick={onIncrease}
      alignText={Alignment.CENTER}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundColor: color,
        backgroundImage: 'none',
        margin: '2px',
        padding: '4px',
        borderRadius: '10px',
        height: '70px',
        width: '70px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '13px' }}>{text}</span>
      {!!qty &&
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: '3px',
            bottom: '3px',
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            backgroundColor: 'black',
            boxShadow: 'none',
            backgroundImage: 'none',
            color: 'white',
            fontSize: '9px',
          }}
        >
          {qty}
        </div>
      }
    </Button>
  );
};

class Menu extends Component {
  state = {
    selectedCatIdx: 0,
    selectedGroups: this.props.categories.map(cat => 0),
    chosenItems: {},
  };

  render() {
    const { categories } = this.props;
    const { selectedCatIdx, selectedGroups, chosenItems } = this.state;

    const selectedCat = categories[selectedCatIdx];
    const selectedGroupIdx = selectedGroups[selectedCatIdx];
    const selectedGroup = selectedCat.groups[selectedGroupIdx];
    const menuItems = selectedGroup.items;

    const allItems = categories.reduce((res, cat) => {
      return cat.groups.reduce((r, grp) => {
        return grp.items.reduce((rr, item) => {
          rr[item.id] = item;
          return rr;
        }, r);
      }, res);
    }, {});

    const increase = id => () => {
      const chosen = Object.assign({}, chosenItems);
      chosen[id] = (chosen[id] || 0) + 1;
      this.setState({ chosenItems: chosen });
    };

    const decrease = id => () => {
      const chosen = Object.assign({}, chosenItems);
      chosen[id] = (chosen[id] || 0) - 1;
      if (chosen[id] <= 0) {
        delete chosen[id];
      }
      this.setState({ chosenItems: chosen });
    };

    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div>
          <ButtonGroup fill large>
            { categories.map((cat, idx) => (
              <Button
                key={cat.id}
                intent={Intent.PRIMARY}
                text={cat.title}
                active={idx === selectedCatIdx}
                onClick={() => this.setState({
                  selectedCatIdx: idx,
                })}
              />
            ))}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', flex: 3 }}>
          <div style={{ display: 'flex', flex: 1, padding: '3px', flexDirection: 'column', overflowY: 'scroll' }}>
            {selectedCat.groups.map((grp, idx) => (
              <Group
                key={grp.id}
                idx={idx}
                text={grp.title}
                active={grp === selectedGroup}
                onClick={() => this.setState({
                  selectedGroups: selectedGroups.map((g, i) => (i !== selectedCatIdx ? g : idx)),
                })}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flex: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'flex-start',
              justifyContent: 'space-around',
              overflowY: 'scroll'
            }}
          >
            {menuItems.map(item => (
              <Item
                key={item.id}
                grpIdx={selectedGroupIdx}
                text={item.title}
                qty={chosenItems[item.id] || 0}
                onIncrease={increase(item.id)}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            height: '100px',
            backgroundColor: '#ccc',
            borderRadius: '5px',
            padding: '4px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              overflowY: 'scroll',
            }}
          >
            {Object.keys(chosenItems).map((id) => {
              const item = allItems[id];
              const qty = chosenItems[id];

              return (
                <Popover
                  key={item.id}
                  position="top"
                  transitionDuration={0}
                  modifiers={{ preventOverflow: { boundariesElement: 'window' }}}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: '3px',
                      height: '28px',
                      padding: '4px',
                      margin: '1px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title} - {qty}
                  </div>
                  <div style={{ padding: '8px', textAlign: 'center'}}>
                    <h4>{item.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', minWidth: '150px' }}>
                      <Button onClick={decrease(item.id)} large text="-" intent={Intent.DANGER} />
                      <span style={{ fontSize: '18px' }}>{qty}</span>
                      <Button onClick={increase(item.id)} large text="+" intent={Intent.SUCCESS} />
                    </div>
                  </div>
                </Popover>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <h4>TOTAL</h4>
            <p>
              {numeral(Object.keys(chosenItems).reduce((total, id) => total + (allItems[id].price * chosenItems[id]), 0)).format('0,0.00')}
            </p>
            <Button
              active={Object.keys(chosenItems).length > 0}
              onClick={async () => {
                await this.props.onConfirm(Object.keys(chosenItems).map(id => ({ id, qty: chosenItems[id] })));
                this.setState({
                  chosenItems: {},
                });
              }}
              intent={Intent.PRIMARY}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ database }) => ({
  categories: createItemTree(database),
});

export default connect(mapStateToProps)(Menu);
