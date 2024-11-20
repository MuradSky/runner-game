import { useRef, useEffect, useState } from 'react';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import useStore from 'store';
import styles from './Pointsdisplay.module.scss';
import { data, icons } from './data';
import { useScreenSize } from 'hooks';

interface Selectors {
    hero: HTMLDivElement | null;
    addCoin: HTMLDivElement | null;
    point1: HTMLDivElement | null;
    point2: HTMLDivElement | null;
    point3: HTMLDivElement | null;
}

const usePoints = (isStart: boolean, isPause: boolean, achievement: number, isFail: boolean) => {
    const { isMobile } = useScreenSize();
    const { chooseHero, addCoin: addWinCoin, addIsPause } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const animate = useRef<AnimationItem | null>(null);
    const lottie = useRef<LottiePlayer | null>(null);
    const coinAnimate = useRef<GSAPTimeline | null>(null);
    const [type, setType] = useState(0);
    const [isIntro, setIsIntro] = useState(false);
    const [restart, setRestart] = useState(false);
    const [selectors, setSelectors] = useState<Selectors>({
        hero: null,
        addCoin: null,
        point1: null,
        point2: null,
        point3: null,
    });
 
    useEffect(() => {
        if (achievement > 0) setRestart(true); 
    }, [achievement]);

    useEffect(() => {
        if (type < 3 && isStart && !isPause && restart) {
            coinIntro(chooseHero as string);
            setIsIntro(true);
        }
        return () => {

        };
    }, [isStart, isPause, restart, type]);

    useEffect(() => {
        const hero = document.querySelector('[data-selector="game.person"]') as HTMLDivElement;
        const addCoin = root.current?.querySelector('[data-selector="coin.add"]') as HTMLDivElement;
        const point1 = root.current?.querySelector('[data-selector="point.1"]') as HTMLDivElement;
        const point2 = root.current?.querySelector('[data-selector="point.2"]') as HTMLDivElement;
        const point3 = root.current?.querySelector('[data-selector="point.3"]') as HTMLDivElement;

        setSelectors({
            hero,
            addCoin,
            point1,
            point2,
            point3
        });
    }, []);

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
        if (type === 1) selectors.point1?.classList.add(styles.is_active);
        if (type === 2) selectors.point2?.classList.add(styles.is_active);
        if (type === 3) selectors.point3?.classList.add(styles.is_active);
    }, [type]);

    useEffect(() => {
        if (isFail && isIntro) {
            coinAnimate.current?.kill();
            coinAnimate.current = null;
            // coinOutro(chooseHero as string);
        }
    }, [isFail, isIntro]);

    useGSAP(() => {
        coinAnimate.current = gsap.timeline({ pause: true });

        const checkCollision = (rect1: ClientRect, rect2: ClientRect) => {            
            if (isMobile) {
                return (
                    rect1.left < (rect2.right - 100) &&
                    (rect1.right - 20) > rect2.left &&
                    rect1.top < (rect2.bottom - 100) &&
                    (rect1.bottom - 100) > rect2.top
                );
            }

            return (
                rect1.left < (rect2.right - 170) &&
                (rect1.right - 20) > rect2.left &&
                rect1.top < (rect2.bottom - 200) &&
                (rect1.bottom - 200) > rect2.top
            );
        };

        if (isIntro && restart) { 
            coinAnimate.current.to(selectors.addCoin, {
                duration: isMobile ? 2 : 3.4,
                x: -window.innerWidth,
                ease: 'linear',
                delay: .2,
                onUpdate() {
                    const objRect = selectors.addCoin?.getBoundingClientRect();
                    const personRect = selectors.hero?.getBoundingClientRect();
                    if (checkCollision(personRect as ClientRect, objRect as ClientRect)) {
                        coinOutro(chooseHero as string);
                        coinAnimate.current?.pause();
                        setRestart(false);
                        addIsPause();
                        gsap.to(selectors.addCoin, {
                            scale: 0,
                            delay: .3,
                        });
                        gsap.to(selectors.addCoin, {
                            x: isMobile ? '-=100' : '-=250',
                            duration: .5,
                            onComplete() {
                                
                                gsap.set(selectors.addCoin, { delay: 1, x: 0, scale: 1.7, });
                                setType(type+1);
                                addWinCoin();
                                if (animate.current) {
                                    animate.current.destroy();
                                }
                            }
                        });
                    }
                },
               
                onComplete() {
                    gsap.set(selectors.addCoin, { x: 0 });
                    setRestart(false);
                    if (animate.current) {
                        animate.current.destroy();
                        animate.current = null;
                    }
                    coinAnimate.current?.kill();
                    coinAnimate.current = null;
                }
            });

            coinAnimate.current.play();
        }
        return () => {
            coinAnimate.current?.kill();
            coinAnimate.current = null;
        };
    }, {
        scope: root,
        dependencies: [isIntro, restart, selectors]
    });

    const coinIntro = (key: string) => {
        const jsonData = data[key].intro[type];

        if (animate.current) {
            animate.current.destroy();
        }
        
        if (selectors.addCoin && lottie.current) {
            animate.current = lottie.current.loadAnimation({
                container: selectors.addCoin as HTMLDivElement,
                renderer: 'canvas',
                loop: false,
                autoplay: true,
                animationData: jsonData,
            });
        }

        const cb = () => {
            if (animate.current) {
                animate.current.destroy();
            }
            coinLoop(key);
        };

        animate.current?.addEventListener('complete',cb);

        return () => {
            animate.current?.destroy();
            animate.current?.removeEventListener('complete',cb);
        };
    };

    const coinLoop = (key: string) => {
        const jsonData = data[key].loop[type];
        
        if (animate.current) {
            animate.current.destroy();
        }
        
        if (selectors.addCoin && lottie.current) {
            animate.current = lottie.current.loadAnimation({
                container: selectors.addCoin as HTMLDivElement,
                renderer: 'canvas',
                autoplay: true,
                animationData: jsonData,
            });
        }

        return () => animate.current?.destroy();
    };

    const coinOutro = (key: string) => {
        const jsonData = data[key].outro[type];
        console.log(jsonData);
        if (animate.current) {
            animate.current.destroy();
        }
        
        if (selectors.addCoin && lottie.current) {
            animate.current = lottie.current.loadAnimation({
                container: selectors.addCoin as HTMLDivElement,
                renderer: 'canvas',
                loop: false,
                autoplay: true,
                animationData: jsonData,
            });
        }

        return () => animate.current?.destroy();
    };

    return {
        root,
        icons: icons[chooseHero as string],
    };
};

export default usePoints;