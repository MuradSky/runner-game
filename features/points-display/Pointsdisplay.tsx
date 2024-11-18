import { memo } from 'react';

import usePoints from './usePoints';

import Check from 'assets/svg/checkmark.svg';
import styles from './Pointsdisplay.module.scss';

const Pointsdisplay = () => {
    const { root, icons } = usePoints();
    return (
        <div ref={root}>
            <div className={styles.block}>
                <div className={styles.wrap}>
                    <div className={styles.item} data-selector="point.1">
                        <div className={styles.coin}>
                            <img src={icons[0]} alt="" />
                        </div>
                        <Check className={styles.check} />
                    </div>
                    <span></span>
                    <div className={styles.item} data-selector="point.2">
                        <div className={styles.coin}>
                            <img src={icons[1]} alt="" />
                        </div>
                        <Check className={styles.check} />
                    </div>
                    <span></span>
                    <div className={styles.item} data-selector="point.3">
                        <div className={styles.coin}>
                            <img src={icons[2]} alt="" />
                        </div>
                        <Check className={styles.check} />
                    </div>
                </div>
            </div>
            <div className={styles.add} data-selector="coin.add" />
        </div>
    );
};

export default memo(Pointsdisplay);
