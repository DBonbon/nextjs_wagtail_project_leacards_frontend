import querystring from "query-string";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

const API_BASE = process.env.NEXT_PUBLIC_WAGTAIL_API_BASE;
const NEXT_BASE = process.env.NEXT_PUBLIC_NEXT_BASE;

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function cleanUrlPaths(urlArray) {
  let tmpUrls = urlArray.filter((x) => x);
  tmpUrls = tmpUrls.map((x) => x.split("/"));
  tmpUrls = tmpUrls.map((x) => x.filter((y) => y));
  tmpUrls = tmpUrls.filter((x) => x.length);
  return tmpUrls;
}

export async function getPage(path, params, options) {
  params = params || {};
  let relativePath = path
  if (relativePath.indexOf('/') !== 0) {
    relativePath = `/${relativePath}`
  }

  return await getRequest(
    `${API_BASE}${relativePath}`,
    params,
    options
  );
}

export async function getAllPages() {
  return await getPaginationContent(`${API_BASE}/api/v1/nextjs/page_relative_urls/`);
}

export async function getAllCategories() {
  return await getPaginationContent(`${API_BASE}/api/v1/nextjs/category/`);
}

export async function getAllTags() {
  return await getPaginationContent(`${API_BASE}/api/v1/nextjs/tag/`);
}

async function getPaginationContent(url) {
  let items = []
  while (true) {
    const data = await getRequest(
      url,
      {offset: items.length}
    )
    if (data.items.length > 0) {
      items = [...items, ...data.items];
    } else {
      break;
    }
  }

  return {items}
}

export async function getRequest(url, params, options) {
  params = params || {};
  params = snakecaseKeys(params, {deep: true});

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const queryString = querystring.stringify(params);
  const res = await fetch(`${url}?${queryString}`, {headers});

  const data = await res.json();
  return camelcaseKeys(data, {deep: true})
}

export async function postRequest(url, params, options) {
  params = params || {};
  params = snakecaseKeys(params, {deep: true});

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const res = await fetch(
    url, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    }
  );

  const data = await res.json();
  return camelcaseKeys(data, {deep: true})
}

export function convertWagtailUrlToNext(url){
  return url.replace(API_BASE, NEXT_BASE)
}

export async function getPagePreview(contentType, token, params, options) {
  params = params || {};
  params = {
    contentType,
    token,
    ...params,
  };

  return await getRequest(
    `${API_BASE}/api/v1/nextjs/page_preview/`,
    params,
    options
  );
}
