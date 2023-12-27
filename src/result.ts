type ResultOk<T> = {
  ok: true;
  data: T;
};

type ResultError<T> = {
  ok: false;
  error: T;
};

export type Result<T, TError> = ResultOk<T> | ResultError<TError>;

export function error<T>(value: T): Result<never, T> {
  return { ok: false, error: value };
}

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, data: value };
}
