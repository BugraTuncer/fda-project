import React from "react";
import type { FdaDeviceListItem } from "../../types/fdaDeviceList";

interface DeviceCardProps {
  device: FdaDeviceListItem;
  onDeviceSelect: (deviceInfo: any) => void;
  isConnectedDevice?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onDeviceSelect,
  isConnectedDevice = false,
}) => {
  return (
    <div
      key={device.k_number}
      onClick={() => onDeviceSelect(device)}
      className="group bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="relative p-6 pb-4 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight"
              title={device.device_name || "N/A"}
            >
              {device.device_name || "Unnamed Device"}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
            <span className="text-sm font-medium text-gray-600">K-Number:</span>
            <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
              {device.k_number}
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-600">
                Manufacturer:
              </span>
              <p className="text-sm text-gray-800 line-clamp-2 mt-1">
                {device.manufacturer || "Unknown"}
              </p>
            </div>
          </div>

          {device.openfda?.device_class && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
              <span className="text-sm font-medium text-gray-600">Class:</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Class {device.openfda.device_class}
              </span>
            </div>
          )}
        </div>
      </div>
      {!isConnectedDevice && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {device.decision_date
                ? `Cleared: ${new Date(device.decision_date).getFullYear()}`
                : "Clearance date unavailable"}
            </span>
            <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="text-sm font-semibold">View Relations</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceCard;
