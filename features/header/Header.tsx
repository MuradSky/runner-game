'use client';
import { memo } from 'react';

import Button from 'components/button';
import { classNames } from 'utils';

import useHeader from './useHeader';

import Logo from 'assets/svg/logo.svg';
import LogoIcon from 'assets/svg/logo-icon.svg';
import SoundOn from 'assets/svg/sound-on.svg';
import SoundOff from 'assets/svg/sound-off.svg';
import Arrow from 'assets/svg/arrow.svg';
import Reload from 'assets/svg/reload.svg';
import styles from './Header.module.scss';

const Header = () => {
    const {
        onClick,
        root,
        toggle,
        onToggle,
        isFinish,
        onReset
    } = useHeader();

    if (isFinish) {
        return (
            <header ref={root} className={styles.block}>
                <div className={classNames(styles.wrap, styles.second, 'container')}>
                    <a href="/"
                        className={styles.reset}
                        onClick={onReset}
                    >
                        <Reload />
                    </a>
                    <div className={styles.logo}>
                        <LogoIcon/>
                        <span><Logo /></span>
                    </div>
                    <Button cssClass={styles.sound} onClick={onToggle}>
                        <span>
                            <SoundOn data-selector="sound.on"/>
                            <SoundOff data-selector="sound.off"/>
                        </span>
                    </Button>
                </div>
            </header>
        );
    }

    return (
        <header ref={root} className={styles.block}>
            <div className={classNames(styles.wrap, 'container')}>
                <button className={styles.logo} onClick={onClick}>
                    <span className={classNames(styles.logo_icon, toggle && styles.is_active)}>
                        <LogoIcon data-selector="logo.icon" />
                        <span className={styles.logo_arrow} data-selector="logo.arrow">
                            <Arrow />
                        </span>
                    </span>
                    <span><Logo /></span>
                </button>
                <Button cssClass={styles.sound} onClick={onToggle}>
                    <span>
                        <SoundOn data-selector="sound.on"/>
                        <SoundOff data-selector="sound.off"/>
                    </span>
                </Button>
            </div>
        </header>
    );
};

export default memo(Header);
