import { IsEnum } from 'class-validator';
import { suggestionTypeEnum } from 'src/utils/enums/suggestionType.enum';

export class AddSuggestionDto {
  readonly title: string;
  readonly description: string;

  @IsEnum(suggestionTypeEnum)
  readonly type: string;
}
