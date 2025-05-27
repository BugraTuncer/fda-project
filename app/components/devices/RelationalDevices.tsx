import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FdaDeviceListItem } from "~/types/fdaDeviceList";
import DeviceGraph from "./DeviceGraph";
import BackButton from "../common/BackButton";
import DeviceDetails from "./DeviceDetails";
import DeviceCard from "./DeviceCard";

interface RelationalDevicesProps {
  handleBackToList: () => void;
  mainDeviceData: FdaDeviceListItem;
  relatedDevices: FdaDeviceListItem[];
  selectedProductCode: string | null;
}

const RelationalDevices: React.FC<RelationalDevicesProps> = ({
  handleBackToList,
  mainDeviceData,
  relatedDevices,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackButton onClick={handleBackToList} />

      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Device Relationship Graph
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-2">
            Exploring relationships for{" "}
            <span className="font-bold text-blue-600">
              {mainDeviceData.device_name || mainDeviceData.k_number}
            </span>
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-md">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              K-Number: {mainDeviceData.k_number}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div className="mb-16" variants={itemVariants}>
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Interactive Network
                </h3>
                <p className="text-gray-600 mt-1">
                  Drag nodes to explore connections
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm flex-shrink-0" />
                  <span className="text-sm text-gray-700">Main Device</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm flex-shrink-0" />
                  <span className="text-sm text-gray-700">Related Devices</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <DeviceGraph
              mainDevice={mainDeviceData}
              relatedDevices={relatedDevices}
            />
          </div>
        </div>
      </motion.div>

      <DeviceDetails device={mainDeviceData} />

      <motion.div variants={itemVariants}>
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Connected Devices
          <span className="block text-lg font-normal text-gray-600 mt-2">
            {relatedDevices.length} devices in the relationship network
          </span>
        </h3>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedDevices.map((device, index) => (
              <motion.div
                key={device.k_number}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }}
              >
                <DeviceCard
                  device={device}
                  isConnectedDevice={true}
                  onDeviceSelect={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default RelationalDevices;
