export type TQuestions = {
  id: string;
  name: string;
  type: string;
  value: string;
}

export type TResponse = {
    submissionId: string;
    submissionTime: string;
    lastUpdatedAt: string;
    questions: TQuestions[];
    calculations: unknown[];
    urlParameters: unknown[];
    quiz: unknown;
    documents: unknown[];
    editLink?: string;
}

export type TWholeResponse = {
  responses: TResponse[];
  totalResponses: number;
  pageCount: number;
}

export type TFilterClause = {
	id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}

export type TQueryParams = {
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: 'in_progress' | 'finished';
  includeEditLink?: boolean;
  filters?: string;
  sort?: string;
}