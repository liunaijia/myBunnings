import { DynamoDB } from 'aws-sdk';
import { respond } from './httpHelper';

export default respond(async (event) => {
  const client = new DynamoDB.DocumentClient();
  const tableName = process.env.MyBunningsTable || 'MyBunningsTable';

  const data = await client.query({
    TableName: tableName,
    IndexName: 'PriceChangeIndexV2',
    KeyConditionExpression: '#entityType = :entityType and #priceChange < :priceChange',
    ExpressionAttributeNames: {
      '#entityType': 'entityType',
      '#priceChange': 'priceChange',
    },
    ExpressionAttributeValues: {
      ':entityType': 'product',
      ':priceChange': 0,
    },
  }).promise();

  return { body: data };
});
