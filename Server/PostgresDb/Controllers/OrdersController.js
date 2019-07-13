import OrdersModel from '../Models/ordersModel';

export class OrdersController {
  // This is the method that handles the request to create new order...
  createNewCarOrder(req, res) {
    OrdersModel.createNewCarOrderModel(req, res);
  }

  // This is the method that handles the request to update the order amount...
  updateOrderAmount(req, res) {
    OrdersModel.updateOrderAmountModel(req, res);
  }

  // This is the method that handles the request to update the order status...
  updateOrderStatus(req, res) {
    OrdersModel.updateOrderStatusModel(req, res);
  }

  // This is the method that handles the request to get all orders...
  getAllOrders(req, res) {
    OrdersModel.getAllOrdersModels(req, res);
  }

  // This is the method that handles the request to get all orders of a user...
  getAllUserOrders(req, res) {
    OrdersModel.getAllUserOrdersModel(req, res);
  }

  // This is the method that handles the request to get order by id....
  getOrdersById(req, res) {
    OrdersModel.getOrdersByIdModel(req, res);
  }

  // This method handles the request to delete a order by id...
  deleteOrder(req, res) {
    OrdersModel.deleteOrderModel(req, res);
  }

}
