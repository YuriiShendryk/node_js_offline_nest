export type UserSearchField = 'id' | 'email';

export type UserSearchOptions = {
  column: UserSearchField;
  value: string | number;
  withRelations?: boolean;
};
