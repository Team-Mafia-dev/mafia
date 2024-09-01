export const FetchUtil = async (url, method = 'POST', postData = null) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData ? JSON.stringify(postData) : null,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || 'An error occurred');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  };