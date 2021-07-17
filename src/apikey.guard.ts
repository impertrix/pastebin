import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const api_key = process.env.API_KEY;
    if (!api_key) {
      return false;
    }

    if (req.headers.api_key === api_key) {
      return true;
    }

    return false;
  }
}
