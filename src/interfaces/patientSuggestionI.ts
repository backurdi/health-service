import { Types } from 'mongoose';
import { suggestionTypeEnum } from 'src/utils/enums/suggestionType.enum';

export interface PatientSuggestions {
  _id: Types.ObjectId;
  title: string;
  description: string;
  type: suggestionTypeEnum;
  done: boolean;
}
