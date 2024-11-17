import { useEffect, useState, useRef } from 'react';
import useStore from 'store';
import { data } from './data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const useWinModal = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const {
        chooseHero,
        coins,
        isGameFinish,
        isGamePaused,
        isGameOver,
        addResumeGame,
        addOpenResult,
        isOpenResult
    } = useStore(state => state);
    const [current, setCurrent] = useState<typeof data.maks | null>(null);
    const [scene, setScene] = useState<null | number>(null);

    useEffect(() => {
        if (isOpenResult) {
            setScene(null);
            setCurrent(null);
        }
    }, [isOpenResult]);

    useGSAP(() => {
        if (root.current) {
            if (isGamePaused && !isGameOver) {
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
        dependencies: [isGamePaused, coins, isGameFinish]
    });
    
    useEffect(() => {
        if (coins > 0) {
            setScene(coins - 1);
        }
    }, [coins]);

    useEffect(() => {
        if (chooseHero === 'maks') {
            setCurrent(data.maks); 
        }
        if (chooseHero === 'rom') {
            setCurrent(data.rom); 
        }
        if (chooseHero === 'ann') {
            setCurrent(data.ann); 
        }
    }, [chooseHero]);

    const onClick = () => {
        if (!isGameFinish) addResumeGame();
        else addOpenResult(true);
        if (isGameFinish && root.current) {
            gsap.to(root.current, {
                opacity: 0,
                display: 'none',
            });
        }
    };

    return {
        onClick,
        root,
        current,
        scene,
        hero: chooseHero,
    };
};

export default useWinModal;