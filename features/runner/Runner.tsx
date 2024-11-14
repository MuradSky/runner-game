'use client';
import { memo } from 'react';
import { classNames } from 'utils';

import styles from './Runner.module.scss';
import useRunner from './useRunner';

interface RunnerProps {
    isClear: boolean,
    isStart: boolean,
}

const Runner = ({ isClear, isStart }: RunnerProps) => {
    const { root } = useRunner({ isStart });
    return (
        <div className={styles.block} ref={root}>
            <div className={classNames(styles.ribbon, !isClear && styles.default)}>
                <picture>
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                </picture>
            </div>
            <div className={classNames(styles.person, !isClear && styles.default)} data-selector="game.person" />
        </div>
    );
};

export default memo(Runner);
