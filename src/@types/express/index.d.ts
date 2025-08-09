import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Locals {
    userId?: number;
    [key: string]: any;
  }
}
