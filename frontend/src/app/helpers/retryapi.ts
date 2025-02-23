export const retry:any = async (fn: Function, retries = 6, delay = 3000) => {
  try {
    await fn(); // Try to run the function
  } catch (error) {
    if (retries > 0) {
      if (process.env.NODE_ENV !== 'production') console.log(`Retrying... Attempts left: ${retries}, waiting for ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the specified delay
      return retry(fn, retries - 1, delay * 2); // Retry with increased delay
    } else {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') console.error("Max retries reached:", error); // Max retries reached
      throw error; // Throw the error if retries are exhausted
    }
  }
};
