import { toast } from 'sonner';

/**
 * Handle the response from an API request.
 * @param {Promise} request - The API request promise.
 * @param {Object} options - Additional options for handling the response.
 * @param {boolean} [options.showSuccessToast=true] - Whether to show the success toast.
 * @param {boolean} [options.showErrorToast=true] - Whether to show the error toast.
 * @param {Function} rejectWithValue - The reject function from thunk
 * @returns {Promise} - The data from the successful request.
 * @throws {Error} - Throws error if request fails.
 */
const handleResponse = async (request, options = {}, rejectWithValue) => {
    const { showSuccessToast = true, showErrorToast = true } = options;

    try {
        const response = await request;
        
        // Conditionally display success toast
        if (showSuccessToast) {
            toast.success(response.data.message);
        }

        return response.data; // Return the expected data
    } catch (error) {
        console.log("🚀 ~ handleResponse ~ error:", error);
        
        // Conditionally display error toast
        if (showErrorToast) {
            toast.error(`${error.response?.data?.message || 'Something went wrong'}`);
        }

        // Reject with a value if rejectWithValue is provided
        if (rejectWithValue) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }

        throw error; // Rethrow the error if not using Thunk
    }
};

export default handleResponse;
