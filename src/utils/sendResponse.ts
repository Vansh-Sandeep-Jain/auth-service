interface SendResponseOptions {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: any;
  error?: any;
}

const sendResponse = ({
  statusCode = 200,
  success = true,
  message = success ? 'Success' : 'Error',
  data = null,
  error = null
}: SendResponseOptions = {}) => {
  const response: any = {
    success,
    message,
  };

  if (success && data !== null) {
    response.data = data;
  }

  if (!success && error) {
    response.error = error.message || error;
  }

  return response;
};

export default sendResponse;