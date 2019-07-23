import getCategoryUrls from './getCategories';

(async () => {
  for await (const url of getCategoryUrls()) {
    console.log(url);
  }
})();
