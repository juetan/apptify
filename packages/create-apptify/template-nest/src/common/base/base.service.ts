import { LoggerService } from '../logger/logger.service';

export class BaseService {
  constructor(protected readonly loogerService: LoggerService) {}
}
