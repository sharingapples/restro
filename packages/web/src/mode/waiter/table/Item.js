// @flow
import React from 'react';
import { Button, Alignment } from '@blueprintjs/core';
import colors from './colors';

type Props = {
  grpIdx: number,
  text: string,
  onIncrease: () => {},
  qty: number,
};

const Item = ({ grpIdx, text, onIncrease, qty }: Props) => {
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

export default Item;
