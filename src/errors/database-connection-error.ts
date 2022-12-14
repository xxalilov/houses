import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connection database";

  constructor() {
    super("Error connection database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
