import { useEffect, useRef, useState } from 'react';
import useStore from 'store';
import useObstacles from './useObstacles';
import useLoop from './useLoop';
import usePerson from './usePerson';
import { setTimeout } from 'timers';

interface Props {
    isStart: boolean;
}

const useRunner = ({ isStart }: Props) => {
    const { addCoin, isGamePaused, addIsFinish, isGameFinish, addIsGameOver } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const [isFail, setIsFails] = useState(false);
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(0);
    const roundTl = useRef<NodeJS.Timeout | null>(null);
    const { obstacles, currentObstacle } = useObstacles({
        started, root, setIsFails
    });
    const { loop1 } = useLoop({ started, root });
    const { animation, lottie, loadAnimate, personTl, } = usePerson({
        root,
        started,
        isFail,
    });

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
            setStarted(false);
            gameOver();
            roundTl.current && clearTimeout(roundTl.current);
            roundTl.current = null;
            const timeOut = setTimeout(() => {
                addIsGameOver();
            }, 1000);
            return () => clearTimeout(timeOut);
        }
        if (round === 3) {
            const timeOut = setTimeout(() => {
                addIsFinish();
            }, 2000);
            return () => clearTimeout(timeOut);
        }
    }, [round, isFail]);

    useEffect(() => {
        if (isGamePaused) pause();
        else play();
    }, [isGamePaused]);

    
    useEffect(() => {
        if (isFail || isGameFinish || animation.current?.isPaused || !started) {
            roundTl.current && clearTimeout(roundTl.current);
            roundTl.current = null;
            return;
        }
        
        roundTl.current = setTimeout(() => {
            if (!isFail && !isGameFinish && started && !animation.current?.isPaused) {
                setRound(round + 1);
                addCoin();
            }
        }, 9000);

        return () => {
            if (roundTl.current) {
                clearTimeout(roundTl.current);
                roundTl.current = null;
            }
        };
    }, [started, animation, isGamePaused, isGameFinish, isFail]);

    const play = () => {
        personTl.current.play();
        if (animation.current) {
            animation.current.isPaused = false;
        }

        if (!isGameFinish) {
            loop1.current.play();
            obstacles.current.play();
        }
    };

    const pause = () => {
        loop1.current.pause();
        personTl.current.pause();
        obstacles.current.pause();
        if (animation.current) {
            animation.current.isPaused = true;
        }
    };

    const gameOver = () => {
        loop1.current.pause();
        obstacles.current.pause();
       
        if (animation.current) {
            loadAnimate('fall');
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