import { Howl, Howler } from 'howler';
import { useEffect, useRef } from 'react';

const useHowler = (src: string, volume = 0.4) => {
    const sound = useRef<null | Howl>(null);
    useEffect(() => {
        sound.current = new Howl({
            src: [src],
            loop: true,
            preload: true,
        });
        Howler.volume(volume);
        return () => {
            if (sound.current) {
                sound.current.unload();
                sound.current = null;
            }
        };
    }, []);

    const play = () => {
        sound.current?.fade(0, 0.4, 1000);
        sound.current?.play();
    };

    const pause = () => {
        sound.current?.fade(0.4, 0, 1000);
        setTimeout(() => {
            sound.current?.pause();
        }, 1000);
    };

    return [play, pause];
};

export default useHowler;
