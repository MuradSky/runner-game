import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useScreenSize } from 'hooks';
import { classNames } from 'utils';
import Text from 'components/text';
import Button from 'components/button';
import useScene from './useScene';

import Prev from 'assets/svg/prev.svg';
import Next from 'assets/svg/next.svg';
import styles from './Scene.module.scss';

const data = [
    { id: 1, person: 'maks', name: 'Максим', pos: 'Маркетолог', text: 'Борется за узнаваемость бренда и привлечение новых клиентов' },
    { id: 2, person: 'rom', name: 'РОМА', pos: 'Руководитель', text: 'Помогает бизнесу расти через внедрение инноваций и цифровизацию' },
    { id: 3, person: 'ann', name: 'Анна', pos: 'HR-директор', text: 'Заботится о привлечении и удержании талантов в компании. Переживает за вовлеченность и лояльность сотрудников' },
];

const Scene = () => {
    const { isMobile } = useScreenSize();
    const {
        choosePerson,
        hero,
        root,
        onMouseEnter,
        onMouseLeave,
        choosePersonMobile,
        setSwiper,
        onPrev,
        onNext
    } = useScene();
    return (
        <div className={styles.block} ref={root}>
            <div className={styles.content}>
                <div>
                    <div className={styles.title} data-selector="content.title">
                        Выбери героя
                    </div>
                    <Text cssClass={styles.text} data-selector="content.text">
                        У каждого персонажа своя история и бизнес-задачи, узнай о нем больше во время игры
                    </Text>
                </div>

                {isMobile ? 
                    <Swiper
                        slidesPerView={1}
                        className={styles.heros}
                        onSwiper={s => setSwiper(s)}
                    >
                        {data.map(item => (
                            <SwiperSlide
                                key={item.id}
                                className={styles.slides_item}
                            >
                                <div
                                    className={
                                        classNames(
                                            styles.hero,  
                                            (hero === item.person) ? styles.is_show : hero && styles.is_hidden
                                        )
                                    }
                                    data-person={item.person}
                                    role='presentation'
                                >
                                    <div className={styles.person}>
                                        <picture>
                                            <img src={`/parson-static/${item.person}.webp`} alt="" />
                                        </picture>
                                        <div className={styles.person_anim} data-action="person.anim" />
                                    </div>

                                    <div className={styles.hero_info}>
                                        <div className={styles.hero_name}>{item.name}</div>
                                        <div className={styles.hero_pos}>{item.pos}</div>
                                        <div className={styles.hero_text}>{item.text}</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper> :
                    <div
                        className={styles.heros}
                    >
                        {data.map(item => (
                            <div
                                key={item.id}
                                className={
                                    classNames(
                                        styles.hero,  
                                        (hero === item.person) ? styles.is_show : hero && styles.is_hidden
                                    )
                                }
                                data-person={item.person}
                                role='presentation'
                                onClick={choosePerson}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                <div className={styles.person}>
                                    <picture>
                                        <img src={`/parson-static/${item.person}.webp`} alt="" />
                                    </picture>
                                    <div className={styles.person_anim} data-action="person.anim" />
                                </div>

                                <div className={styles.hero_info}>
                                    <div className={styles.hero_name}>{item.name}</div>
                                    <div className={styles.hero_pos}>{item.pos}</div>
                                    <div className={styles.hero_text}>{item.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            {isMobile && 
                <>
                    <button className={styles.prev} onClick={onPrev}>
                        <Prev />
                    </button>
                    <div className={styles.button}>
                        <Button onClick={choosePersonMobile}>Выбрать  персонажа</Button>
                    </div>
                    <button className={styles.next} onClick={onNext}>
                        <Next />
                    </button>
                </>
            }
            <div className={classNames(styles.ribbon, styles.default)}>
                <img src="/images/ribbon.webp" alt="" />
            </div>
        </div>
    );
};

export default memo(Scene);
