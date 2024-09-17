export const CACHE_INTERVAL = 60 * (60 * 1000);

// 定义服务路径
const API_PREFIX = "/api";
export const API_HELLO = `${API_PREFIX}/hello`;
export const API_PKG_SOFTWARE = `${API_PREFIX}/pkg/software`;
export const API_EPT_TOOLCHAIN = `${API_PREFIX}/ept/toolchain`;
export const REDIRECT_ROUTE_PATH = `${API_PREFIX}/redirect`;
export const REDIRECT_URL_TEMPLATE = `${REDIRECT_ROUTE_PATH}?path={baseUrl}/{scope}/{software}/{file_name}`;
