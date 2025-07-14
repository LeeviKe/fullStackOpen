const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

describe('Tests for creating a user', () => {
  test('Can not add a user without username', async () => {
    const user = {
      name: 'Matti',
      password: 'secret123',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Can not add a user without password', async () => {
    const user = {
      name: 'Matti',
      username: 'Matti22',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Can not add a user with password shorter than 3 characters', async () => {
    const user = {
      name: 'Matti',
      username: 'Matti22',
      password: 'se',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Adding a user works', async () => {
    const user = {
      name: 'Matti',
      username: 'Matti22',
      password: 'secret123',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});
