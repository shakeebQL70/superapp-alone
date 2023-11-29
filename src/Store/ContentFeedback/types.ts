export interface IContentFeedbackState {
  message: string | null;
  data: any[];
  feedbacks: any[];

  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

export interface IContentFeedbackActions {
  getData: (limit: number, page: number) => void;
  createData: (formDate: FormData) => void;
  updateData: (formDate: FormData, id: string) => void;
}

export type IContentFeedbackStore = IContentFeedbackActions &
  IContentFeedbackState;
