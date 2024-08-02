type Constructor<T = {}> = new (...args: any[]) => T;
export declare const container: Map<any, any>;
export declare function register(args?: any[]): (clazz: any) => void;
export declare function inject(clazz: Constructor): (_value: any, context: any) => void;
export {};
