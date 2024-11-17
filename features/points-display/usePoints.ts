import { useRef, useState } from 'react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import useStore from 'store';
import coinJson from 'assets/icons/icon_appears.json';
import styles from './Pointsdisplay.module.scss';

const usePoints = () => {
    const { coins, addIsPause } = useStore();
    const root = useRef<HTMLDivElement | null>(null);
    const [animate, setAnimate] = useState<AnimationItem>();

    useGSAP(() => {
        const lottie: LottiePlayer = require('lottie-web');
        const addCoin = root.current?.querySelector('[data-selector="coin.add"]');
        const animate = lottie.loadAnimation({
            container: addCoin as HTMLDivElement,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: coinJson,
        });
        animate.goToAndStop(0, true);
        setAnimate(animate);
    }, {
        scope: root,
    });



    useGSAP(() => {
        const addCoin = root.current?.querySelector('[data-selector="coin.add"]') as HTMLDivElement;
        const point1 = root.current?.querySelector('[data-selector="point.1"]') as HTMLDivElement;
        const point2 = root.current?.querySelector('[data-selector="point.2"]') as HTMLDivElement;
        const point3 = root.current?.querySelector('[data-selector="point.3"]') as HTMLDivElement;

        if (coins > 0 && root.current && animate) {
            const pointRect = ((coins < 2 ? point1 : (coins > 1 && coins < 3) ? point2 : point3) as HTMLDivElement)
                .getBoundingClientRect();

            animate.goToAndPlay(0, true); 
            gsap.to(addCoin, {
                duration: 1,
                delay: .1,
                ease: 'elastic.out(1, 0.3)'
            });

            gsap.to(addCoin, {
                delay: .5,
                y: (pointRect.y + pointRect.height) - window.innerHeight,
                x: (pointRect.x + pointRect.width) - window.innerWidth,
                duration: 1,
                onComplete() {
                    ((coins < 2 ? point1 : (coins > 1 && coins < 3) ? point2 : point3) as HTMLDivElement)
                        .classList.add(styles.is_active);
                    const timeOut = setTimeout(() => {
                        clearTimeout(timeOut);
                        addIsPause();
                    }, 100);
                    animate.goToAndStop(0, true);
                    gsap.set(addCoin, {
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

    return {
        root
    };
};

export default usePoints;