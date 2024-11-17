import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useStore from 'store';

import confetiJson from 'assets/icons/confetti.json';

const useResult = () => {
    const { isOpenResult, chooseHero, coins, isGameFinish, isGameOver } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const lottieWeb = require('lottie-web');
        
        const confeti = root.current?.querySelector('[data-selector="confeti"]');

        if (confeti) {
            lottieWeb.loadAnimation({
                container: confeti,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: confetiJson,
            });
        }

        return () => lottieWeb.destroy();
    }, []);
    
    useGSAP(() => {
        if (root.current) {
            if (isOpenResult || isGameOver) {
                gsap.to(root.current, {
                    opacity: 1,
                    display: 'block',
                });
                gsap.to(root.current.nextElementSibling, {
                    opacity: 1,
                    display: 'block',
                });
            } else {
                gsap.to(root.current, {
                    opacity: 0,
                    display: 'none',
                });

                gsap.to(root.current.nextElementSibling, {
                    opacity: 0,
                    display: 'none',
                });
            }
        }
    }, {
        scope: root,
        dependencies: [
            isOpenResult,
            isGameOver,
        ],
    });
    
    return {
        root,
        hero: chooseHero,
        isWin: isGameFinish && coins === 3,
        coins,
    };
};

export default useResult;