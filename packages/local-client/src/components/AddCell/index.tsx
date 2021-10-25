import './styles.css';
import React from 'react';
import { useActions } from '../../hooks/use-actions';
import AddCellButton from '../AddCellButton';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className="add-buttons">
        <AddCellButton
          text="Code"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        />
        <AddCellButton
          text="Text"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
