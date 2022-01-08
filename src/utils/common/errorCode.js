const html_error_code = {
  '4xx': {
    type: 'Client',
    msg: 'Request contains bad syntax or the server cannot fulfill the request',
    code: {
      400: 'Bad request from client.',
      401: 'Unauthorized request',
      402: 'Payment required for request',
      403: 'Resource access forbidden',
      404: 'Page not found',
      405: 'Method not allowed for resource',
      406: 'Resource type not acceptable',
      410: 'Resource not available',
    },
  },
  '5xx': {
    type: 'Server',
    msg: 'Server failed to fulfill an apparently valid request',
    code: {
      500: 'Internal server error',
      501: 'Method not implimented',
      502: 'Bad gateway or server overloaded',
      503: 'Service unavailable or gateway time-out',
      504: 'Secondary gateway or server time-out',
    },
  },
};

export const errorCode = (errCode) => {
  const err = html_error_code[`${errCode.toString().match(/^[4-5]/g)}xx`];
  return /^[4-5]/g.test(errCode)
    ? {
        code: errCode,
        type: err?.type || '',
        detail: err?.msg || '',
        msg: err?.code[`${errCode}`] || 'Something went Wrong!!',
      }
    : {
        code: errCode,
        type: '',
        detail: '',
        msg: 'Something went Wrong!!',
      };
};
