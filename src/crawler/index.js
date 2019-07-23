import getCategoryUrls from './getCategories';
import getProducts from './getProducts';


(async () => {
  const products = await getProducts('/our-range/tools/power-tools/drills/cordless-power-tool-drill-kits');
  console.log(products[0]);
  // fineLine, price, productUrl,  displayName, productImage

  // for await (const url of getCategoryUrls()) {
  //   console.log(url);
  // }
})();
