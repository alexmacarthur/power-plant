export type Constructor<T = {}> = new (...args: any[]) => T;

export type InstanceType<T> = T extends Constructor<infer U> ? U : never;
