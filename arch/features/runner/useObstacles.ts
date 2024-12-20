import { RefObject, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useScreenSize } from 'hooks';

import pappersJson from 'assets/obj/paper.json';
import useStore from 'store';

interface Props {
    started: boolean;
    isFinish: boolean;
    isClear: boolean;
    root: RefObject<HTMLDivElement>;
    setIsFails: (v: boolean) => void;
}

const useObstacles = ({
    started,
    root,
    isFinish,
    setIsFails,
    isClear,
}: Props) => {
    const { isGamePaused } = useStore(state => state);
    const { isMobile, isLaptop } = useScreenSize();
    const obstacles = useRef<GSAPTimeline>(gsap.timeline());
    const [currentObstacle, setObstacle] = useState(0);

    useGSAP(() => {
        const lottie: LottiePlayer = require('lottie-web');
        const person = root.current?.querySelector('[data-selector="game.person"]');
        const obj = root.current?.querySelector('[data-action="obstacles.item"]');
        let count = 0;

        const animatePapers = () => {
            const pappers = root.current?.querySelector('[data-action="obstacles.pappers"]');
            const papper = lottie.loadAnimation({
                container: (pappers as HTMLElement),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: pappersJson,
            });

            const svg = pappers?.querySelector('svg');
            if (svg) {
                svg.setAttribute('width', isMobile ? '160px' : isLaptop ? '250px' : '240px');
                svg.setAttribute('height', isMobile ? '110px' : isLaptop ? '150px' : '200px');
            }
            return papper;
        };

        let animate: AnimationItem | null = null;

        if (isFinish || isClear) {
            obstacles.current.kill();
            gsap.set(obj as HTMLElement, { display: 'none' });

            const timer = setTimeout(() => {
                if (animate) animate.destroy();    
            }, 1000);
            return () => clearTimeout(timer);
        }

        if (root.current && started ) {
            const checkCollision = (rect1: ClientRect, rect2: ClientRect) => {
                if (isMobile) {
                    return (
                        rect1.left < rect2?.right &&
                        rect1.right > rect2?.left &&
                        rect1.top < rect2?.bottom &&
                        rect1.bottom > rect2?.top
                    );
                }
                return (
                    rect1.left < (rect2?.right - 45) &&
                   (rect1.right - 50) > rect2?.left &&
                    rect1.top < rect2?.bottom &&
                    rect1.bottom > rect2?.top
                );
            };

            obstacles.current.to('[data-action="obstacles.item"]', {
                x: -(window.innerWidth + (500)),
                duration: window.innerWidth < 480 ? 4 : isMobile ? 4 : 5.2,
                ease: 'linear',
                delay: isMobile ? 2 : 0,
                onUpdate() {
                    const obj2 = person?.querySelector('g');
                    if (obj && obj2) {
                        const objRect = (count === 3 ? obj.querySelector('g') as SVGGElement : obj)?.getBoundingClientRect();
                        const personRect = obj2.getBoundingClientRect();
                        if (!isGamePaused && checkCollision(personRect, objRect) && person || isFinish) {
                            setIsFails(true);                    
                        }
                    }
                },
                onComplete() {
                    setTimeout(() => {
                        animate = animatePapers();
                    }, 200);
                    if (count === 4) count = 0;
                    else count++;
                    setObstacle(count);
                    obstacles.current.restart();
                }
            });
        }

        return () => {
            obstacles.current.kill();
            animate?.destroy();
        };
    }, {
        scope: root,
        dependencies: [started, isFinish, isClear],
    });

    return {
        obstacles,
        currentObstacle,
    };
};

export default useObstacles;