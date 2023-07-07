import { model, Schema } from 'mongoose';
import { IOrders, OrdersModel } from './orders.interface';

const orderSchema = new Schema<IOrders>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: 'Cow',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
});

export const Order = model<IOrders, OrdersModel>('Order', orderSchema);
