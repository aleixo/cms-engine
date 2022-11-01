import { TScope, TSetGlobalScope } from '../types.js';
import { Observer } from '../events/index.js';
import Base from './Base.js';
declare class Scope extends Base {
    #private;
    constructor(observer: Observer);
    get scope(): TScope;
    getGlobalScope<T extends TScope>(namespace?: string, key?: string): T;
    set initialScope(data: TScope);
    set globalScope({ namespace, key, data }: TSetGlobalScope);
}
export default Scope;
