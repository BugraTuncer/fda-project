import React from "react";
import RelationalDevices from "~/components/devices/RelationalDevices";
import { selectSelectedDeviceInfo } from "~/store/slices/selectedDeviceSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import staticDevices, { type StaticDevice } from "~/api/data";
import type {
  FdaDeviceListItem,
  FdaDeviceListResponse,
} from "~/types/fdaDeviceList";
import LoadingSpinner from "~/components/common/LoadingSpinner";

const MAX_GRAPH_RELATED_DEVICES = 5;

const convertToFdaFormat = (device: StaticDevice): FdaDeviceListItem => ({
  k_number: device.k_number,
  device_name: device.device_name,
  product_code: device.product_code,
  applicant: device.manufacturer,
  decision_date: device.clearance_date,
  decision_code: device.decision_code,
  decision_description: device.decision_description,
  openfda: {
    device_name: device.device_name,
    device_class: device.device_class,
    k_number_predicate: device.predicate_k_numbers,
  },
  manufacturer: device.manufacturer,
});

const fetchRelatedDevicesStatic = async (
  selectedKNumber: string
): Promise<FdaDeviceListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mainPredicateKNumbers = staticDevices.find(
    (device) => device.k_number === selectedKNumber
  )?.predicate_k_numbers;

  const relatedDevices = staticDevices.filter((device) =>
    mainPredicateKNumbers?.includes(device.k_number)
  );

  return {
    meta: { results: { skip: 0, limit: 0, total: 0 } },
    results: relatedDevices.map(convertToFdaFormat),
  };
};

const RelationalDevicesContainer = () => {
  const navigate = useNavigate();
  const reduxSelectedDeviceInfo = useSelector(selectSelectedDeviceInfo);

  const mainDeviceData = reduxSelectedDeviceInfo;
  const selectedKNumber = reduxSelectedDeviceInfo?.k_number;

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "relatedDevices",
      selectedKNumber,
      reduxSelectedDeviceInfo?.product_code,
    ],
    queryFn: async () => {
      if (!reduxSelectedDeviceInfo?.product_code || !selectedKNumber) {
        console.warn(
          "No product code or K number available to fetch related devices."
        );
        return {
          meta: { results: { skip: 0, limit: 0, total: 0 } },
          results: [],
        };
      }
      return fetchRelatedDevicesStatic(selectedKNumber);
    },
    enabled: !!reduxSelectedDeviceInfo && !!selectedKNumber,
  });

  const allFetchedRelatedDevices: FdaDeviceListItem[] = React.useMemo(() => {
    if (!queryData || !queryData.results) {
      return [];
    }
    const filteredResults = queryData.results.filter(
      (device: FdaDeviceListItem) => device.k_number !== selectedKNumber
    );
    return filteredResults.slice(0, MAX_GRAPH_RELATED_DEVICES);
  }, [queryData, selectedKNumber]);

  const handleBackToList = () => {
    navigate("/");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 p-8">Error: {error.message}</p>
    );
  }

  if (!mainDeviceData) {
    return (
      <p className="text-center text-gray-500 p-8">
        Main device data could not be loaded for relational view.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <RelationalDevices
        handleBackToList={handleBackToList}
        mainDeviceData={mainDeviceData}
        relatedDevices={allFetchedRelatedDevices}
        selectedProductCode={reduxSelectedDeviceInfo?.product_code || ""}
      />
    </div>
  );
};

export default RelationalDevicesContainer;
