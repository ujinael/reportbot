import { HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface AbstractFindAllRepository<in Input, out Output = Input> {
  findAll(...args: unknown[]): Promise<Output[]> | Observable<Output[]>;
}
export interface AbstractPostRepository<in Input, out Output = Input> {
  post(
    inputDto: Input,
    ...args: unknown[]
  ):
    | Promise<Output>
    | Observable<Output>
    | Promise<Output[]>
    | Observable<Output[]>
    | Promise<HttpStatus>;
}
export interface AbstractUpdateRepository<in Input, out Output = Input> {
  update(
    inputDto: Input,
    ...args: unknown[]
  ):
    | Promise<Output>
    | Observable<Output>
    | Promise<Output[]>
    | Observable<Output[]>
    | Promise<HttpStatus>;
}

export type AbstractRepository<Input, Output = Input> =
  | AbstractFindAllRepository<Input, Output>
  | AbstractPostRepository<Input, Output>
  | AbstractUpdateRepository<Input, Output>;
export interface AbstractMapper<T> {
  mapTo(): T;
}
