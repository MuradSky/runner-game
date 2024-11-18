'use client';
import { memo, ReactNode } from 'react';
import { classNames } from 'utils';

import PointsDisplay from 'features/points-display';
import useRunner from './useRunner';
import Button from 'components/button';

import Jump from 'assets/svg/jump.svg';
import PC from 'assets/obj/pc-yt.svg';
import Graph from 'assets/obj/graph.svg';
import User from 'assets/obj/user.svg';
import Coffee from 'assets/obj/coffee.svg';

import styles from './Runner.module.scss';
import { useScreenSize } from 'hooks';
interface RunnerProps {
    isClear: boolean,
    isStart: boolean,
}

const Runner = ({ isClear, isStart }: RunnerProps) => {
    const { isMobile, isLaptop, isMobileSm } = useScreenSize();
    const { root, currentObstacle } = useRunner({ isStart });
    const objects: { [key: number]: ReactNode } = {
        0:  <PC width={isMobileSm  ? 100  : isMobile ?  130 : isLaptop ? 160 : 220} />,
        1:  <Graph width={isMobileSm ? 90 : isMobile ? 120 : isLaptop ? 130 : 170} />,
        2:  <User width={isMobileSm ? 120 : isMobile ? 140 : isLaptop ? 160 :  220}  />,
        3:  <div data-action="obstacles.pappers" />,
        4:  <Coffee width={isMobileSm ? 90 : isMobile ? 120 : isLaptop ? 130 : 180} />
    };
    return (
        <div className={styles.block} ref={root}>
            <PointsDisplay />
            <div className={classNames(styles.ribbon, !isClear && styles.default)}>
                <picture>
                    <img src={isMobile ? '/images/ribbon-m.webp' : '/images/ribbon.webp'} alt="" data-selector="game.bg" />
                    <img src={isMobile ? '/images/ribbon-m.webp' : '/images/ribbon.webp'} alt="" data-selector="game.bg" />
                </picture>
            </div>

            <div className={styles.obstacles}>
                <div className={classNames(styles.obstacles_item, styles['_'+currentObstacle])} data-action="obstacles.item">
                    { objects[currentObstacle] }
                </div>
            </div>

            <div
                className={classNames(styles.person, !isClear && styles.default)}
                data-selector="game.person"
            />

            <div className={styles.finish} data-action="finish">
                <img src="/finish/left-flag.png" alt="" className={styles.left} />
                <img src="/finish/finish-line.png" alt="" className={styles.line} />
                <img src="/finish/left-flag.png" alt="" className={styles.right} />
            </div>

            <div className={styles.jump}>
                <Button data-action="jump.push">
                    <Jump />
                </Button>
            </div>
        </div>
    );
};

export default memo(Runner);
