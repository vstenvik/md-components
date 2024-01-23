import classnames from 'classnames';
import React, { forwardRef } from 'react';

export interface MdLinkProps {
  children?: string | React.ReactNode;
  href?: string;
  onClick?(_e: React.MouseEvent): void;
}

const MdLink = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MdLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ href, children, onClick, ...otherProps }, ref) => {
  const classNames = classnames('md-link', otherProps.className);
  return href ? (
    <a href={href} {...otherProps} className={classNames} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      {children}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      {...otherProps}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});

MdLink.displayName = 'MdLink';
export default MdLink;
