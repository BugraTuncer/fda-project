import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SelectedDeviceState {
  deviceInfo: any | null;
}

const initialState: SelectedDeviceState = {
  deviceInfo: null,
};

export const selectedDeviceSlice = createSlice({
  name: "selectedDevice",
  initialState,
  reducers: {
    setSelectedDeviceInfo: (state, action: PayloadAction<any>) => {
      state.deviceInfo = action.payload;
    },
  },
});

export const { setSelectedDeviceInfo } = selectedDeviceSlice.actions;

export const selectSelectedDeviceInfo = (state: RootState) =>
  state.selectedDevice.deviceInfo;

export default selectedDeviceSlice.reducer;
