export function toQueryString(object) {
  return Object.entries(object)
    .reduce(
      (memo, [key, value]) => (value !== undefined && value !== null ? memo.concat(`${key}=${value}`) : memo),
      [],
    ).join('&');
}
