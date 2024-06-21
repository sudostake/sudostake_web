// Index signature
// Defines the shape for objects with unique names maping to same value type T
export interface NamedEntityMap<T> {
    [key: string]: T;
}
