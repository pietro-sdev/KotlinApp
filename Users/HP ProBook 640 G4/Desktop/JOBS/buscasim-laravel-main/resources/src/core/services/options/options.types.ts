export interface Option {
  id: number;
  key: string;
  value: any;
}

export interface OptionsRequest {
  options: Array<{
    key: string;
    value: any;
  }>;
}
