import React, { useState, useRef, useEffect } from "react";
import autoAnimate from '@formkit/auto-animate';
import classnames from 'classnames';

import MdInfoIcon from "../icons/MdInfoIcon";
import MdWarningIcon from "../icons/MdWarningIcon";
import MdCancelIcon from "../icons/MdCancelIcon";

type ThemeTypes = null | undefined | '' | 'primary' | 'secondary' | 'warning' | 'danger';
type IconTypes = null | undefined | '' | 'none' | 'info' | 'warning' | 'error' | 'custom';

interface MdInfoTagProps {
  theme?: ThemeTypes;
  keepOpen?: boolean;
  label?: string;
  icon?: IconTypes;
  customIcon?: React.ReactNode;
};

const MdInfoTag: React.FC<MdInfoTagProps> = ({
  theme = 'primary',
  keepOpen = false,
  icon = 'none',
  customIcon = null,
  label
}: MdInfoTagProps) => {
  const [hover, setHover] = useState(false);
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const classNames = classnames('md-info-tag', {
    'md-info-tag--secondary': theme === 'secondary',
    'md-info-tag--warning': theme === 'warning',
    'md-info-tag--danger': theme === 'danger'
  });

  const renderIcon = () => {
    if (icon === 'custom' && customIcon && customIcon !== '') {
      return customIcon;
    } else {
      if (icon === 'info') {
        return <MdInfoIcon />;
      } else if (icon === 'warning') {
        return <MdWarningIcon />;
      } else if (icon === 'error') {
        return <MdCancelIcon />
      } else {
        return null;
      }
    }
  }

  return (
    <div
      className={classNames}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={parent}
    >
      {(hover || keepOpen) &&
        <div className="md-info-tag__label">{label}</div>
      }

      <div className="md-info-tag__icon">
        {renderIcon()}
      </div>
    </div>
  );
}

export default MdInfoTag;
