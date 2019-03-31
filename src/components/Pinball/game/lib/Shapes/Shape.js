/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
export class Shape {
    app;
    color;
    alpha;

    constructor({app, color, alpha = 1}) {
        Object.assign(this, {app, color, alpha});
    }
}
