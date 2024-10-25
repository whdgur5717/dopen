import { forwardRef } from 'react';

import {
  Button as StyledButton,
  type ButtonProps as StyledButtonProps,
} from './styled/button';

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends StyledButtonProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { loading, disabled, children, ...rest } = props;

    const trulyDisabled = loading || disabled;

    return (
      <StyledButton disabled={trulyDisabled} ref={ref} {...rest}>
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';
