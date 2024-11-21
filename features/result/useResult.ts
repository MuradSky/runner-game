import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useStore from 'store';

import confetiJson from 'assets/icons/confetti.json';
import { useScreenSize } from 'hooks';

const useResult = () => {
    const { isMobile } = useScreenSize();
    const {
        isOpenResult,
        chooseHero,
        coins,
        isGameFinish,
        isGameOver,
        addOpenWinModal,
        isGameFail
    } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isMobile) return;
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
    }, [isMobile]);
    
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
    
    const openWin = (n: number) => () => {
        if (coins < n) return;

        if (chooseHero) {
            addOpenWinModal(chooseHero, n);
        }
    };

    return {
        root,
        hero: chooseHero,
        isWin: isGameFinish && coins === 3,
        coins,
        openWin,
        isMobile,
        isGameFail,
    };
};

export default useResult;