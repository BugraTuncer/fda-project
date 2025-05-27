import type { FdaDeviceListItem } from "./fdaDeviceList";

export interface PartialDeviceNodeData {
  k_number: string;
  device_name: string;
  applicant?: string;
}

export interface DeviceNode {
  id: string;
  label: string;
  position?: { x: number; y: number };
  data?: FdaDeviceListItem | PartialDeviceNodeData;
}

export interface DeviceEdge {
  id: string;
  source: string;
  target: string;
}
