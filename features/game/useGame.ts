import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useStore from 'store';

const useGame = () => {
    const { chooseHero, isOpenResult, isGameOver } = useStore();
    const root = useRef<HTMLDivElement | null>(null);
    const [isStart, setIsStart] = useState(true);
    const [gameStart, setGameStart] = useState(false);
    const [isClear, setIsClear] = useState(false);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (isOpenResult || isGameOver) {
                setIsStart(false);
                setIsClear(false);
            }
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [isOpenResult, isGameOver]);

    useEffect(() => {
        const callBack = (e: KeyboardEvent | PointerEvent) => {
            if (!isShow) return;
            if (
                (e as KeyboardEvent).keyCode === 32
                || (e as KeyboardEvent).keyCode === 38
                || (e as PointerEvent).type === 'pointerdown'
            ) {
                if (chooseHero && !isOpenResult) {
                    setIsStart(true);
                }
            }
        };
        window?.addEventListener('pointerdown', callBack, false);
        window?.addEventListener('keydown', callBack, false);
        return () => {
            window?.removeEventListener('pointerdown', callBack, false);
            window?.removeEventListener('keydown', callBack, false);
        };
    }, [chooseHero, isOpenResult, isShow]);

    useGSAP(() => {
        if (root.current) {            
            if (chooseHero && !isStart) {
                // gsap.to('[data-seletor="game.preview"]', {
                //     y: 0,
                //     opacity: 1,
                //     delay: 1,
                //     onComplete() {
                //         setIsShow(true);
                //     }
                // });
            } else if (isStart) {
                gsap.to('[data-seletor="game.preview"]', {
                    y: '120%',
                    opacity: 0,
                    delay: 0,
                    onComplete() {
                        if (isStart) {
                            setIsClear(true);
                            setGameStart(true);
                        }
                    }
                });
            }
        }
    }, {
        scope: root,
        dependencies: [chooseHero, isStart],
    });
    
    return {
        isStart: gameStart,
        isClear,
        root,
    };
};

export default useGame;