import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import useStore from 'store';

const useScene = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const { addPerson, isBack, addOpenPreview, isOpenPreview, addBack } = useStore(state => state);
    const [hero, setHero] = useState<null | string>(null);

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
        const tl = gsap.timeline();
        if (root.current) {
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
                    }
                });
            }
        }

        return () => {
            tl.kill();
        };
    }, {
        scope: root,
        dependencies: [isBack]
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            hero && addPerson(hero);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [hero]);

    const choosePerson = (preson: string) => ()=> {
        setHero(preson);
    };
    return {
        root,
        hero,
        choosePerson,
    };
};

export default useScene;