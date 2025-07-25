import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, removeItem } from '../src/features/cart/cartUtils.js';

const product = { id: '1', name: 'Tea', price: 10, image: '', category: 'drink', inStock: true };

test('addItem adds new product', () => {
  const res = addItem([], product);
  assert.equal(res.length, 1);
  assert.equal(res[0].quantity, 1);
});

test('addItem increments quantity', () => {
  const res = addItem([{ ...product, quantity: 1 }], product);
  assert.equal(res[0].quantity, 2);
});

test('removeItem removes product', () => {
  const res = removeItem([{ ...product, quantity: 1 }], '1');
  assert.equal(res.length, 0);
});
