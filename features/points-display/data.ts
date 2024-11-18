import m_o_1 from 'assets/ochivki/maks/green_icon_appear_1.json';
import m_o_2 from 'assets/ochivki/maks/green_icon_appear_2.json';
import m_o_3 from 'assets/ochivki/maks/green_icon_appear_3.json';

import r_o_1 from 'assets/ochivki/rom/blue_icon_appear_1.json';
import r_o_2 from 'assets/ochivki/rom/blue_icon_appear_2.json';
import r_o_3 from 'assets/ochivki/rom/blue_icon_appear_3.json';

import a_o_1 from 'assets/ochivki/ann/orange_icon_appear_2.json';
import a_o_2 from 'assets/ochivki/ann/orange_icon_appear_1.json';
import a_o_3 from 'assets/ochivki/ann/orange_icon_appear_3.json';

const data: { [key: string]: unknown[] }  = {
    maks: [m_o_1, m_o_2, m_o_3],
    rom: [r_o_1, r_o_2, r_o_3],
    ann: [a_o_1, a_o_2, a_o_3],
};

export { data };

export const icons: { [key: string]: string[] }  = {
    maks: ['/ochivki/m-1.png', '/ochivki/m-2.png', '/ochivki/m-3.png'],
    rom: ['/ochivki/r-1.png', '/ochivki/r-2.png', '/ochivki/r-3.png'],
    ann: ['/ochivki/a-1.png', '/ochivki/a-2.png', '/ochivki/a-3.png'],
};