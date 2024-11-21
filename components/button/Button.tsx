import { memo, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';
import { classNames } from 'utils';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    text?: string;
    cssClass?: string,
}

const Button = ({ 
    text,
    children,
    cssClass,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={
                classNames(styles.button, cssClass)
            }
            {...props}
        >
            {text} 
            {children}
        </button>
    );
};

export default memo(Button);
