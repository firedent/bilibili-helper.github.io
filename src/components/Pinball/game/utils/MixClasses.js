/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
export class MixClasses {
    static mix(...classes) {
        class baseClass {
            constructor(args) {
                MixClasses.o(this, args, this.bases, 0, this.bases.length);
            }

            get bases() { return classes; }
        }

        // Copy over properties and methods
        //return baseClass;
        return this.c(baseClass, classes, 0, classes.length);
    }

    static o(target, args, bases, i, length) {
        //if (i < length) {
        //    const oneObject = new bases[i](args);
        //    console.log(oneObject);
        //    if (i === 0) {
        //        target = oneObject;
        //    } else {
        //        //target && MixClasses.copy(target, oneObject);
        //        target.__proto__ = oneObject;
        //    }
        //    target.__proto__ && MixClasses.o(target.__proto__, args, bases, ++i, length);
        //}
        for (let base of bases) {
            const o = new base(args);
            MixClasses.copy(target, o);
            //MixClasses.copy(target.__proto__, o.__proto__);
        }
    }

    static c(target, classes, i = 0, length) {
        //if (i < length) {
        //    const oneClass = classes[i];
        //    if (i === 0) {
        //        target = oneClass;
        //    } else {
        //        target && MixClasses.copy(target, oneClass);
        //        //target.prototype && MixClasses.copy(target.prototype, oneClass.prototype);
        //    }
        //    target.prototype && MixClasses.c(target.prototype, classes, ++i, length);
        //}
        for (let oneClass of classes) {
            MixClasses.copy(target, oneClass);
            MixClasses.copy(target.prototype, oneClass.prototype);
            //console.log(target, target.prototype);
        }
        return target;
    }

    static copy(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }
}
