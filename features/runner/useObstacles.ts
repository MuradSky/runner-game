import { RefObject, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimationItem, LottiePlayer } from 'lottie-web';

import pappersJson from 'assets/obj/paper.json';

interface Props {
    started: boolean;
    root: RefObject<HTMLDivElement>;
    setIsFails: (v: boolean) => void;
}

const useObstacles = ({
    started,
    root,
    setIsFails
}: Props) => {
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
                svg.setAttribute('width', '320px');
                svg.setAttribute('height', '200px');
            }
            return papper;
        };

        let animate: AnimationItem | null = null;

        if (root.current && started) {

            const checkCollision = (rect1: ClientRect, rect2: ClientRect) => {
                return (
                    rect1.left < rect2.right &&
                    rect1.right > rect2.left &&
                    rect1.top < rect2.bottom &&
                    rect1.bottom > rect2.top
                );
            };

            obstacles.current.to('[data-action="obstacles.item"]', {
                x: -(window.innerWidth + 100),
                duration: 4,
                delay: 1,
                onUpdate() {
                    const obj2 = person?.querySelector('g');
                    if (obj && obj2) {
                        const objRect = obj.getBoundingClientRect();
                        const personRect = obj2.getBoundingClientRect();
                        if (checkCollision(personRect, objRect) && person) {
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
        dependencies: [started],
    });

    return {
        obstacles,
        currentObstacle,
    };
};

export default useObstacles;