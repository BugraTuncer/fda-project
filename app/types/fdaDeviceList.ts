export interface FdaDeviceListItem {
  k_number: string;
  device_name: string;
  product_code: string;
  manufacturer: string;
  openfda: {
    device_name?: string;
    medical_specialty_description?: string;
    regulation_number?: string;
    device_class?: string;
    k_number_predicate?: string[];
  };
  applicant?: string;
  decision_date?: string;
  decision_code?: string;
  decision_description?: string;
  advisory_committee_description?: string;
}

export interface FdaDeviceListResponse {
  meta: {
    results: {
      skip: number;
      limit: number;
      total: number;
    };
    disclaimer?: string;
    terms?: string;
    license?: string;
    last_updated?: string;
  };
  results: FdaDeviceListItem[];
}
