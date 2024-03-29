type ResultOk<T> = { ok: true; data: T };

type ResultErr<T> = { ok: false; err: T };

export type Result<T, TError> = ResultOk<T> | ResultErr<TError>;

export function err<T>(value: T): Result<never, T> {
  return { ok: false, err: value };
}

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, data: value };
}
