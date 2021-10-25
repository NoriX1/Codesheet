import React from 'react';

interface AddCellButtonProps {
  text: string;
  onClick(): void;
}

const AddCellButton: React.FC<AddCellButtonProps> = ({ text, onClick }) => {
  return (
    <button className="button is-rounded is-primary is-small" onClick={onClick}>
      <span className="icon is-small">
        <i className="fas fa-plus" />
      </span>
      <span>{text}</span>
    </button>
  );
};

export default AddCellButton;
