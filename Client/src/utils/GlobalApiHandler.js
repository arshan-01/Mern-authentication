// src/utils/GlobalApiHandler.js
import { useEffect } from 'react';

export const useGlobalDeleteHandler = ({ thunkFunction, fetchFunction, fetchParams, dispatch, openModal, componentName, componentProps }) => {
  
  const handleDeleteClick = (id) => {
    openModal({
      componentName,
      componentProps: {
        ...componentProps,
        onDelete: async () => {
          await dispatch(thunkFunction(id));
          dispatch(fetchFunction(fetchParams));
        },
      },
    });
  };

  return {
    handleDeleteClick,
  };
}; 

// Restore handler
export const useGlobalRestoreHandler = ({ thunkFunction, fetchFunction, fetchParams, dispatch, openModal, componentName, componentProps }) => {
  
  const handleRestoreClick = (id) => {
    openModal({
      componentName,
      componentProps: {
        ...componentProps,
        onRestore: async () => {
          await dispatch(thunkFunction(id));
          dispatch(fetchFunction(fetchParams));
        },
      },
    });
  };

  return {
    handleRestoreClick,
  };
}; 

// src/utils/useDebouncedEffect.js 
// This hook is used to debounce the API calls when the user types in the search box
const useDebouncedEffect = (callback, dependencies, delay = 1000) => {
  useEffect(() => {
    // Check if searchQuery (assumed to be the first dependency) is empty
    const hasSearchQuery = dependencies[0] !== '';

    if (hasSearchQuery) {
      // Apply debounce delay if searchQuery is not empty
      const handler = setTimeout(() => {
        callback();
      }, delay);

      // Cleanup function to cancel the timeout if the effect is called again before the delay
      return () => clearTimeout(handler);
    } else {
      // Execute the callback immediately if searchQuery is empty
      callback();
    }
  }, dependencies);
};


export default useDebouncedEffect;
