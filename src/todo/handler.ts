import { ok, serverError } from '../aws/response';
import * as todoRepo from './todoRepo';

// Create Todo Handler
export const createTodo = async (event, context, cb) => {
  const payload = JSON.parse(event.body) || {};

  let response;

  try {
    let data = await todoRepo.createTodo(payload);
    response = ok(data);
  } catch (ex) {
    let error = { message: 'Could not save to dynamoDB', description: ex.message };
    console.log(error);
    response = serverError(error);
  }
  return cb(null, response);
};

// Update Todo Handler
export const updateTodo = async (event, context, cb) => {
  const payload = JSON.parse(event.body) || {};
  const id = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

  let response;

  try {
    let data = await todoRepo.updateTodo(id, payload);
    response = ok(data);
  } catch (ex) {
    let error = { message: 'Could not save to dynamoDB', description: ex.message };
    console.log(error);
    response = serverError(error);
  }
  return cb(null, response);
};

// Delete Todo Handler
export const deleteTodo = async (event, context, cb) => {
  const id = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

  let response;

  try {
    let data = await todoRepo.deleteTodo(id);
    response = ok(data);
  } catch (ex) {
    let error = { message: 'Could not save to dynamoDB', description: ex.message };
    console.log(error);
    response = serverError(error);
  }
  return cb(null, response);
};

// Get Single Todo Handler
export const getTodo = async (event, context, cb) => {
  let id = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;
  let response;

  try {
    let data = await todoRepo.getTodo(id);
    response = ok(data);
  } catch (ex) {
    let error = { message: 'Could not fetch wall post', description: ex.message };
    console.log(error);
    response = serverError(error);
  }
  return cb(null, response);
};

// List Todo Handler
export const listTodos = async (event, context, cb) => {
  let response;

  try {
    let data = await todoRepo.listTodos();
    response = ok(data);
  } catch (ex) {
    let error = { message: 'Could not list wall posts', description: ex.message };
    console.log(error);
    response = serverError(error);
  }
  return cb(null, response);
};
