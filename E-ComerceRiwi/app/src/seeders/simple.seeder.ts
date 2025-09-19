import sequelize from "../config/database";
import { Role } from "../models/role.model";
import { Category } from "../models/category.model";
import User from "../models/user.model";
import { Address } from "../models/address.model";
import { OrderDetail } from "../models/order-detail.model";

export const runSimpleSeeders = async () => {
  try {
    console.log("🌱 Starting simple seeders...");
    
    await sequelize.sync({ force: true });
    console.log("📊 Database synchronized");
    
    // Seed roles
    const roles = [
      { name: "admin", is_active: true },
      { name: "user", is_active: true }
    ];
    await Role.bulkCreate(roles);
    console.log("✅ Roles created");
    
    // Seed categories
    const categories = [
      { name: "Football", is_active: true },
      { name: "Basketball", is_active: true },
      { name: "Tennis", is_active: true }
    ];
    await Category.bulkCreate(categories);
    console.log("✅ Categories created");
    
    // Seed users
    const users = [
      { name: "Admin User", email: "admin@test.com" },
      { name: "Regular User", email: "user@test.com" }
    ];
    await User.bulkCreate(users);
    console.log("✅ Users created");
    
    console.log("✅ Simple seeders completed successfully");
  } catch (error) {
    console.error("❌ Error running simple seeders:", error);
    throw error;
  }
};

if (require.main === module) {
  runSimpleSeeders()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error running simple seeders:", error);
      process.exit(1);
    });
}