import { IntersectionType } from '@nestjs/swagger';
import { paginationDto } from 'src/features';

export class FindUserDto extends IntersectionType(paginationDto) {}
