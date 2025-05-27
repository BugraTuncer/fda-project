import { useQuery } from "@tanstack/react-query";
import staticDevices, { type StaticDevice } from "../api/data";
import type { FdaDeviceListResponse } from "../types/fdaDeviceList";

interface UseDevicesOptions {
  limit?: number;
  page?: number;
  searchTerm?: string;
}

const convertToFdaFormat = (device: StaticDevice) => ({
  k_number: device.k_number,
  device_name: device.device_name,
  product_code: device.product_code,
  applicant: device.manufacturer,
  decision_date: device.clearance_date,
  decision_code: device.decision_code,
  manufacturer: device.manufacturer,
  decision_description: device.decision_description,
  openfda: {
    device_name: device.device_name,
    device_class: device.device_class,
    k_number_predicate: device.predicate_k_numbers,
  },
});

const fetchStaticDevices = async (
  limit: number,
  skip: number,
  searchTerm: string = ""
): Promise<FdaDeviceListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filteredDevices = staticDevices;

  if (searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filteredDevices = staticDevices.filter(
      (device) =>
        device.device_name.toLowerCase().includes(lowerSearchTerm) ||
        device.manufacturer.toLowerCase().includes(lowerSearchTerm) ||
        device.k_number.toLowerCase().includes(lowerSearchTerm)
    );
  }

  const total = filteredDevices.length;
  const paginatedDevices = filteredDevices.slice(skip, skip + limit);

  return {
    meta: {
      results: {
        skip,
        limit,
        total,
      },
    },
    results: paginatedDevices.map(convertToFdaFormat),
  };
};

export const useDevices = (options: UseDevicesOptions = {}) => {
  const { limit = 10, page = 1, searchTerm = "" } = options;
  const skip = (page - 1) * limit;

  return useQuery<FdaDeviceListResponse, Error>({
    queryKey: ["devices", { limit, page, searchTerm }],
    queryFn: () => fetchStaticDevices(limit, skip, searchTerm),
    placeholderData: (previousData) => previousData,
  });
};
