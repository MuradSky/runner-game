import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useStore from 'store';

const useGame = () => {
    const { chooseHero } = useStore();
    const root = useRef<HTMLDivElement | null>(null);
    const [isStart, setIsStart] = useState(false);
    const [isClear, setIsClear] = useState(false);
    useEffect(() => {
        const callBack = (e: KeyboardEvent | PointerEvent) => {
            if ((e as KeyboardEvent).keyCode === 32 || (e as KeyboardEvent).keyCode === 38 || (e as PointerEvent).type === 'pointerdown') {
                chooseHero && setIsStart(true);
            }
        };
        document?.addEventListener('pointerdown', callBack, false);
        document?.addEventListener('keydown', callBack, false);
        return () => {
            document?.removeEventListener('pointerdown', callBack, false);
            document?.removeEventListener('keydown', callBack, false);
        };
    }, [chooseHero]);

    useGSAP(() => {
        if (root.current) {            
            if (chooseHero && !isStart) {
                gsap.to('[data-seletor="game.preview"]', {
                    y: 0,
                    opacity: 1,
                    delay: 1,
                });
            } else if (isStart) {
                gsap.to('[data-seletor="game.preview"]', {
                    y: '120%',
                    opacity: 1,
                    delay: 0,
                    onComplete() {
                        isStart && setIsClear(true);
                    }
                });
            }
        }
    }, {
        scope: root,
        dependencies: [chooseHero, isStart],
    });
    
    const handleClick = () => {
        setIsStart(true);
    };

    return {
        isStart,
        isClear,
        root,
        handleClick
    };
};

export default useGame;