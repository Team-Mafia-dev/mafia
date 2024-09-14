export const FetchData = async (
      url, 
      data = null) => {

    let options;
      
    if (data instanceof FormData) {
      options = {
        method: 'POST',      
        body: data,
        credentials: 'include', // 쿠키와 같은 인증 정보를 전송
      };
    } else if (data) {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
        credentials: 'include', // 쿠키와 같은 인증 정보를 전송
      };
    }else{
      options = { 
        method:  'GET',
        headers: {
          'Content-Type': 'application/json',
          },
        credentials: 'include', // 쿠키와 같은 인증 정보를 전송
      };
    }

    // 최종 옵션 병합
    //const finalOptions = { ...defaultOptions, ...options };
    
    console.log(process.env.REACT_APP_API_BASE + url);

    try {
      const response = await fetch(process.env.REACT_APP_API_BASE + url, options);

      const result = await response.json();

      if (!result.isSuccess) {
        alert(result.msg);
      }
  
      return await result;
    } catch (error) {
      //console.log()
      console.error('Fetch Error:', error);
      throw error;
    }
  };