import { memo, HTMLAttributes } from 'react';

import styles from './Text.module.scss';
import { classNames } from 'utils';

interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLElement>, 'className'> {
    cssClass?: string;
}

const Text = ({ children, cssClass, ...props }: TextProps) => {
    return (
        <p className={classNames(styles.block, cssClass)} {...props}>
            {children}
        </p>
    );
};

export default memo(Text);
