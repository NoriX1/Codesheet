import './add-cell.css';
import React from 'react';
import { useActions } from '../hooks/use-actions';
import AddCellButton from './add-cell-button';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className="add-buttons">
        <AddCellButton
          text="Code"
          onClick={() => insertCellBefore(nextCellId, 'code')}
        />
        <AddCellButton
          text="Text"
          onClick={() => insertCellBefore(nextCellId, 'text')}
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
