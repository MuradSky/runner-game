import { memo } from 'react';

import { classNames } from 'utils';
import Text from 'components/text';

import styles from './Scene.module.scss';
import useScene from './useScene';

const data = [
    { id: 1, person: 'maks', name: 'Максим', pos: 'Маркетолог', text: 'Борется за узнаваемость бренда и привлечение новых клиентов' },
    { id: 2, person: 'rom', name: 'РОМА', pos: 'Руководитель', text: 'Заботится о привлечении и удержании талантов в компании. Переживает за вовлеченность и лояльность сотрудников' },
    { id: 3, person: 'ann', name: 'Анна', pos: 'HR-директор', text: 'Заботится о привлечении и удержании талантов в компании. Переживает за вовлеченность и лояльность сотрудников' },
];

const Scene = () => {
    const { choosePerson, hero, root } = useScene();
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

                <div className={styles.heros}>
                    
                    {data.map(item => (
                        <div
                            key={item.id}
                            className={
                                classNames(
                                    styles.hero,  
                                    (hero === item.person ) ? styles.is_show : hero && styles.is_hidden
                                )
                            }
                            data-person={item.person}
                            role='presentation'
                            onClick={choosePerson(item.person)}
                        >
                            <picture>
                                <img src={`/parson-static/${item.person}.webp`} alt="" />
                            </picture>

                            <div className={styles.hero_info}>
                                <div className={styles.hero_name}>{item.name}</div>
                                <div className={styles.hero_pos}>{item.pos}</div>
                                <div className={styles.hero_text}>{item.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={classNames(styles.ribbon, styles.default)}>
                <img src="/images/ribbon.webp" alt="" />
            </div>
        </div>
    );
};

export default memo(Scene);
