/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
export const bindKeyboard = (element, keyCode) => {
    const state = {
        down: false,
        downHandle: () => {},
        upHandle: () => {},
    };
    const __keyDownHandle = function(e) {
        e.preventDefault();
        if (e.keyCode === keyCode) {
            state.down = true;
            state.downHandle();
        }
    };

    const __keyUpHandle = function(e) {
        e.preventDefault();
        if (e.keyCode === keyCode) {
            state.down = false;
            state.upHandle();
        }
    };
    element.addEventListener('keydown', __keyDownHandle, false);
    element.addEventListener('keyup', __keyUpHandle, false);
    return state;
};
