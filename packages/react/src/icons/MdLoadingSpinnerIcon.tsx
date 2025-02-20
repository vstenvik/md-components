import React from 'react';
import MdIconProps from './icon.model';

interface MdLoadingIconProps {
  className?: string;
  size?: number;
  [otherProps: string]: unknown;
};

const MdLoadingSpinnerIcon: React.FunctionComponent<MdLoadingIconProps> = ({
  className,
  size = 100,
  ...otherProps
}: MdLoadingIconProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      width={size}
      height={size}
      {...otherProps}
    >
      <circle cx="50" cy="90" r="10" fill="#CCDFDE"/>
      <circle cx="90" cy="50" r="10" fill="#CCDFDE"/>
      <circle cx="10" cy="50" r="10" fill="#CCDFDE"/>
      <circle cx="78" cy="78" r="10" fill="#CCDFDE"/>
      <circle cx="22" cy="78" r="10" fill="#CCDFDE"/>
      <circle cx="50" cy="10" r="10" fill="#005E5D"/>
      <circle cx="78" cy="22" r="10" fill="#CCDFDE"/>
      <circle cx="22" cy="22" r="10" fill="#CCDFDE"/>
    </svg>
  );
};

export default MdLoadingSpinnerIcon;
