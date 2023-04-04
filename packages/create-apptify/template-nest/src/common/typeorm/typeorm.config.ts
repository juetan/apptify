import { ConfigService } from '@nestjs/config';

console.log('11');

const configService = new ConfigService({});

console.log(configService.get('SERVER_PORT'));
