import { memo } from 'react';

import useResult from './useResult';
import { data } from './data';
import styles from './Result.module.scss';
import Button from 'components/button';

import { classNames } from 'utils';

const Result = () => {
    const {
        root,
        hero,
        isWin,
        coins,
        openWin,
        isMobile,
        isGameFail,
    } = useResult();

    return (
        <>
            <div className={classNames(styles.block, isGameFail && styles.is_fail)} ref={root}>    
                <div className={styles.wrap}>
                    {(!isGameFail && !isMobile) && (
                        <div className={styles.confeti} data-selector="confeti" />
                    )}
                    <div className={styles.content}>
                        <div className={styles.title}>
                            {isWin ? 'Магистр геймификации' : 'Почтииииии'}
                        </div>
                        {!isWin &&
                            <div className={styles.info}>
                                Не повезло собрать все секреты геймификации — повезёт в любви
                            </div>
                        }
                        <div className={styles.alert}>
                            <span>Твоя награда:</span>
                            <p>Консультация по внедрению геймификации для роста метрик</p>
                        </div>
                        <a href="https://utopiait.ru/" target="_blank" rel="noreferrer">
                            <Button cssClass={styles.regist}>
                                Записаться на консультацию <span>за 0₽</span>
                            </Button> 
                        </a>
                        <div className={styles.off}>3 дня до окончания оффера</div>
                        <div className={classNames(
                            styles.coins,
                            styles['_'+coins]
                        )}
                        >
                            <div className={styles.item} role="presentation" onClick={openWin(1)} >
                                <i>
                                    <img
                                        src={
                                            hero === 'maks' ? '/ochivki/m-1.png' :
                                                hero === 'rom' ? '/ochivki/r-1.png' :
                                                    '/ochivki/a-1.png'
                                        }
                                        alt=""
                                    />
                                </i>
                                <span>{hero && data[hero][0]}</span>
                            </div>
                            <div className={styles.item} role="presentation" onClick={openWin(2)}>
                                <i>
                                    <img
                                        src={
                                            hero === 'maks' ? '/ochivki/m-2.png' :
                                                hero === 'rom' ? '/ochivki/r-2.png' :
                                                    '/ochivki/a-2.png'
                                        }
                                        alt=""
                                    />
                                </i>
                                <span>{hero && data[hero][1]}</span>
                            </div>
                            <div className={styles.item} role="presentation" onClick={openWin(3)}>
                                <i>
                                    <img
                                        src={
                                            hero === 'maks' ? '/ochivki/m-3.png' :
                                                hero === 'rom' ? '/ochivki/r-3.png' :
                                                    '/ochivki/a-3.png'
                                        }
                                        alt=""
                                    />
                                </i>
                                <span>{hero && data[hero][2]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classNames(styles.ribbon)}>
                <picture>
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                    <img src="/images/ribbon.webp" alt="" data-selector="game.bg" />
                </picture>
            </div>
        </>
       
    );
};

export default memo(Result);
