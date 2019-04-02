import {BOTTOM, CENTER, EPSILON, LEFT, LimitedVector2, NOT_INTERSECT, RIGHT, TOP, Vector2} from 'Pinball/game/lib-old';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Movable} from './Movable';
import {RoundedRect} from 'Pinball/game/lib-old/Shapes';
import {Collision} from 'Pinball/game/lib-old/Collision';

export class MovableRoundedRect extends RoundedRect {
    keyPoints = [];

    constructor(options) {
        super(options);
        this.movable = new Movable({item: this.item, ...options});
        this.collision = new Collision({item: this.item, movable: this.movable, carrier: this, app: this.app});
        this.initKeyPoints();
    }

    get center() {
        return new LimitedVector2(this.movable.position.x + this.halfWidth, this.movable.position.y + this.halfHeight);
    }

    initKeyPoints() {
        this.keyPoints.push(new Vector2(this.movable.position.x + this.radius[0], 0));
        this.keyPoints.push(new Vector2(this.movable.position.x + this.width - this.radius[1], 0));
        this.keyPoints.push(new Vector2(this.movable.position.x + this.width, this.radius[1]));
        this.keyPoints.push(new Vector2(this.movable.position.x + this.width, this.height - this.radius[2]));
        this.keyPoints.push(new Vector2(this.movable.position.x + this.width - this.radius[2], this.height));
        this.keyPoints.push(new Vector2(this.movable.position.x + this.radius[3], this.height));
        this.keyPoints.push(new Vector2(this.movable.position.x, this.height - this.radius[3]));
        this.keyPoints.push(new Vector2(this.movable.position.x, this.radius[0]));
    }

    collisionCheckWithMap() {
        const {width, height} = this.app;
        const thisPosition = this.movable.position;
        const thisVelocity = this.movable.velocity;

        const collisionRes = this.collision.checkBBox(this.app.map, 'in');
        if (collisionRes[0] === CENTER && collisionRes[1] === CENTER) return this;

        if (collisionRes[0] === LEFT) {
            thisPosition.x = this.halfWidth;
            thisVelocity.negateX();
        } else if (collisionRes[0] === RIGHT) {
            thisPosition.x = width - this.halfWidth;
            thisVelocity.negateX();
        }

        if (collisionRes[1] === TOP) {
            thisPosition.y = this.halfHeight;
            thisVelocity.negateY();
        } else if (collisionRes[1] === BOTTOM) {
            thisPosition.y = height - this.halfHeight;
            thisVelocity.negateY();
        }
        return this;
    }
}
