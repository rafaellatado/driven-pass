import 'express';

declare module 'express' {
  interface Response {
    locals: {
      userId?: number;
      [key: string]: any;
    }
  }
}
