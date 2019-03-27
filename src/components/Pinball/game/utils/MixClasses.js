/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
export class MixClasses {
    static mix(...classes) {
        class baseClass {
            constructor(args) {
                for (let b of this.bases) {
                    let obj = new b(args);
                    MixClasses.copy(this, obj);
                }
            }

            get bases() { return classes; }
        }

        // Copy over properties and methods
        for (let oneClass of classes) {
            MixClasses.copy(baseClass, oneClass);
            MixClasses.copy(baseClass.prototype, oneClass.prototype);
        }
        return baseClass;
    }

    static copy(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if (key !== 'constructor' && key !== 'prototype' && key !== '__proto__' && key !== 'name' && key !== 'bases') {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }
}
