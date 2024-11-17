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
    const { isMobile } = useScreenSize();
    const { root, currentObstacle } = useRunner({ isStart });
    const objects: { [key: number]: ReactNode } = {
        0:  <PC width={isMobile ?  130 : 210} />,
        1:  <Graph width={isMobile ? 100 : 180} />,
        2:  <User width={isMobile ? 120 : 220}  />,
        3:  <div data-action="obstacles.pappers" />,
        4:  <Coffee width={isMobile ? 100 : 180} />
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

            <div className={styles.obstacles} data-selector="obstacles">
                <PC width={isMobile ? 130 : 210} />
                <Graph width={isMobile ? 100 : 180} />
                <User width={isMobile ? 120 : 220} />
                <Coffee width={isMobile ? 100 : 180} />

                {/* <div className={classNames(styles.obstacles_item, styles['_'+currentObstacle])} data-action="obstacles.item">
                    
                   
                    <div data-action="obstacles.pappers" />
                </div> */}
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
