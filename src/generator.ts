type Predicate<T> = (value: T) => boolean;
type Mapper<T, R> = (value: T) => R;
type FlatMapper<T, R> = Mapper<T, Iterable<R>>;

export function every<T>(data: Iterable<T>, fn: Predicate<T>): boolean {
  for (const item of data) {
    if (!fn(item)) {
      return false;
    }
  }

  return true;
}

export function* filter<T>(data: Iterable<T>, fn: Predicate<T>): Generator<T> {
  for (const item of data) {
    if (fn(item)) {
      yield item;
    }
  }
}

export function* flatMap<T, R>(
  data: Iterable<T>,
  fn: FlatMapper<T, R>,
): Generator<R> {
  for (const item of data) {
    for (const result of fn(item)) {
      yield result;
    }
  }
}

export function* map<T, R>(data: Iterable<T>, fn: Mapper<T, R>): Generator<R> {
  for (const item of data) {
    yield fn(item);
  }
}

export function* merge<T>(...generators: Generator<T>[]): Generator<T> {
  for (const i of generators) {
    yield* i;
  }
}

export function some<T>(data: Iterable<T>, fn: Predicate<T>): boolean {
  for (const item of data) {
    if (fn(item)) {
      return true;
    }
  }

  return false;
}

export function* take<T>(data: Iterable<T>, count: number): Generator<T> {
  let quantity = 1;
  for (const item of data) {
    if (quantity > count) {
      break;
    }

    quantity++;
    yield item;
  }
}

export function toSet<T>(data: Iterable<T>): Set<T>;
export function toSet<T, R>(data: Iterable<T>, mapper: Mapper<T, R>): Set<R>;
export function toSet<T, R>(
  data: Iterable<T>,
  mapper?: Mapper<T, R>,
): Set<unknown> {
  if (mapper) {
    return new Set(map(data, mapper));
  }

  return new Set(data);
}

export function toArray<T>(data: Iterable<T>): T[];
export function toArray<T, R>(data: Iterable<T>, mapper: Mapper<T, R>): R[];
export function toArray<T, R>(
  data: Iterable<T>,
  mapper?: Mapper<T, R>,
): unknown[] {
  if (mapper) {
    return Array.from(data, mapper);
  }

  return Array.from(data);
}
