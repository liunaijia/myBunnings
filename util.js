function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

export function toQueryString(object) {
  return Object.entries(object)
    .reduce(
      (memo, [key, value]) => (!isEmpty(value) ? memo.concat(`${key}=${value}`) : memo),
      [],
    ).join('&');
}
