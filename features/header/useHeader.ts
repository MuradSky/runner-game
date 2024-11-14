import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import useStore from 'store';
const useHeader = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const { isOpenPreview, addBack, chooseHero } = useStore(state => state);
    const [toggle, setToggle] = useState(false);
    
    useGSAP(() => {
        if (chooseHero && root.current) {
            gsap.to(root.current, {
                y: -200,
                opacity: 0,
            });
        }
    }, {
        scope: root,
        dependencies: [chooseHero]
    });

    useGSAP(() => {
        if (root.current) {
            gsap.set('[data-selector="logo.arrow"]', {
                x: 15,
                scale: .5,
            });
            gsap.set('[data-selector="logo.icon"]', {
                x: 12,
            });
        }
    }, {
        scope: root,
    });

    useGSAP(() => {
        if (root.current) {
            if (toggle) {
                gsap.to('[data-selector="sound.on"]', .3, {
                    y: -24,
                });
                gsap.to('[data-selector="sound.off"]', .3, {
                    y: -24,
                });
            } else {
                gsap.to('[data-selector="sound.on"]', .3, {
                    y: 20,
                });
                gsap.to('[data-selector="sound.off"]', .3, {
                    y: 0,
                });
            }
        }
    }, {
        scope: root,
        dependencies: [toggle]
    });

    useGSAP(() => {
        if (root.current) {
            if (isOpenPreview) {
                gsap.to('[data-selector="logo.icon"]', {
                    // x: -20,
                    scale: .5,
                });

                gsap.to('[data-selector="logo.arrow"]', {
                    delay: .1,
                    scale: 1,
                    x: -32,
                });
            } else {
                gsap.to('[data-selector="logo.arrow"]', {
                    x: 15,
                    scale: .5,
                });

                gsap.to('[data-selector="logo.icon"]', {
                    scale: 1,
                });
            }
        }
    }, {
        scope: root,
        dependencies: [isOpenPreview]
    });

    const onClick = () => {
        addBack(true);
    };

    const onToggle = () => {
        setToggle(!toggle);
    };

    return {
        onClick,
        root,
        toggle,
        onToggle
    };
};

export default useHeader;