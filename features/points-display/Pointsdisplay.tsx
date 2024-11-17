import { memo } from 'react';

import usePoints from './usePoints';

import Coin from 'assets/icons/icon.svg';
import Check from 'assets/svg/checkmark.svg';
import styles from './Pointsdisplay.module.scss';

const Pointsdisplay = () => {
    const { root } = usePoints();
    return (
        <div ref={root}>
            <div className={styles.block}>
                <div className={styles.wrap}>
                    <div className={styles.item} data-selector="point.1">
                        <Coin className={styles.coin} />
                        <Check className={styles.check} />
                    </div>
                    <span></span>
                    <div className={styles.item} data-selector="point.2">
                        <Coin className={styles.coin} />
                        <Check className={styles.check} />
                    </div>
                    <span></span>
                    <div className={styles.item} data-selector="point.3">
                        <Coin className={styles.coin} />
                        <Check className={styles.check} />
                    </div>
                </div>
            </div>
            <div className={styles.add} data-selector="coin.add" />
        </div>
    );
};

export default memo(Pointsdisplay);
