import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useStore from 'store';

const useHeader = () => {
    const {
        isOpenPreview,
        addBack,
        chooseHero,
        isOpenResult,
        isGameOver,
        addReset
    } = useStore(state => state);
    const root = useRef<HTMLDivElement | null>(null);
    const [toggle, setToggle] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        if (isOpenResult || isGameOver) {
            setIsFinish(true);
        }
    }, [isOpenResult, isGameOver]);

    useGSAP(() => {
        if (root.current && chooseHero) {
            const timeOut = setTimeout(() => {
                if (isFinish) {
                    gsap.to(root.current, {
                        y: 0,
                        opacity: 1,
                    });
                } else {
                    gsap.to(root.current, {
                        y: -200,
                        opacity: 1,
                        onComplete() {
                            setIsFinish(false);
                        }
                    });
                }
            }, 300);

            return () => clearTimeout(timeOut);
        }
    }, {
        scope: root,
        dependencies: [isFinish, chooseHero]
    });

    useGSAP(() => {
        if (chooseHero && root.current) {
            gsap.to(root.current, {
                y: -200,
                opacity: 0,
                duration: 1,
            });
        } else {
            gsap.to(root.current, {
                y: 0,
                opacity: 1,
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
                gsap.to('[data-selector="sound.off"]', .3, {
                    y:20,
                });
                gsap.to('[data-selector="sound.on"]', .3, {
                    y: 20,
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
                gsap.to('[data-action="logo"]', .3, {
                    x: 0,
                });
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
                gsap.to('[data-action="logo"]', .3, {
                    x: -12,
                });
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

    const onReset = () => {
        addReset();
    };

    return {
        onClick,
        root,
        toggle: isOpenPreview,
        onToggle,
        isFinish,
        onReset
    };
};

export default useHeader;