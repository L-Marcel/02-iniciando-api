import { createConnection, getConnectionOptions } from "typeorm";

export default async(port = 5432, host = "localhost") => {
  const defaultOptions = await getConnectionOptions();
  return await createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === "test"? "rentx_test":"rentx",
      host,
      port
    })
  );
};