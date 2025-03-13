export type FilterFormArray = { type?: number[]; abilities?: number[] };

export type FilterFormName = { name: string };

export type FilterForm = FilterFormArray & FilterFormName;
