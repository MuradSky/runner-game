import { memo } from 'react';

import useWinModal from './useWinModal';
import Button from 'components/button';

import Sparkle from 'assets/svg/sparkle.svg';
import Logo from 'assets/icons/logo.svg';
import Ochivka from 'assets/icons/ochivka.svg';
import styles from './WinModal.module.scss';

const WinModal = () => {
    const { current, scene, hero, root, onClick, isClosed } = useWinModal();
    return (
        <div className={styles.block} ref={root}>
            <div className={styles.wrap}>
                <div className={styles.modal}>
                    <div className={styles.logo} data-type={hero}>
                        <Logo />
                    </div>
                    <div className={styles.coin}>
                        <Ochivka />
                        <div className={styles.anim} data-action="coin.anim" />
                    </div>
                    <div className={styles.title}>
                        {current && current[scene || 0]?.title}
                    </div>

                    <div className={styles.alert}>
                        <Sparkle />
                        <p>
                            {current && current[scene || 0]?.alert}
                        </p>
                    </div>

                    <div className={styles.text}>
                        <p>
                            {current && current[scene || 0]?.text}
                        </p>
                    </div>

                    <Button cssClass={styles.button} onClick={onClick}>
                        { !isClosed ? 'Продолжить!' : 'Закрыть'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(WinModal);
