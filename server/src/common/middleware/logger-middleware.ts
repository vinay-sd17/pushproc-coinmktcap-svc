import {Logger} from "@nestjs/common";
import {stringifyRequest} from "../utils";

const logger = new Logger("Middleware");
const api_source = "pushproc-coinmktcap-svc-server";

export function logAllRequestResponse(request: any, response: any, next) {
  const {ip, method, originalUrl} = request;
  const userAgent = request.get("user-agent") || "";
  const stringifierRequest = stringifyRequest(request);
  let authToken = JSON.parse(stringifierRequest).authToken;
  authToken = authToken ? authToken : '';
  processLogs({
    data: "## Request start ## " + `${method} ${originalUrl} - ${userAgent} ${ip}`,
    reqres: true
  });
  processLogs({data: stringifierRequest, reqres: true});
  response.on("finish", () => {
    const {statusCode} = response;
    const contentLength = response.get("content-length");
    processLogs({
      data: "## Request End ## " + `${method} ${originalUrl} ${statusCode} ${contentLength} ${authToken} - ${userAgent} ${ip}`,
      reqres: true
    });
    processLogs({
      data: "## Request End ## " + `${method} ${originalUrl} ${statusCode} ${contentLength} ${authToken} - ${userAgent} ${ip}`,
      reqres: true
    })
  });
  next();
}

export function processLogs(data) {
  data['source'] = api_source;
  printLogConsole(data);
  if (process.env.ENV_NAME === 'prod') {
    pushLogsToLogzIo(data)
  }
}

function printLogConsole(data) {
  logger.log(JSON.stringify(data));
}

function pushLogsToLogzIo(data) {
  //todo push logs to cloudwatch/logzio
}
