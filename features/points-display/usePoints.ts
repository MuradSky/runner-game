import { useRef, useEffect } from 'react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import useStore from 'store';
import styles from './Pointsdisplay.module.scss';
import { data, icons } from './data';

const usePoints = () => {
    const { coins, chooseHero, addIsPause } = useStore();
    const root = useRef<HTMLDivElement | null>(null);
    const animate = useRef<AnimationItem | null>(null);
    const lottie = useRef<LottiePlayer | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lottie.current = require('lottie-web');
        }
        return () => {
            if (lottie.current) {
                lottie.current.destroy();
            }
        };
    }, []);

    useGSAP(() => {
        const addCoin = root.current?.querySelector('[data-selector="coin.add"]') as HTMLDivElement;
        const point1 = root.current?.querySelector('[data-selector="point.1"]') as HTMLDivElement;
        const point2 = root.current?.querySelector('[data-selector="point.2"]') as HTMLDivElement;
        const point3 = root.current?.querySelector('[data-selector="point.3"]') as HTMLDivElement;

        if (coins > 0 && root.current && animate) {
            const pointRect = ((coins < 2 ? point1 : (coins > 1 && coins < 3) ? point2 : point3) as HTMLDivElement)
                .getBoundingClientRect();
            loadAnimate(chooseHero as string);

            gsap.to(addCoin, {
                scale: 2,
                opacity: 1,
                duration: 1,
                delay: .1,
                ease: 'elastic.out(1, 0.3)'
            });

            gsap.to(addCoin, {
                delay: .5,
                y: (pointRect.y + pointRect.height) - window.innerHeight,
                x: ((pointRect.x + pointRect.width) - window.innerWidth),
                duration: 1,
                scale: 1,
                onComplete() {
                    ((coins < 2 ? point1 : (coins > 1 && coins < 3) ? point2 : point3) as HTMLDivElement)
                        .classList.add(styles.is_active);
                    const timeOut = setTimeout(() => {
                        clearTimeout(timeOut);
                        addIsPause();
                    }, 100);
                    gsap.set(addCoin, {
                        opacity: 0,
                        scale: 1,
                        y: -120,
                        x: '-20vw',
                    });
                }
            });
        }
    }, {
        scope: root,
        dependencies: [coins]
    });

    const loadAnimate = (key: string ) => {
        const addCoin = root.current?.querySelector('[data-selector="coin.add"]');
        const jsonData = data[key][coins-1];
        
        if (animate.current) {
            animate.current.destroy();
        }

        if (addCoin && lottie.current) {
            animate.current = lottie.current?.loadAnimation({
                container: addCoin as HTMLDivElement,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: jsonData,
            });
        }

        return () => animate.current?.destroy();
    };

    return {
        root,
        icons: icons[chooseHero as string],
    };
};

export default usePoints;