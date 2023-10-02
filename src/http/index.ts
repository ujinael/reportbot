import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpOneSConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    const baseURL = this.configService.get<string>('api.host');
    const authString = this.configService.get<string>('api.authString');
    return {
      headers: {
        Authorization: 'Basic ' + authString,
      },
      baseURL,
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
@Injectable()
export class HttpCallTouchConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    const baseURL = this.configService.get<string>('calltouch.host');
    return {
      baseURL,
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
