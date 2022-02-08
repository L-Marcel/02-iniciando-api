declare module Express {
  interface Request {
    //...
  };
  interface Response {
    //...
  };
  interface NextFunction {
    //...
  };
};

declare type Req = import("express").Request;
declare type Res = import("express").Response;
declare type Next = import("express").NextFunction;
declare type Err = { message: string; };