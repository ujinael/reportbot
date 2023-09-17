import { PartialType } from '@nestjs/mapped-types';
import { CreateCallTouchRequestDto } from './create-request.dto';

export class UpdateCallTouchRequestDto extends PartialType(
  CreateCallTouchRequestDto,
) {}
