// @flow
import React from 'react';
import { Button, Alignment } from '@blueprintjs/core';
import colors from './colors';

type Props = {
  idx: number,
  text: string,
  onClick: () => {},
  active: boolean,
}

const Group = ({ idx, text, onClick, active } : Props) => {
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
};

export default Group;
