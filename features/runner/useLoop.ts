import { useRef, RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useStore from 'store';


interface Props {
    started: boolean;
    root: RefObject<HTMLDivElement>;
}

const calDur = () => {
    const d = (
        window.innerWidth > 1729 ? 8.2 :
            window.innerWidth <= 1728 && window.innerWidth > 1681 ? 8 :
                window.innerWidth <= 1680 && window.innerWidth >= 1601 ? 9 :
                    window.innerWidth <= 1600 && window.innerWidth >= 1441 ? 9.2 :
                        window.innerWidth <= 1440 && window.innerWidth >= 1361 ? 8.2 :
                            window.innerWidth <= 1360 && window.innerWidth >= 1281 ? 8.4 :
                                window.innerWidth <= 1280 && window.innerWidth >= 1025 ? 8 :
                                    window.innerWidth <= 1024 && window.innerWidth >= 961 ? 9 : 
                                        window.innerWidth <= 960 && window.innerWidth >= 769 ? 8.8 :
                                            window.innerWidth <= 768 && window.innerWidth >= 601 ? 10.2 :
                                                window.innerWidth <= 600 && window.innerWidth >= 541 ? 12 : 
                                                    window.innerWidth <= 540 && window.innerWidth >= 481 ? 12 :
                                                        window.innerWidth <= 480 && window.innerWidth >= 376 ? 15 :
                                                            window.innerWidth <= 420 && window.innerWidth >= 2 ? 11 : 5
    );
    return d;
};

const useLoop = ({
    started,
    root,
}: Props) => {
    const { isGameFinish } = useStore(state => state);
    const loop1 = useRef<GSAPTimeline>(gsap.timeline());

    useGSAP(() => {
        const finish = root.current?.querySelector('[data-action="finish"]') as HTMLDivElement;
        if (isGameFinish && finish) {
            loop1.current.pause();
            gsap.to(finish, {
                opacity: 1,
                display: 'block',
            });
        }
    }, {
        scope: root,
        dependencies: [
            isGameFinish
        ],
    });

    useGSAP(() => {
        const rect = root.current?.querySelector('[data-selector="game.bg"]')?.getBoundingClientRect();
        if (root.current) {
            if (started) {
                loop1.current.to('[data-selector="game.bg"]', {
                    x: rect ? -rect.width : 0, 
                    duration: calDur(),
                    ease: 'linear',
                    repeat: -1,
                });
                // loop1.current.play();

                // loop2.current.to('[data-selector="obstacles"]', {
                //     x: -8000, 
                //     duration: 18.5,
                //     ease: 'linear',
                //     repeat: -1,
                // });
                // loop2.current.play();
            }
        }

        return () => {
            loop1.current.kill();
        };
    }, {
        scope: root,
        dependencies: [started],
    });

    return {
        loop1,
    };
};

export default useLoop;