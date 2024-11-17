import { RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useScreenSize } from 'hooks';

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
    chooseHero: null | string;
    isFail: boolean;
}

const usePerson = ({
    root,
    started,
    chooseHero,
    isFail,
}: Props) => {
    const { isMobile } = useScreenSize();
    const lottie = useRef<LottiePlayer | null>(null);
    const animation = useRef<AnimationItem | null>(null);
    const personTl = useRef<GSAPTimeline>(gsap.timeline());

    useGSAP(() => {
        const person = root.current?.querySelector<HTMLDivElement>('[data-selector="game.person"]');
        let isJump = false;

        if (chooseHero && started && person) {
            loadAnimate('run', person);
        }

        if (isFail && person) {
            personTl.current.kill();
            gsap.to(person, {
                y: 0,
                duration: .5,
            });
        }

        const onJumping = (e: KeyboardEvent | PointerEvent) => {
            if (isJump || !started || isFail) return;
            if (((e as KeyboardEvent).keyCode === 32
                || (e as KeyboardEvent).keyCode === 38
                || (e as PointerEvent).type === 'pointerdown')
                && !animation.current?.isPaused
            ) {
                isJump = true;
                
                if (person) {
                    loadAnimate('jump', person);
                    personTl.current.to(person, {
                        y: isMobile ? -240 : -400,
                        duration: .5,
                        onComplete() {
                            gsap.to(person, {
                                x: 0,
                                duration: isMobile ? 1.5 : 1,
                                delay: .3,
                            });
                        }
                    });

                    personTl.current.to(person, {
                        y: 0,
                        duration: .35,
                        onComplete() {    
                            isJump = false;
                            if (!animation.current?.isPaused) {
                                loadAnimate('run', person);
                            }
                            
                        }
                    });
                    gsap.to(person, {
                        x: isMobile ? 200 : 250,
                        duration: .5,
                        delay: .3,
                    });
                }
            }
        };
        
        window?.addEventListener('keydown', onJumping, false);
        window?.addEventListener('pointerdown', onJumping, false);
        return () => {
            if (animation.current) {
                animation.current.destroy();
                animation.current = null;
            }
            personTl.current.kill();
            window?.removeEventListener('pointerdown', onJumping, false);
            window?.removeEventListener('keydown', onJumping, false);
        };
    }, {
        scope: root,
        dependencies: [started, chooseHero, lottie, isFail],
    });

    const loadAnimate = (key: string, person: HTMLDivElement) => {
        if (animation.current) {
            animation.current.destroy();
        }

        if (person && lottie.current) {
            animation.current = lottie.current?.loadAnimation({
                container: person,
                renderer: 'svg',
                loop: true,
                autoplay: started,
                animationData: chooseHero && animations[chooseHero][key],
            });
        }
    };

    return {
        lottie,
        animation,
        personTl,
        loadAnimate,
    };
};

export default usePerson;