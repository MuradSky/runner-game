import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useScreenSize } from 'hooks';
import useStore from 'store';

import maxFall from 'assets/personal/max/max_fall.json';
import maxRun from 'assets/personal/max/max_run.json';
import maxJump from 'assets/personal/max/max_jump.json';

import romFall from 'assets/personal/rom/rom_fall.json';
import romRun from 'assets/personal/rom/rom_run.json';
import romJump from 'assets/personal/rom/rom_jump.json';


import annFall from 'assets/personal/ann/ann_fall.json';
import annRun from 'assets/personal/ann/ann_run.json';
import annJump from 'assets/personal/ann/anna_jump.json';

type Anim = {
    [key: string]: {
        [key: string]: unknown;
    };
}

const animations: Anim = {
    maks: {
        fall: maxFall,
        run: maxRun,
        jump: maxJump,
    },
    rom: {
        fall: romFall,
        run: romRun,
        jump: romJump,
    },
    ann: {
        fall: annFall,
        run: annRun,
        jump: annJump,
    }
};

interface Props {
    started: boolean;
    root: RefObject<HTMLDivElement>;
    isFail: boolean;
}

const usePerson = ({
    root,
    started,
    isFail,
}: Props) => {
    const { isGameFinish, isGamePaused, chooseHero, addOpenResult } = useStore(state => state);
    const { isMobile, isLaptop } = useScreenSize();
    const lottie = useRef<LottiePlayer | null>(null);
    const animation = useRef<AnimationItem | null>(null);
    const personTl = useRef<GSAPTimeline | null>(null);
    const personTlRev = useRef<GSAPAnimation | null>(null);
    const isFailLocal = useRef(false);

    useEffect(() => {
        if (chooseHero && started && !isGamePaused) {
            loadAnimate('run');
        }
    }, [chooseHero, started, isGamePaused]);

    useEffect(() => {
        if (personTl.current && isFail) {
            personTl.current.kill();
            personTl.current = null;
            loadAnimate('fall');
            isFailLocal.current = true;
        } 
    }, [isFail]);

    useGSAP(() => {
        const person = root.current?.querySelector('[data-selector="game.person"]');
        if (isGameFinish && !isGamePaused) {
            personTl.current?.kill();            
            loadAnimate('run');
            gsap.to(person as HTMLDivElement, {
                x: (window.innerWidth / 2) + 300,
                ease: 'liear',
                duration: 2,
                onComplete() {
                    addOpenResult(true);
                }
            });
        }
    }, {
        scope: root,
        dependencies: [
            isGameFinish,
            isGamePaused,
        ],
    });

    useGSAP(() => {
        personTl.current = gsap.timeline();
        personTlRev.current = gsap.timeline();
        const person = root.current?.querySelector<HTMLDivElement>('[data-selector="game.person"]');
        let isJump = false;

        if (isFailLocal.current || isGameFinish) {
            personTl.current.kill();
            personTlRev.current.kill();
            gsap.to(person as HTMLElement, {
                y: 0,
                duration: .5,
            });
        }

        const onJumping = (e: KeyboardEvent | PointerEvent) => {            
            if (isJump || !started || isFailLocal.current || isGameFinish) {
                return;
            }

            if (((e as KeyboardEvent).keyCode === 32
                || (e as KeyboardEvent).keyCode === 38
                || (e as PointerEvent).type === 'pointerdown')
                && !animation.current?.isPaused
            ) {
                isJump = true;
                if (person) {
                    loadAnimate('jump');
                    gsap.to(person, {
                        x: isMobile ? 220 : 280,
                        duration: .5,
                        delay: .3,
                        onStart() {
                            personTlRev.current?.pause();
                        },
                    });
                    personTl.current?.to(person, {
                        y: isMobile ? -240 : isLaptop ? -300 : -400,
                        duration: .5,
                        // onComplete() {
                            
                        // }
                    });

                    personTl.current?.to(person, {
                        y: 0,
                        duration: .35,
                        onComplete() {
                            personTlRev.current = gsap.to(person, {
                                x: 0,
                                duration: isMobile ? 2 : 1,
                                easy: 'linear'
                            });
                            (isFailLocal.current);
                            isJump = false;
                            if (!isFailLocal.current || !animation.current?.isPaused) {
                                loadAnimate('run');
                            }
                        },
                    });
                }
            }
        };
        
        window?.addEventListener('keydown', onJumping);
        window?.addEventListener('pointerdown', onJumping);
        return () => {
            if (animation.current) {
                animation.current.destroy();
                animation.current = null;
            }
            personTl.current?.kill();
            personTl.current = null;
            personTlRev.current?.kill();
            personTlRev.current = null;
            window?.removeEventListener('pointerdown', onJumping);
            window?.removeEventListener('keydown', onJumping);
        };
    }, {
        scope: root,
        dependencies: [started, chooseHero, lottie, isFailLocal, isGameFinish],
    });

    const loadAnimate = (key: string) => {

        const person = root.current?.querySelector<HTMLDivElement>('[data-selector="game.person"]');
        if (animation.current) {
            animation.current.destroy();
        }

        if (person && lottie.current) {
            animation.current = lottie.current?.loadAnimation({
                container: person,
                renderer: 'svg',
                loop: true,
                name: key,
                autoplay: started,
                animationData: chooseHero && animations[chooseHero][key],
            });
        }
    };

    return {
        lottie,
        animation,
        personTl,
        personTlRev,
        loadAnimate,
    };
};

export default usePerson;