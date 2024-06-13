// Defines the shape for objects with unique keys maping to same value type T
export interface IObjectMap<T> {
    [key: string]: T;
}
