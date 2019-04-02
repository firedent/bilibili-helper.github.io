/**
 * Author: DrowsyFlesh
 * Create: 2019/3/29
 * Description:
 */

export const EPSILON = 0.001; // 最小精度，影响缓动流畅度

/**
 * 碰撞检测方位常量
 */

export const TOP = 'top';
export const RIGHT = 'right';
export const BOTTOM = 'bottom';
export const LEFT = 'left';
export const CENTER = 'center';

export const SAME = -2; // 完全对齐
export const CONTAIN = -1 // 完全包含
export const NOT_INTERSECT = 0; // 不交

export const TOP_ADJACENT = 2; // 上相邻
export const TOP_INTERSECT = 3; // 上交
export const TOP_ALIGN = 4; // 上对齐

export const BOTTOM_ALIGN = 5; // 下对齐
export const BOTTOM_INTERSECT = 6; // 下交
export const BOTTOM_ADJACENT = 7; // 下相邻

export const LEFT_ADJACENT = 12; // 左相邻
export const LEFT_INTERSECT = 13; // 左相交
export const LEFT_ALIGN = 14; // 左对齐

export const RIGHT_ALIGN = 15; // 右对齐
export const RIGHT_INTERSECT = 16; // 右相交
export const RIGHT_ADJACENT = 17; // 右相邻
