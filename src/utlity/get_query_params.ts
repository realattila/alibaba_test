/* eslint-disable  */
const getQueryParams = (str: string) => {
  var queryString = str || window.location.search || "";
  var keyValPairs = [];
  var params: any = {};
  queryString = queryString.replace(/.*?\?/, "");

  if (queryString.length) {
    keyValPairs = queryString.split("&");
    for (const pairNum in keyValPairs) {
      var key = keyValPairs[pairNum].split("=")[0];
      if (!key.length) continue;
      if (typeof params[key] === "undefined") params[key] = [];
      params[key].push(keyValPairs[pairNum].split("=")[1]);
    }
  }
  return params;
};

export default getQueryParams;
