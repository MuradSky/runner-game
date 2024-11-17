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
    const loop1 = useRef<GSAPTimeline>(gsap.timeline());
    const loop2 = useRef<GSAPTimeline>(gsap.timeline());

    useGSAP(() => {
        const rect = root.current?.querySelector('[data-selector="game.bg"]')?.getBoundingClientRect();
        if (root.current) {
            if (started) {
                loop1.current.to('[data-selector="game.bg"]', {
                    x: rect ? -rect.width : 0, 
                    duration: 8,
                    ease: 'linear',
                    repeat: -1,
                });
                loop1.current.play();

                loop2.current.to('[data-selector="obstacles"]', {
                    x: -8000, 
                    duration: 18.5,
                    ease: 'linear',
                    repeat: -1,
                });
                loop2.current.play();
            }
        }

        return () => {
            loop1.current.kill();
            loop2.current.kill();
        };
    }, {
        scope: root,
        dependencies: [started],
    });

    return {
        loop1,
        loop2,
    };
};

export default useLoop;