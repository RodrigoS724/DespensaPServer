export function verifiQuery (result, method) {
  const errorM = 'Error in' + method;
  if (result.length > 0) {
    return result;
  } else {
    throw console.error(errorM);
  }
}
