module.exports.Response = class Response {
  constructor({ status = false, error = null, content = null }) {
    this.status = status;
    this.error = error;
    this.content = content;
  }

}

module.exports.ResponseError = class ResponseError {
  constructor({ status, message, reason, url, ip }) {
    this.status = status;
    this.message = message;
    this.reason = reason;
    this.url = url;
    this.ip = ip;
  }
}