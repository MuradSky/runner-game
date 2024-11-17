import { useRef, RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


interface Props {
    started: boolean;
    root: RefObject<HTMLDivElement>;
}

const useLoop = ({
    started,
    root,
}: Props) => {
    const loop = useRef<GSAPTimeline>(gsap.timeline());

    useGSAP(() => {
        const rect = root.current?.querySelector('[data-selector="game.bg"]')?.getBoundingClientRect();
        
        if (root.current) {
            if (started) {
                loop.current.to('[data-selector="game.bg"]', {
                    x: rect ? -rect.width : 0, 
                    duration: 8,
                    ease: 'linear',
                    repeat: -1,
                });
                loop.current.play();
            }
        }

        return () => {
            loop.current.kill();
        };
    }, {
        scope: root,
        dependencies: [started],
    });

    return {
        loop
    };
};

export default useLoop;