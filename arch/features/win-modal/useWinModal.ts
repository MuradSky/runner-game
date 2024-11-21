import { useEffect, useState, useRef } from 'react';
import useStore from 'store';
import { data } from './data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LottiePlayer, AnimationItem } from 'lottie-web';

const useWinModal = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const {
        openWinModal,
        chooseHero,
        coins,
        isGameFinish,
        isGamePaused,
        isGameOver,
        addResumeGame,
        isOpenResult,
        addOpenWinModal
    } = useStore(state => state);
    const [current, setCurrent] = useState<typeof data.maks | null>(null);
    const [scene, setScene] = useState<null | number>(null);
    useEffect(() => {
        if (isOpenResult) {
            setScene(null);
            setCurrent(null);
        }
    }, [isOpenResult]);
    
    useEffect(() => {
        const lottie: LottiePlayer = require('lottie-web');
        let animate: AnimationItem | null = null;
        const anim = root.current?.querySelector('[data-action="coin.anim"]') as HTMLDivElement;

        (current && current[scene || 0].icon, current, scene);

        if (current) {
            animate = lottie.loadAnimation({
                container: anim,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: current[scene || 0].icon
            });
        }
        
        return () => {
            animate?.destroy();
            animate = null;
        };
    }, [current, scene]);

    useGSAP(() => {
        if (root.current) {
            if (isGamePaused && !isGameOver) {
                gsap.to(root.current, {
                    opacity: 1,
                    display: 'block',
                    delay: .5,
                });
            } else {
                gsap.to(root.current, {
                    opacity: 0,
                    display: 'none',
                });
            }
        }
    }, {
        scope: root,
        dependencies: [isGamePaused, coins, isGameFinish]
    });
    
    useGSAP(() => {
        if (root.current) {
            if (openWinModal[0]) {
                gsap.to(root.current, {
                    opacity: 1,
                    display: 'block',
                });
            } else {
                gsap.to(root.current, {
                    opacity: 0,
                    display: 'none',
                });
            }
        }
    }, {
        scope: root,
        dependencies: [openWinModal]
    });

    useEffect(() => {
        if (coins > 0) {
            setScene(coins - 1);
        }
    }, [coins, openWinModal]);

    useEffect(() => {
        if (openWinModal[1]) {
            setScene((openWinModal[1] as number) - 1);
        }
    }, [coins, openWinModal]);

    useEffect(() => {
        if (chooseHero === 'maks' || openWinModal[0] === 'maks') {
            setCurrent(data.maks); 
        }
        if (chooseHero === 'rom' || openWinModal[0] === 'rom') {
            setCurrent(data.rom); 
        }
        if (chooseHero === 'ann' || openWinModal[0] === 'ann') {
            setCurrent(data.ann); 
        }
    }, [chooseHero, openWinModal]);

    const onClick = () => {
        if (isGameFinish && root.current) {
            gsap.to(root.current, {
                opacity: 0,
                display: 'none',
                onComplete() {
                    addOpenWinModal();
                }
            });
        }

        if (openWinModal[0]) {
            setScene(null);
            setCurrent(null);
            return;
        }

        addResumeGame();
    };

    return {
        onClick,
        root,
        current,
        scene,
        hero: chooseHero,
        isClosed: !!openWinModal[0]
    };
};

export default useWinModal;