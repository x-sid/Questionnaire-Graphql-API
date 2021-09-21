
class ApiResponse {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found", data) {
    super(true, message, data);
  }
}

class BadRequestResponse extends ApiResponse {
  constructor(message, data) {
    super(false, message, data);
  }
}

class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error", data = {}) {
    super(false, message, data);
  }
}

class SuccessResponse extends ApiResponse {
  constructor(message, data) {
    super(true, message, data);
  }
}

module.exports = {
  NotFoundResponse,
  InternalErrorResponse,
  BadRequestResponse,
  SuccessResponse,
};
