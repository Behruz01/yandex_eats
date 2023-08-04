import Courier from "./Courier";
import Delivery from "./Delivery";
import Order from "./Order";
import Restaurant from "./Restaurant";
import User from "./User";
import Food from "./Food";

export const relations = () => {
  // User model
  User.hasMany(Order, { foreignKey: "user_id" });
  Order.belongsTo(User, { foreignKey: "user_id" });

  // Restoran model
  Restaurant.hasMany(Food, { foreignKey: "restaurant_id" });
  Food.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

  Restaurant.hasMany(Order, { foreignKey: "restaurant_id" });
  Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

  // Food model
  Food.hasMany(Order, { foreignKey: "food_id" });
  Order.belongsTo(Food, { foreignKey: "food_id" });

  // Courier model
  Courier.hasMany(Delivery, { foreignKey: "courier_id" });
  Delivery.belongsTo(Courier, { foreignKey: "courier_id" });

  // Order model
  Order.hasOne(Delivery, { foreignKey: "order_id" });
  Delivery.belongsTo(Order, { foreignKey: "order_id" });

  // Admin model - No associations

  // Delivery model
  Delivery.belongsTo(Courier, { foreignKey: "courier_id" });
  Delivery.belongsTo(Order, { foreignKey: "order_id" });
};
