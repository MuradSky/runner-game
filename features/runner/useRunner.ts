import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import lottie, { AnimationItem } from 'lottie-web';

interface Props {
    isStart: boolean;
}

import maxFall from 'assets/personal/max/max_fall.json';
import maxRun from 'assets/personal/max/max_run.json';
import maxJump from 'assets/personal/max/max_jump.json';

import romFall from 'assets/personal/rom/rom_fall.json';
import romRun from 'assets/personal/rom/rom_run.json';
import romJump from 'assets/personal/rom/rom_jump.json';


import annFall from 'assets/personal/ann/ann_fall.json';
import annRun from 'assets/personal/ann/ann_run.json';
import annJump from 'assets/personal/ann/ann_jump.json';
import useStore from 'store';

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

const useRunner = ({ isStart }: Props) => {
    const { chooseHero } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const [started, setStarted] = useState(false);
    const currentAnimation = useRef<AnimationItem | null>(null);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setStarted(isStart);
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [isStart]);

    useGSAP(() => {
        const person = root.current?.querySelector('[data-selector="game.person"]');
        let isJump = false;

        const loadAnimate = (key: string) => {
            if (currentAnimation.current) {
                currentAnimation.current.destroy();
            }

            if (person) {
                currentAnimation.current = lottie.loadAnimation({
                    container: person,
                    renderer: 'svg',
                    loop: true,
                    autoplay: started,
                    animationData: chooseHero && animations[chooseHero][key],
                });
            }
        };

        if (chooseHero) {
            loadAnimate('run');
        }

        const onJumping = (e: KeyboardEvent | PointerEvent) => {
            if (isJump || !started) return;
            if (((e as KeyboardEvent).keyCode === 32 || (e as KeyboardEvent).keyCode === 38 || (e as PointerEvent).type === 'pointerdown') && started) {
                isJump = true;
                e.preventDefault();
                loadAnimate('jump');
                if (person) {
                    gsap.to(person, {
                        y: -380,
                        duration: .5,
                        onComplete() {
                            const timeOut = setTimeout(() => {
                                clearTimeout(timeOut);
                                loadAnimate('run');
                            }, 400);
                            gsap.to(person, {
                                y: 0,
                                duration: .5,   
                            });

                            gsap.to(person, {
                                x: 0,
                                duration: .5,
                                delay: .25,
                                onComplete() {
                                    isJump = false;
                                }
                            });
                        }
                    });

                    gsap.to(person, {
                        x: 200,
                        duration: .5,
                        delay: .3,
                    });
                }
            }
        };
        
        window.addEventListener('keydown', onJumping);
        window.addEventListener('pointerdown', onJumping);
        return () => {
            window.removeEventListener('pointerdown', onJumping);
        };
    }, {
        scope: root,
        dependencies: [started, chooseHero, isStart],
    });
    
    useGSAP(() => {
        if (root.current) {
            if (started) {
                const rect = root.current?.querySelector('[data-selector="game.bg"]')?.getBoundingClientRect();
                gsap.to('[data-selector="game.bg"]', {
                    x: rect ? -rect.width : 0, 
                    duration: 8,
                    ease: 'linear',
                    repeat: -1,
                });
            }
        }
    }, {
        scope: root,
        dependencies: [started],
    });

    return {
        root,
    };
};

export default useRunner;