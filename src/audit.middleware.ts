import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import url from 'url';
@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const url = this.fullurl(req);
    try {
      axios.post(process.env.AUDIT_URL, {
        time: new Date().getTime(),
        req_url: url,
        service: 'pastebin',
      });
    } catch {}
    next();
  }
  fullurl(req: Request) {
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl,
    });
  }
}
