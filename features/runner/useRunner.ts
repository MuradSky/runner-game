import { useEffect, useRef, useState } from 'react';
import useStore from 'store';
import useObstacles from './useObstacles';
import useLoop from './useLoop';
import usePerson from './usePerson';

interface Props {
    isStart: boolean;
}


const useRunner = ({ isStart }: Props) => {
    const { chooseHero, addCoin, isGamePaused, addIsFinish, addIsGameOver } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const [isFail, setIsFails] = useState(false);
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(0);

    const { obstacles, currentObstacle } = useObstacles({ started, root, setIsFails });
    const { loop } = useLoop({ started, root });
    const { animation, lottie, loadAnimate } = usePerson({ root, started, chooseHero, isFail, });

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

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (isStart) setStarted(isStart);
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [isStart]);

    useEffect(() => {
        if (isFail) {
            const timeOut = setTimeout(() => {
                addIsFinish();
                addIsGameOver();
            }, 1000);
            return () => clearTimeout(timeOut);
        }
        if (round === 3) addIsFinish();
    }, [round, isFail]);

    useEffect(() => {
        if (isGamePaused) pause();
        else play();
    }, [isGamePaused]);

    useEffect(() => {
        if (isFail) {
            setStarted(false);
            gameOver();
        }
        // else play();
    }, [isFail]);

    useEffect(() => {
        let timeOut: NodeJS.Timeout | null = null;
        if (animation.current?.isPaused && timeOut) {
            clearTimeout(timeOut);
        }

        if (started && !animation.current?.isPaused) {
            timeOut = setTimeout(() => {
                setRound(round + 1);
                addCoin();
            }, 8000);
        }

        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }
        };
    }, [started, animation, round, isGamePaused]);

    const play = () => {
        if (animation.current) {
            animation.current.isPaused = false;
        }

        loop.current.play();
        obstacles.current.play();
    };

    const pause = () => {
        if (animation.current) {
            animation.current.isPaused = true;
        }
        loop.current.pause();
        obstacles.current.pause();
    };

    const gameOver = () => {
        const person = root.current?.querySelector<HTMLDivElement>('[data-selector="game.person"]');
        loop.current.pause();
        obstacles.current.pause();

        if (animation.current && person) {
            loadAnimate('fall', person);
            const timer = setTimeout(() => {
                if (animation.current) animation.current.isPaused = true;
            }, 1000);
            return () => clearTimeout(timer);
        }
    };

    return {
        root,
        pause,
        currentObstacle
    };
};

export default useRunner;