import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import { AuthenticatedAPI } from '../../../utils/Api';

// Thunks for permission operations
export const getPermissions = createAsyncThunk('permissions/getPermissions', async ({ search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted }, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.get(config.endPoints.getPermissions, {
      params: { search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted }
    }),
    { showSuccessToast: false, showErrorToast: true },
    rejectWithValue
  );
});

export const getActionsList = createAsyncThunk('permissions/getActionsList', async (_, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.get(config.endPoints.getActionsList),
    { showSuccessToast: false, showErrorToast: true },
    rejectWithValue
  );
});

export const getPermissionById = createAsyncThunk('permissions/getPermissionById', async (id, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.get(`${config.endPoints.getPermissionById}/${id}`),
    { showSuccessToast: false, showErrorToast: true },
    rejectWithValue
  );
});

export const createPermission = createAsyncThunk('permissions/createPermission', async (permissionData, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.post(config.endPoints.createPermission, permissionData),
    { showSuccessToast: true, showErrorToast: true },
    rejectWithValue
  );
});

export const updatePermission = createAsyncThunk('permissions/updatePermission', async ({ id, permissionData }, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.patch(`${config.endPoints.updatePermission}/${id}`, permissionData),
    { showSuccessToast: true, showErrorToast: true },
    rejectWithValue
  );
});

export const softDeletePermission = createAsyncThunk('permissions/softDeletePermission', async (id, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.delete(`${config.endPoints.softDeletePermission}/${id}`),
    { showSuccessToast: true, showErrorToast: true },
    rejectWithValue
  );
});

export const permanentDeletePermission = createAsyncThunk('permissions/permanentDeletePermission', async (id, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.delete(`${config.endPoints.permanentDeletePermission}/${id}`),
    { showSuccessToast: true, showErrorToast: true },
    rejectWithValue
  );
});

export const restorePermission = createAsyncThunk('permissions/restorePermission', async (id, { rejectWithValue }) => {
  return handleResponse(
    AuthenticatedAPI.patch(`${config.endPoints.restorePermission}/${id}`),
    { showSuccessToast: true, showErrorToast: true },
    rejectWithValue
  );
});
