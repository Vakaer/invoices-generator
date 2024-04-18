export const onSuccess = (statusCode: number, data: any) => {
  return {
    statusCode: statusCode,
    error: false,
    data: data,
  };
};

export const onError = (statusCode: number, message: any) => {
  return {
    statusCode: statusCode,
    error: true,
    data: message,
  };
};
