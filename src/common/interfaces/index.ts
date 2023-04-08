export interface Response {
  statusCode: number;
  body: any[] | string;
}

export interface Controller<Input, Output> {
  exec: (event: Input) => Promise<Output>;
}

export interface Repository<Input, Output> {
  exec: (param: Input) => Promise<Output>;
}

export interface UseCase<Input, Output> {
  exec: (param: Input) => Promise<Output>;
}
