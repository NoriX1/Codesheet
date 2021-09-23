import React from 'react';

interface SmallActionButtonProps {
  onClick(): void;
  iconClass: string;
}

const SmallActionButton: React.FC<SmallActionButtonProps> = ({
  onClick,
  iconClass,
}) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={`fas ${iconClass}`} />
      </span>
    </button>
  );
};

export default SmallActionButton;
