import './action-bar.css';
import React from 'react';
import { useActions } from '../hooks/use-actions';
import SmallActionButton from './small-action-button';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <SmallActionButton
        onClick={() => {
          moveCell(id, 'up');
        }}
        iconClass="fa-arrow-up"
      />
      <SmallActionButton
        onClick={() => {
          moveCell(id, 'down');
        }}
        iconClass="fa-arrow-down"
      />
      <SmallActionButton
        onClick={() => {
          deleteCell(id);
        }}
        iconClass="fa-times"
      />
    </div>
  );
};

export default ActionBar;
