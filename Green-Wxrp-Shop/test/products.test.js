import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts } from '../src/features/products/filter.js';

const products = [
  { id: '1', name: 'ชาเขียว', price: 10, image: '', category: 'drink', inStock: true },
  { id: '2', name: 'น้ำสมุนไพร', price: 15, image: '', category: 'drink', inStock: true },
];

test('filterProducts matches query', () => {
  const res = filterProducts(products, 'ชา');
  assert.equal(res.length, 1);
  assert.equal(res[0].id, '1');
});
