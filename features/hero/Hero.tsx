'use client';
import { memo } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { EffectFade } from 'swiper/modules';

import { classNames } from 'utils';
import useHero from './useHero';
import Scene from 'features/scene';
import Game from 'features/game';
import Button from 'components/button';
import Text from 'components/text';
import Winmodal from 'features/win-modal';
import Result from 'features/result';

import styles from './Hero.module.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = () => {
    const {
        setSwiper,
        onNext,
        root,
        isPreview
    } = useHero();

    return (
        <section className={styles.block}>
            <Swiper
                allowTouchMove={false} 
                modules={[EffectFade]}
                spaceBetween={32}
                effect="fade"
                speed={1000}
                fadeEffect={{ crossFade: true }}
                onSwiper={(swiper: SwiperClass) => setSwiper(swiper)}
                className={styles.view}
                
            >
                <SwiperSlide className={styles.item} data-selector="onboard">
                    <div className={classNames(styles.content, isPreview && styles.static)} ref={root}>
                        <h1 data-selector="content.title">
                            пОМОГИ герою <br /> внедрить геймификацию <br /> и решить свои проблемы
                        </h1>
                        <Text cssClass={styles.text} data-selector="content.text">
                            Выбери своего героя, найди гипотезы для решения его бизнес-задач и
                            получи консультацию по внедрению результативной геймификации
                        </Text>
                        <Button cssClass={styles.btn} onClick={onNext} text="К игре"/>
                    </div>

                    <div className={styles.main_bg}>
                        <picture className={styles.user}>
                            <source media="(max-width: 768px)" srcSet="/images/user-m.webp" />
                            <img src="/images/user.webp" alt="" />
                        </picture>
                        <picture>
                            <img
                                src="/images/main.webp"
                                alt=''
                            />
                        </picture>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.item} data-selector="onboard">
                    <Scene />
                </SwiperSlide>
                <SwiperSlide className={styles.item} data-selector="onboard">
                    <Game />
                </SwiperSlide>
            </Swiper>

            <Winmodal />
            <Result />
        </section>
    );
};

export default memo(Hero);
