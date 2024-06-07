import { AccountTemplate, BlogTemplate} from '@/types/Templates';

export interface Result {
  message: string;
  error: string | null;
  success: boolean;
  payload: AccountTemplate | BlogTemplate | null | BlogTemplate[]
}