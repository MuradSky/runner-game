import { memo } from 'react';

import Text from 'components/text';
import Runner from 'features/runner';
import useGame from './useGame';
import { classNames } from 'utils';

import Click from 'assets/svg/click.svg';
import Space from 'assets/svg/space.svg';
import Up from 'assets/svg/up.svg';
import styles from './Game.module.scss';

const Game = () => {
    const { root, isClear, isStart } = useGame();
    return (
        <div className={styles.block} ref={root}>
            {isStart && <Runner isClear={isClear} isStart={isStart} />}
            {!isStart &&
                <div className={classNames(styles.ribbon, !isClear && styles.default)}>
                    <picture>
                        <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                        <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                    </picture>
                </div>
            }
            <div
                className={styles.preview}
                data-seletor="game.preview"
            >
                <div className={styles.preview_top}>
                    <div className={styles.preview_title}>
                        готов попрыгать?
                    </div>
                    <Text cssClass={styles.preview_text}>
                        А теперь нажми на любую часть экрана, чтобы начать игру
                    </Text>
                </div>

                <div className={styles.preview_bottom}>
                    <Text>
                        Способы управлять героем:
                    </Text>

                    <div className={styles.preview_flex}>
                        <div className={styles.preview_item}>
                            <Click />
                            <span>Клик</span>
                        </div>
                        <div className={styles.preview_item}>
                            <Space />
                            <span>Пробел</span>
                        </div>
                        <div className={styles.preview_item}>
                            <Up />
                            <span>Стрелочка</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Game);
