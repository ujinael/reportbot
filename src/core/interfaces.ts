import { Observable } from 'rxjs';

export interface AbstractRepository<T> {
  findAll(...args: unknown[]): Promise<T[]> | Observable<T[]>;
}
export interface AbstractMapper<T> {
  mapTo(): T;
}
