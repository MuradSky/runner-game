import { useEffect, useRef, useState } from 'react';
import useStore from 'store';
import useObstacles from './useObstacles';
import useLoop from './useLoop';
import usePerson from './usePerson';
import { setTimeout } from 'timers';
import { useScreenSize } from 'hooks';

interface Props {
    isStart: boolean;
}

const useRunner = ({ isStart }: Props) => {
    const { isMobile } = useScreenSize();
    const { isGamePaused, addIsFinish, isGameFinish, addIsGameOver, addFail } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const [timeLeft, setTimeLeft] = useState(30); 
    const [isFail, setIsFails] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [started, setStarted] = useState(false);
    const [achievement, setAchievement] = useState(0); 
    const roundTl = useRef<NodeJS.Timeout | null>(null);
    const { obstacles, currentObstacle } = useObstacles({
        started, root, setIsFails, isFinish,
    });
    const { loop1 } = useLoop({ started, root });
    const { animation, lottie, loadAnimate, personTl, personTlRev, } = usePerson({
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
            addFail();
            setStarted(false);
            gameOver();
            roundTl.current && clearTimeout(roundTl.current);
            roundTl.current = null;
            const timeOut = setTimeout(() => {
                addIsGameOver();
            }, 1000);
            return () => clearTimeout(timeOut);
        }
    }, [isFail]);

    useEffect(() => {
        if (isGamePaused) pause();
        else play();
    }, [isGamePaused]);

    useEffect(() => {
        if ((isMobile ?  timeLeft <= 3 : timeLeft <= 2) && !isGamePaused) {
            setIsFinish(true);
            if (!isGamePaused) {
                const tm = setTimeout(() => {
                    addIsFinish();
                }, 2000);
            
                return () => clearTimeout(tm);
            }
            return;
        }
        if (isGamePaused) return;
        roundTl.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(roundTl.current || 0); // Очищаем таймер при размонтировании
    }, [timeLeft, isGamePaused]);

    useEffect(() => {
        if (isMobile ? (timeLeft === 22) : (timeLeft === 22) && !isGamePaused) {
            setAchievement(1);
        }
        if (isMobile ? (timeLeft === 11) : timeLeft === 12 && !isGamePaused) {
            setAchievement(2);
        }

        if (isMobile ? (timeLeft === 3) : timeLeft === 2 && !isGamePaused) {
            setAchievement(3);
        }
    }, [timeLeft, isGamePaused]);

    const play = () => {
        personTl.current?.play();
        personTlRev.current?.play();
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
        personTl.current?.pause();
        personTlRev.current?.pause();
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
        achievement,
        started,
        isPause: isFail || isGamePaused,
        root,
        pause,
        currentObstacle,
        isFail,
    };
};

export default useRunner;