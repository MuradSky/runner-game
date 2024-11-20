import { useEffect, useRef, useState, MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useStore from 'store';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { useScreenSize } from 'hooks';
import maksIdle from 'assets/personal/max/max_idle.json';
import maksSelect from 'assets/personal/max/max_select.json';
import romIdle from 'assets/personal/rom/rom_idle.json';
import romSelect from 'assets/personal/rom/rum_select.json';
import annIdle from 'assets/personal/ann/ann_idle.json';
import annSelect from 'assets/personal/ann/ann_select.json';
import { SwiperClass } from 'swiper/react';

interface Data {
    [key: string]: {
        [key: string]: unknown;
    };
}

const data: Data = {
    maks: {
        idle: maksIdle,
        select: maksSelect,
    },
    rom: {
        idle: romIdle,
        select: romSelect,
    },
    ann: {
        idle: annIdle,
        select: annSelect,
    }
};

interface Animate {
    [ket: string]: AnimationItem | null;
}

const useScene = () => {
    const { isMobile } = useScreenSize();
    const root = useRef<HTMLDivElement | null>(null);
    const [currentHero, setHero] = useState<null | string>(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [animate, setAnimate] = useState<Animate>({
        maks: null,
        rom: null,
        ann: null,
    });
    const {
        chooseHero,
        addPerson,
        isBack,
        addOpenPreview,
        isOpenPreview,
        addBack,
        isOpenResult
    } = useStore(state => state);

    useEffect(() => {
        if (isOpenResult) {
            setHero(null);
        }
    }, [isOpenResult]);

    useEffect(() => {
        if (chooseHero) {
            const timeOut = setTimeout(() => {
                Object.values(animate).forEach(item => item?.destroy());
            }, 2000);
            return () => clearTimeout(timeOut);
        }
    }, [chooseHero]);

    useEffect(() => {
        const lottie = require('lottie-web');
        setLottie(lottie);
    }, []);

    useGSAP(() => {
        if (lottie && root.current && isOpenPreview) {
            ['maks', 'rom', 'ann'].forEach(item => {
                const person = (root.current as HTMLDivElement).querySelector(`[data-person="${item}"]`);
                const anim = (person as HTMLDivElement).querySelector('[data-action="person.anim"]') as HTMLDivElement;
                animateSvg('idle', item, anim);
            });
        }
    }, {
        scope: root,
        dependencies: [lottie, isOpenPreview]
    });


    useEffect(() => {
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            isOpenPreview && addBack(false);
        }, 300);
        return () => clearTimeout(timeOut);
    }, [isOpenPreview]);

    useGSAP(() => {
        gsap.set('[data-selector="content.title"]', {
            opacity: 0,
            y: 20,
        });
        gsap.set('[data-selector="content.text"]', {
            opacity: 0,
            y: 20,
        });
    }, {
        scope: root,
    });

    useGSAP(() => {
        let tl: GSAPTimeline | null = null;
        if (root.current) {
            tl = gsap.timeline();
            if (!isBack) {
                tl.to('[data-selector="content.title"]', .3, {
                    delay: .5,
                    opacity: 1,
                    y: 0,
                });
                tl.to('[data-selector="content.text"]', .3, {
                    opacity: 1,
                    y: 0,
                });
            } else {
                tl.to('[data-selector="content.text"]', .3, {
                    opacity: 0,
                    y: 20,
                });
                tl.to('[data-selector="content.title"]', .3, {
                    opacity: 0,
                    y: 20,
                    onComplete() {
                        addOpenPreview(false);
                        setHero(null);
                    }
                });
            }
        }

        if (isOpenResult) {
            tl?.kill();
            tl = null;
        }

        return () => {
            tl?.kill();
            tl = null;
        };
    }, {
        scope: root,
        dependencies: [isBack, isOpenResult]
    });

    useGSAP(() => {
        if (root.current && !!currentHero) {
            const person = root.current.querySelector(`[data-person="${currentHero}"]`);
            const anim = (person as HTMLDivElement).querySelector('[data-action="person.anim"]') as HTMLDivElement;
            anim.innerHTML = '';
            
            const timeout = setTimeout(() => {
                animateSvg('select', currentHero, anim, false, true);
            }, 100);

            const time = setTimeout(() => {
                addPerson(currentHero);
            }, 1100);

            return () => {
                clearTimeout(timeout);
                clearTimeout(time);
            };
        }
    }, {
        scope: root,
        dependencies: [currentHero]
    });

   
    const animateSvg = (
        type: string,
        hero: string,
        root: HTMLDivElement,
        isLoop = true,
        autoplay = false,
    ) => {
        console.log(data[hero][type]);

        if (lottie) {
            const l = lottie.loadAnimation({
                container: root,
                renderer: 'svg',
                loop: isLoop,
                autoplay: isMobile ? true : autoplay,
                animationData: data[hero][type],
            });
            setAnimate(state => ({
                ...state,
                [hero]: l
            }));
        }
    };

    const choosePerson = (e: MouseEvent) => {
        if (currentHero) return;
        const hero = (e.currentTarget as HTMLDivElement).dataset.person as string;        
        if (animate[hero]) {
            animate[hero].destroy();
            setAnimate(state => ({
                ...state,
                [hero]: null,
            }));
        }
        setHero(hero);
    };

    const choosePersonMobile = () => {
        const item = root.current?.querySelector('.swiper-slide-active>[data-person]') as HTMLDivElement;
        if (currentHero) return;
        const hero = item.dataset.person as string;        
        if (animate[hero]) {
            animate[hero].destroy();
            setAnimate(state => ({
                ...state,
                [hero]: null,
            }));
        }
        setHero(hero);
    };


    const onMouseEnter = (e: MouseEvent) => {
        if (currentHero) return;
        const hero = (e.currentTarget as HTMLDivElement).dataset.person as string;
      
        if (animate[hero]) {
            animate[hero].isPaused = false;
        }
    };

    const onMouseLeave = (e: MouseEvent) => {
        if (currentHero) return;
        const hero = (e.currentTarget as HTMLDivElement).dataset.person as string;
        if (animate[hero]) {
            animate[hero].isPaused = true;
        }
    };

    const onPrev = () => {
        if (swiper) {
            swiper.slidePrev();
        }
    };

    const onNext = () => {
        if (swiper) {
            swiper.slideNext();
        }
    };


    return {
        root,
        hero: currentHero,
        choosePerson,
        onMouseEnter,
        onMouseLeave,
        choosePersonMobile,
        setSwiper,
        onPrev,
        onNext
    };
};

export default useScene;