// Index signature
// Defines the shape for objects with unique names maping to the same data type T
export interface NamedEntityMap<T> {
    [key: string]: T;
}
