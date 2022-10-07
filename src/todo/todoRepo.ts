import * as uuid from 'uuid/v1';
import { dynamodb } from '../aws/dynamodb';
const env = process.env;

export const createTodo = async (payload: any): Promise<any> => {
  const id = uuid();
  const params = {
    TableName: env.todoTable,
    Item: {
      id,
      userId: payload.userId,
      dateCreated: new Date().getTime(),
      dateUpdated: new Date().getTime(),
      content : payload.content,
      status : 'pending'
    },
    ConditionExpression: '#id <> :id',
    ExpressionAttributeNames: {
      '#id' : 'id'
    },
    ExpressionAttributeValues: {
      ':id' : id
    }
  };

  try {
    let result: any = await dynamodb.put(params).promise();

    result = params.Item;

    return result;
  } catch (ex) {
    throw ex;
  }
};

export const updateTodo = async (id: string, payload: any): Promise<any> => {
  const params = {
    TableName: env.todoTable,
    Key: {
      id
    },
    ExpressionAttributeNames: {
      '#content': 'content',
      '#status': 'status'
    },
    ExpressionAttributeValues: {
      ':content': payload.content,
      ':status': payload.status,
      ':dateUpdated': new Date().getTime(),
    },
    UpdateExpression: 'SET #content = :content, #status = :status, dateUpdated = :dateUpdated',
    ReturnValues: 'ALL_NEW',
  };

  try {
    let result = await dynamodb.update(params).promise();

    return result;
  } catch (ex) {
    throw ex;
  }
};

export const deleteTodo = async (id: string): Promise<any> => {
  const params = {
    TableName: env.todoTable,
    Key: {
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': id},
      KeyConditionExpression: '#id = :id'
    }
  };

  try {
    let result = await dynamodb.delete(params).promise();

    return result;
  } catch (ex) {
    throw ex;
  }
};

export const getTodo = async (id: string): Promise<any> => {
  const params = {
    TableName: env.todoTable,
    ExpressionAttributeNames: { '#userId': 'userId', '#id': 'id'},
    ExpressionAttributeValues: { ':userId': 'pub0001', ':id': id},
    KeyConditionExpression: '#userId = :userId',
    FilterExpression: '#id = :id'
  };

  try {
    let result = await dynamodb.query(params).promise();

    return result.Items;
  } catch (ex) {
    throw ex;
  }
};

export const listTodos = async (): Promise<any> => {
  const params: any = {
    TableName: env.todoTable,
  };

  try {
    let result = await dynamodb.scan(params).promise();

    return {
      data : result.Items
    };
  } catch (ex) {
    throw ex;
  }
};
