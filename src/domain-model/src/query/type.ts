export type Nullable<T> = T | null;

export type OrderBy = 'ASC' | 'DESC';

export type PagingInputData = {
  cursor?: Nullable<string>;
  skip?: Nullable<number>;
  take?: Nullable<number>;
};

export type PageInfo = {
  totalCount: number;
  hasNextPage: boolean;
  endCursor: string;
};
