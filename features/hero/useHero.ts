import { SwiperClass } from 'swiper/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store';

const useHero = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const { addOpenPreview, isOpenPreview, addBack, chooseHero } = useStore(state => state);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            !isOpenPreview && setIsPreview(false);
        }, 300);
        return () => clearTimeout(timeOut);
    }, [isOpenPreview]);

    console.log(isPreview);

    useGSAP(() => {
        const tl = gsap.timeline();
        if (root.current) {
            if (!isPreview) {
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
                        addOpenPreview(true);
                        if (swiper) swiper.slideTo(1);
                    }
                });
            }
        }
        return () => {
            tl.kill();
        };
    }, {
        scope: root,
        dependencies: [isPreview]
    });

    useEffect(() => {
        if (!isOpenPreview && swiper) {
            swiper.slideTo(0);
            addBack(true);
        }
    }, [isOpenPreview]);

    useEffect(() => {
        if (chooseHero && swiper) {
            swiper.slideTo(2);
        }
    }, [chooseHero]);


    const onNext = () => {
        setIsPreview(true);
    };

    return {
        isPreview,
        root,
        onNext,
        setSwiper,
    };
};

export default useHero;