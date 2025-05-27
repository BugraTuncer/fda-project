import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  FdaDeviceListItem,
  FdaDeviceListResponse,
} from "../../types/fdaDeviceList";
import Pagination from "../common/Pagination";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchInput from "../common/SearchInput";
import DeviceCard from "./DeviceCard";

interface DeviceListProps {
  devices: FdaDeviceListResponse | undefined;
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isFetching: boolean;
  onDeviceSelect: (deviceInfo: any) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  isLoading,
  page,
  totalPages,
  onPageChange,
  isFetching,
  onDeviceSelect,
  searchTerm,
  onSearchChange,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading && !isFetching) return <LoadingSpinner />;

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
          FDA Medical Devices
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore comprehensive medical device data from the FDA database.
          Search, analyze relationships, and discover device information.
        </p>
      </div>

      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />

      {!isFetching && devices && devices.results.length > 0 ? (
        <motion.div
          key="device-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devices.results.map((device: FdaDeviceListItem) => (
              <DeviceCard
                key={device.k_number}
                device={device}
                onDeviceSelect={onDeviceSelect}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        !isFetching && (
          <div className="text-center py-16" key="no-devices">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462.899-6.05 2.372M15 17h5l-1.405-1.405A2.032 2.032 0 0118.595 15H15z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No devices found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No medical devices found matching your criteria.
            </p>
          </div>
        )
      )}

      <AnimatePresence>
        {devices && totalPages > 0 && !isFetching && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              isFetching={isFetching}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeviceList;
