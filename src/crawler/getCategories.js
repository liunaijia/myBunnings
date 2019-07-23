import { get } from './util';

async function findLinksOnPage(pageUrl, linkSelector) {
  const $ = await get(pageUrl);
  const urls = $(linkSelector).toArray().map(e => $(e).attr('href'));
  return urls;
}

async function* getCategoryUrls() {
  const topCategoryUrls = await findLinksOnPage('/our-range', '.chalkboard-header');
  for (const topCategoryUrl of topCategoryUrls) {
    const primaryCategoryUrls = await findLinksOnPage(topCategoryUrl, '.category-block-heading__title');
    for (const primaryCategoryUrl of primaryCategoryUrls) {
      const secondaryCategoryUrls = await findLinksOnPage(primaryCategoryUrl, '.sidebar-dropdown-nav.current ul a');
      for (const secondaryCategoryUrl of secondaryCategoryUrls) {
        const bottomCategoryUrls = await findLinksOnPage(secondaryCategoryUrl, '.sidebar-dropdown-nav.current ul a');
        for (const bottomCategoryUrl of bottomCategoryUrls) {
          yield bottomCategoryUrl;
        }
      }
    }
  }
}

export default getCategoryUrls;
