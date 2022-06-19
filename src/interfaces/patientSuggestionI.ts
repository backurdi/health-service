import { suggestionTypeEnum } from 'src/utils/enums/suggestionType.enum';

export interface PatientSuggestions {
  title: string;
  description: string;
  type: suggestionTypeEnum;
}
