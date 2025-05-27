import { useState, useEffect } from "react";
import DeviceList from "~/components/devices/DeviceList";
import { useDevices } from "~/hooks/useDevices";
import { useDebounce } from "~/hooks/useDebounce";
import { useDispatch } from "react-redux";
import { setSelectedDeviceInfo } from "~/store/slices/selectedDeviceSlice";
import { useNavigate } from "react-router";

export const DeviceContainer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 9;
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const {
    data: devices,
    error,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useDevices({ page, limit, searchTerm: debouncedSearchTerm });

  const handleDeviceSelect = (selectedInfo: any) => {
    navigate(`/relational-devices`);
    dispatch(setSelectedDeviceInfo(selectedInfo));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const totalPages = devices
    ? Math.ceil(devices.meta.results.total / limit)
    : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <DeviceList
        devices={devices}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isFetching={isFetching || isPlaceholderData}
        onDeviceSelect={handleDeviceSelect}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};
