import React from "react";
import type { FdaDeviceListItem } from "~/types/fdaDeviceList";

interface DeviceDetailsProps {
  device: FdaDeviceListItem;
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Device Details
      </h3>
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                {device.device_name || device.k_number}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  K-Number:
                </span>
                <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                  {device.k_number}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  Product Code:
                </span>
                <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                  {device.product_code}
                </span>
              </div>

              {device.applicant && (
                <div className="flex items-start space-x-2">
                  <div className="flex whitespace-nowrap flex-row items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Manufacturer:
                    </span>
                    <p className="text-sm text-gray-800  bg-gray-100 px-2 py-1 rounded">
                      {device.applicant}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {device.openfda?.device_class && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Class:
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Class {device.openfda.device_class}
                  </span>
                </div>
              )}
              {device.decision_date && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Cleared:
                  </span>
                  <span className="text-sm text-gray-800">
                    {new Date(device.decision_date).toLocaleDateString()}
                  </span>
                </div>
              )}

              {device.openfda?.medical_specialty_description && (
                <div className="flex items-start space-x-2">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-600">
                      Medical Specialty:
                    </span>
                    <p className="text-sm text-gray-800 mt-1">
                      {device.openfda.medical_specialty_description}
                    </p>
                  </div>
                </div>
              )}

              {device.openfda?.regulation_number && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Regulation:
                  </span>
                  <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                    {device.openfda.regulation_number}
                  </span>
                </div>
              )}

              {device.openfda?.k_number_predicate &&
                device.openfda.k_number_predicate.length > 0 && (
                  <div className="flex items-start space-x-2">
                    <div className="flex whitespace-nowrap flex-row items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Predicate K-Numbers:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.openfda.k_number_predicate
                          .slice(0, 3)
                          .map((kNumber, index) => (
                            <span
                              key={index}
                              className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono"
                            >
                              {kNumber}
                            </span>
                          ))}
                        {device.openfda.k_number_predicate.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{device.openfda.k_number_predicate.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <span className="text-sm text-blue-600 font-medium">
              Main Device
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
