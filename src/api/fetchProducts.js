import { DynamoDB } from 'aws-sdk';
import { respond } from './httpHelper';
import getProducts from './getProducts';

function priceChange(oldPrice, newPrice) {
  const change = (newPrice - oldPrice) / oldPrice;
  return Math.round(change * 1000) / 1000;
}

export default respond(async (event) => {
  const param = JSON.parse(event.body);
  const products = await getProducts(param.categoryUrl);

  const client = new DynamoDB.DocumentClient();
  const tableName = process.env.MyBunningsTable || 'MyBunningsTable';

  await Promise.all(
    products.map(async (product) => {
      const {
        fineLine, displayName, productUrl, productImage, price,
      } = product;

      const now = new Date().toISOString();

      // get product
      const output = await client.get({
        TableName: tableName,
        Key: { entityType: 'product', entityId: fineLine },
      }).promise();
      if (output.Item) {
        if (output.Item.price !== product.price) {
          // update product price
          await client.update({
            TableName: tableName,
            Key: { entityType: 'product', entityId: fineLine },
            UpdateExpression: `set
              #price = :price,
              #priceChange = :priceChange
              #timestamp = :timestamp,
              #priceHistory = list_append(#priceHistory, :newHistoryItem)
            `,
            ExpressionAttributeNames: {
              '#price': 'price',
              '#priceChange': 'priceChange',
              '#priceHistory': 'priceHistory',
              '#timestamp': 'timestamp',
            },
            ExpressionAttributeValues: {
              ':price': product.price,
              ':priceChange': priceChange(output.Item.price, product.price),
              ':timestamp': now,
              ':newHistoryItem': [{
                price: product.price,
                timestamp: now,
              }],
            },
          }).promise();
        }
      } else {
        // save product
        await client.put({
          TableName: tableName,
          Item: {
            entityType: 'product',
            entityId: fineLine,
            price,
            priceChange: 0,
            timestamp: now,
            priceHistory: [{ timestamp: now, price }],
            displayName,
            productUrl,
            productImage,
            categoryUrl: param.categoryUrl,
          },
        }).promise();
      }
    }),
  );

  return { body: products };
});
