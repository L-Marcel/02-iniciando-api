/* eslint-disable @typescript-eslint/no-empty-interface */
declare namespace Express {
  interface Request {
    //...
  }
  interface Response {
    //...
  }
  interface NextFunction {
    //...
  }
}
/* eslint-enable @typescript-eslint/no-empty-interface */

declare type Req = import("express").Request;
declare type Res = import("express").Response;
declare type Next = import("express").NextFunction;
declare type Err = { message: string; };