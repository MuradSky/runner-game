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
interface RunnerProps {
    isClear: boolean,
    isStart: boolean,
}

const Runner = ({ isClear, isStart }: RunnerProps) => {
    const { root, currentObstacle } = useRunner({ isStart });
    const objects: { [key: number]: ReactNode } = {
        0:  <PC width={180} />,
        1:  <Graph width={180} />,
        2:  <User width={220}  />,
        3:  <div data-action="obstacles.pappers" />,
        4:  <Coffee width={180} />
    };
    return (
        <div className={styles.block} ref={root}>
            <PointsDisplay />
            <div className={classNames(styles.ribbon, !isClear && styles.default)}>
                <picture>
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                </picture>
            </div>

            <div className={styles.obstacles}>
                <div className={classNames(styles.obstacles_item, styles['_'+currentObstacle])} data-action="obstacles.item">
                    { objects[currentObstacle] }
                </div>
            </div>

            <div className={classNames(styles.person, !isClear && styles.default)} data-selector="game.person" />
            <div className={styles.jump}>
                <Button data-action="jump.push">
                    <Jump />
                </Button>
            </div>
        </div>
    );
};

export default memo(Runner);
