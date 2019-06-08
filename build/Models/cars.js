"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsModel = void 0;
var carsModel = {
  carsDb: [{
    id: 1,
    owner: 1,
    created_on: new Date(),
    state: 'new',
    status: 'available',
    price: 190.0,
    manufacturer: 'Mercedes',
    model: 'Benz 190',
    body_type: 'car'
  }, {
    id: 2,
    owner: 1,
    created_on: new Date(),
    state: 'new',
    status: 'sold',
    price: 190.0,
    manufacturer: 'Mercedes',
    model: 'Benz-Sold',
    body_type: 'car'
  }]
};
exports.carsModel = carsModel;