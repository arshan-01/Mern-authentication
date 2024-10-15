// src/redux/features/permission/permission.slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  softDeletePermission,
  getActionsList,
  restorePermission,
  parmanentDeletePermission
} from './permission.service';

const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    currentPermissionId: null,
    actionList: [],
    currentPermission: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCurrentPermissionId: (state, action) => {
      state.currentPermissionId = action.payload;
    },
    clearCurrentPermission: (state) => {
      state.currentPermissionId = null;
    },
    setCurrentPermission: (state, action) => {
      state.currentPermission = action.payload;
    },
    updatePermissionOnLocal: (state, action) => {
      const { permission } = action.payload;
      state.currentPermission = { ...state.currentPermission, ...permission };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all permissions
      .addCase(getPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload.data;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Get all actions
      .addCase(getActionsList.pending, (state, action) => {
        state.status = 'loading';
      }
      )
      .addCase(getActionsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actionList = action.payload.data;
      }
      )
      .addCase(getActionsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
      )
      // Get a single permission by ID
      .addCase(getPermissionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPermissionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPermission = action.payload;
      })
      .addCase(getPermissionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create a new permission
      .addCase(createPermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update a permission
      .addCase(updatePermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Soft Delete a permission
      .addCase(softDeletePermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(softDeletePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(softDeletePermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //  Parmanent Delete a permission
      .addCase(parmanentDeletePermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(parmanentDeletePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(parmanentDeletePermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Restore a permission
      .addCase(restorePermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restorePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(restorePermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});
export const { setCurrentPermissionId, clearCurrentPermission, setCurrentPermission, updatePermissionOnLocal } = permissionSlice.actions;
export default permissionSlice.reducer;
