class ApiUtils {
  static convertObjToQueryParams(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    const params = keys.map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    });
    if (!params) return "";
    const queryParam = `?${params.join("&")}`;
    return queryParam;
  }
}
export default ApiUtils;
