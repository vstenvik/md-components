import React from 'react';
import classnames from 'classnames';

import MdHelpIcon from '../icons/MdHelpIcon64';

export interface MdHelpButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  expanded: boolean;
  hideArrow?: boolean;
  className?: string;
};

const MdHelpButton: React.FunctionComponent<MdHelpButtonProps> = ({
  onClick,
  className,
  expanded = false,
  hideArrow = false,
  ...otherProps
}: MdHelpButtonProps) => {
  const buttonClasses = classnames('md-helpbutton', className, {
    'md-helpbutton--expanded': !!expanded,
    'md-helpbutton--noarrow': !!hideArrow
  });

  return (
    <button
      {...otherProps}
      className={buttonClasses}
      onClick={onClick}
    >
      <MdHelpIcon className="md-helpbutton__icon" />
    </button>
  );
}

export default MdHelpButton;
