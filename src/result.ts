type Mapper<T, R> = (value: T) => R;
type Matcher<T, R> = Mapper<T, R> | R;

export type Result<T, E> = ResultOk<T, E> | ResultErr<T, E>;

function isFunction<T, R>(value: Mapper<T, R> | R): value is Mapper<T, R> {
  return typeof value === "function";
}

class ResultOk<T, E> {
  constructor(readonly data: T) {}

  isOk(): this is ResultOk<T, E> {
    return true;
  }

  isErr(): this is ResultErr<T, E> {
    return false;
  }

  map<R>(mapper: Mapper<T, R>): Result<R, E> {
    return new ResultOk(mapper(this.data));
  }

  match<R>(ok: Matcher<T, R>, _: Matcher<E, R>): R {
    return isFunction(ok) ? ok(this.data) : ok;
  }
}

class ResultErr<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is ResultOk<T, E> {
    return false;
  }

  isErr(): this is ResultErr<T, E> {
    return true;
  }

  map<R>(_: Mapper<T, R>): Result<R, E> {
    return this as unknown as Result<R, E>;
  }

  match<R>(_: Matcher<T, R>, err: Matcher<E, R>): R {
    return isFunction(err) ? err(this.error) : err;
  }
}

export function ok<T>(value: T): Result<T, never> {
  return new ResultOk(value);
}

export function err<T>(value: T): Result<never, T> {
  return new ResultErr(value);
}
