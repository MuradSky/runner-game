import m_o_1 from 'assets/ochivki/maks/green_icon_appear_1.json';
import m_o_2 from 'assets/ochivki/maks/green_icon_appear_2.json';
import m_o_3 from 'assets/ochivki/maks/green_icon_appear_3.json';

import m_l_1 from 'assets/ochivki/maks/green_icon_loop_1.json';
import m_l_2 from 'assets/ochivki/maks/green_icon_loop_2.json';
import m_l_3 from 'assets/ochivki/maks/green_icon_loop_3.json';

import m_d_1 from 'assets/ochivki/maks/green_icon_disappear_1.json';
import m_d_2 from 'assets/ochivki/maks/green_icon_disappear_2.json';
import m_d_3 from 'assets/ochivki/maks/green_icon_disappear_3.json';

import r_o_1 from 'assets/ochivki/rom/blue_icon_appear_1.json';
import r_o_2 from 'assets/ochivki/rom/blue_icon_appear_2.json';
import r_o_3 from 'assets/ochivki/rom/blue_icon_appear_3.json';
import r_l_1 from 'assets/ochivki/rom/blue_icon_loop_1.json';
import r_l_2 from 'assets/ochivki/rom/blue_icon_loop_2.json';
import r_l_3 from 'assets/ochivki/rom/blue_icon_loop_3.json';
import r_d_1 from 'assets/ochivki/rom/blue_icon_disappear_1.json';
import r_d_2 from 'assets/ochivki/rom/blue_icon_disappear_2.json';
import r_d_3 from 'assets/ochivki/rom/blue_icon_disappear_3.json';

import a_o_1 from 'assets/ochivki/ann/orange_icon_appear_2.json';
import a_o_2 from 'assets/ochivki/ann/orange_icon_appear_1.json';
import a_o_3 from 'assets/ochivki/ann/orange_icon_appear_3.json';
import a_l_1 from 'assets/ochivki/ann/orange_icon_loop_2.json';
import a_l_2 from 'assets/ochivki/ann/orange_icon_loop_1.json';
import a_l_3 from 'assets/ochivki/ann/orange_icon_loop_3.json';
import a_d_1 from 'assets/ochivki/ann/orange_icon_disappear_2.json';
import a_d_2 from 'assets/ochivki/ann/orange_icon_disappear_1.json';
import a_d_3 from 'assets/ochivki/ann/orange_icon_disappear_3.json';

const data: { [key: string]: { [key: string]: unknown[] } }  = {
    maks: {
        intro: [m_o_1, m_o_2, m_o_3],
        loop: [m_l_1, m_l_2, m_l_3],
        outro: [m_d_1, m_d_2, m_d_3]
    },
    rom: {
        intro: [r_o_1, r_o_2, r_o_3],
        loop: [r_l_1, r_l_2, r_l_3],
        outro: [r_d_1, r_d_2, r_d_3]
    },
    // ann: [a_o_1, a_o_2, a_o_3],

    ann: {
        intro: [a_o_1, a_o_2, a_o_3],
        loop: [a_l_1, a_l_2, a_l_3],
        outro: [a_d_1, a_d_2, a_d_3]
    },
};

export { data };

export const icons: { [key: string]: string[] }  = {
    maks: ['/ochivki/m-1.png', '/ochivki/m-2.png', '/ochivki/m-3.png'],
    rom: ['/ochivki/r-1.png', '/ochivki/r-2.png', '/ochivki/r-3.png'],
    ann: ['/ochivki/a-1.png', '/ochivki/a-2.png', '/ochivki/a-3.png'],
};