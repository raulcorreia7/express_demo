import _ from "lodash";

export async function typedFetch<T>(url: string): Promise<T> {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data as T);
}

export function getPaginated<T>(items: T[], page: number, pageSize: number) {
  const pg = page || 1,
    pgSize = pageSize || 100,
    offset = (pg - 1) * pgSize,
    pagedItems = _.drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems,
  };
}
