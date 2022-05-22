import * as AWS from 'aws-sdk';

const options = isOffline => {
  let options = {};

  if (isOffline) {
    options = {
      region : 'ap-southeast-1',
      endpoint : 'http://localhost:8000'
    };
  }

  return options;
};

const dynamodb = new AWS.DynamoDB.DocumentClient(options(process.env.IS_OFFLINE));

export { dynamodb, options };
