import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHeartbeat() {
    let response = {
      "message": "IPX: Notification Service!",
      "timeStamp": new Date()
    };
    return response;
  }
}
