import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger
} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

@Injectable()
export class PushProtocolGuard implements CanActivate {

  private readonly logger = new Logger(PushProtocolGuard.name);

  constructor(private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //todo - validated with proper token
    if (request.headers.token === process.env.API_TOKEN) {
      return true;
    }
    return false;
  }
}
