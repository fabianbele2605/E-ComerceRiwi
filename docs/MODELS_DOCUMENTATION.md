# Documentación de Models - E-Commerce

## ¿Qué son los Models?

Los **Models** en Sequelize son representaciones de las tablas de base de datos en código TypeScript. Definen:
- **Estructura de datos**: Campos, tipos, restricciones
- **Relaciones**: Asociaciones entre entidades
- **Validaciones**: Reglas de negocio a nivel de base de datos
- **Comportamientos**: Hooks, métodos personalizados

## Arquitectura de Models

### Estructura de Archivos
```
src/models/
├── index.ts              # Exportación centralizada
├── associations.ts       # Definición de relaciones
├── address.model.ts      # Modelo de direcciones
├── user.model.ts         # Modelo de usuarios
├── product.model.ts      # Modelo de productos
├── order.model.ts        # Modelo de órdenes
├── orderItem.model.ts    # Modelo de items de orden
├── category.model.ts     # Modelo de categorías
├── country.model.ts      # Modelo de países
├── department.model.ts   # Modelo de departamentos
├── city.model.ts         # Modelo de ciudades
├── role.model.ts         # Modelo de roles
├── gender.model.ts       # Modelo de géneros
├── access.model.ts       # Modelo de accesos
├── bank.model.ts         # Modelo de bancos
├── paymentMethod.model.ts # Modelo de métodos de pago
└── orderStatus.model.ts  # Modelo de estados de orden
```

## Implementación Detallada

### 1. Modelo Base - Ejemplo: `address.model.ts`

```typescript
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

/**
 * Interfaz que define todos los atributos del modelo Address
 * Representa la estructura completa de la tabla addresses
 */
interface AddressAttributes {
  id_address: number;        // Primary Key
  user_id: number;          // Foreign Key a users
  city_id: number;          // Foreign Key a cities
  department_id: number;    // Foreign Key a departments
  country_id: number;       // Foreign Key a countries
  street: string;           // Nombre de la calle
  number: string;           // Número de la dirección
  postal_code: string;      // Código postal
  is_active: boolean;       // Estado activo/inactivo
  createdAt: Date;          // Timestamp de creación
  updatedAt: Date;          // Timestamp de actualización
}

/**
 * Interfaz para creación de Address
 * Omite campos auto-generados (id, timestamps)
 */
interface AddressCreationAttributes extends Optional<AddressAttributes, 'id_address' | 'createdAt' | 'updatedAt' | 'is_active'> {}

/**
 * Clase del modelo Address que extiende Model de Sequelize
 * Define la estructura y comportamiento de la entidad Address
 */
class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id_address!: number;
  public user_id!: number;
  public city_id!: number;
  public department_id!: number;
  public country_id!: number;
  public street!: string;
  public number!: string;
  public postal_code!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Inicialización del modelo con Sequelize
 * Define la estructura de la tabla y sus restricciones
 */
Address.init(
  {
    id_address: {
      type: DataTypes.INTEGER,
      autoIncrement: true,      // Auto-incremento
      primaryKey: true,         // Clave primaria
      field: 'id_address'       // Nombre del campo en BD
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,         // Campo requerido
      field: 'user_id',
      references: {             // Definición de Foreign Key
        model: 'users',
        key: 'id_user'
      }
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'city_id',
      references: {
        model: 'cities',
        key: 'id_city'
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'department_id',
      references: {
        model: 'departments',
        key: 'id_department'
      }
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'country_id',
      references: {
        model: 'countries',
        key: 'id_country'
      }
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'street'
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'number'
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'postal_code'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,       // Valor por defecto
      field: 'is_active'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  },
  {
    sequelize,                  // Instancia de Sequelize
    tableName: 'addresses',     // Nombre de la tabla en BD
    modelName: 'Address',       // Nombre del modelo
    timestamps: true,           // Habilitar createdAt/updatedAt
    underscored: true,          // Usar snake_case en BD
    paranoid: false,            // No usar soft deletes automáticos
    indexes: [                  // Definir índices para optimización
      {
        fields: ['user_id']     // Índice en user_id para búsquedas frecuentes
      },
      {
        fields: ['city_id']
      },
      {
        fields: ['is_active']
      }
    ]
  }
);

export default Address;
```

### 2. Modelo con Validaciones - Ejemplo: `user.model.ts`

```typescript
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id_user: number;
  role_id: number;
  gender_id: number;
  access_id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id_user' | 'createdAt' | 'updatedAt' | 'is_active'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_user!: number;
  public role_id!: number;
  public gender_id!: number;
  public access_id!: number;
  public name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Método personalizado para verificar contraseña
   * @param password - Contraseña en texto plano
   * @returns true si la contraseña es correcta
   */
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  /**
   * Método para obtener nombre completo
   * @returns Nombre y apellido concatenados
   */
  public get fullName(): string {
    return `${this.name} ${this.last_name}`;
  }
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_user'
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id',
      references: {
        model: 'roles',
        key: 'id_role'
      }
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'gender_id',
      references: {
        model: 'genders',
        key: 'id_gender'
      }
    },
    access_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'access_id',
      references: {
        model: 'accesses',
        key: 'id_access'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name',
      validate: {                    // Validaciones personalizadas
        notEmpty: {
          msg: 'Name cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'Last name must be between 2 and 100 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,                  // Campo único
      field: 'email',
      validate: {
        isEmail: {                   // Validación de formato email
          msg: 'Must be a valid email address'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
      validate: {
        len: {
          args: [6, 255],
          msg: 'Password must be at least 6 characters long'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'phone',
      validate: {
        isNumeric: {                 // Solo números
          msg: 'Phone must contain only numbers'
        },
        len: {
          args: [10, 20],
          msg: 'Phone must be between 10 and 20 digits'
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email']            // Índice único en email
      },
      {
        fields: ['role_id']
      },
      {
        fields: ['is_active']
      }
    ],
    hooks: {                         // Hooks de Sequelize
      /**
       * Hook que se ejecuta antes de crear un usuario
       * Encripta la contraseña antes de guardarla
       */
      beforeCreate: async (user: User) => {
        if (user.password) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      /**
       * Hook que se ejecuta antes de actualizar un usuario
       * Encripta la contraseña si fue modificada
       */
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
  }
);

export default User;
```

### 3. Modelo de Catálogo - Ejemplo: `category.model.ts`

```typescript
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CategoryAttributes {
  id_category: number;
  name: string;
  description: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id_category' | 'createdAt' | 'updatedAt' | 'is_active'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id_category!: number;
  public name!: string;
  public description!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id_category: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_category'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,                  // Nombre único de categoría
      field: 'name',
      validate: {
        notEmpty: {
          msg: 'Category name cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'Category name must be between 2 and 100 characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,               // Campo opcional
      field: 'description'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name']
      },
      {
        fields: ['is_active']
      }
    ]
  }
);

export default Category;
```

## Definición de Asociaciones (`associations.ts`)

```typescript
import User from './user.model';
import Address from './address.model';
import Role from './role.model';
import Gender from './gender.model';
import Access from './access.model';
import Country from './country.model';
import Department from './department.model';
import City from './city.model';
import Category from './category.model';
import Product from './product.model';
import Order from './order.model';
import OrderItem from './orderItem.model';
import PaymentMethod from './paymentMethod.model';
import OrderStatus from './orderStatus.model';

/**
 * Definición de todas las asociaciones entre modelos
 * Establece las relaciones de Foreign Keys y navegación
 */

// ============= RELACIONES DE USUARIO =============

/**
 * User belongsTo Role (N:1)
 * Un usuario pertenece a un rol
 */
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
});
Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users'
});

/**
 * User belongsTo Gender (N:1)
 * Un usuario tiene un género
 */
User.belongsTo(Gender, {
  foreignKey: 'gender_id',
  as: 'gender'
});
Gender.hasMany(User, {
  foreignKey: 'gender_id',
  as: 'users'
});

/**
 * User belongsTo Access (N:1)
 * Un usuario tiene un nivel de acceso
 */
User.belongsTo(Access, {
  foreignKey: 'access_id',
  as: 'access'
});
Access.hasMany(User, {
  foreignKey: 'access_id',
  as: 'users'
});

// ============= RELACIONES GEOGRÁFICAS =============

/**
 * Country hasMany Departments (1:N)
 * Un país tiene muchos departamentos
 */
Country.hasMany(Department, {
  foreignKey: 'country_id',
  as: 'departments'
});
Department.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country'
});

/**
 * Department hasMany Cities (1:N)
 * Un departamento tiene muchas ciudades
 */
Department.hasMany(City, {
  foreignKey: 'department_id',
  as: 'cities'
});
City.belongsTo(Department, {
  foreignKey: 'department_id',
  as: 'department'
});

// ============= RELACIONES DE DIRECCIONES =============

/**
 * User hasMany Addresses (1:N)
 * Un usuario puede tener múltiples direcciones
 */
User.hasMany(Address, {
  foreignKey: 'user_id',
  as: 'addresses'
});
Address.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

/**
 * Address belongsTo City, Department, Country
 * Una dirección pertenece a una ubicación geográfica
 */
Address.belongsTo(City, {
  foreignKey: 'city_id',
  as: 'city'
});
City.hasMany(Address, {
  foreignKey: 'city_id',
  as: 'addresses'
});

Address.belongsTo(Department, {
  foreignKey: 'department_id',
  as: 'department'
});
Department.hasMany(Address, {
  foreignKey: 'department_id',
  as: 'addresses'
});

Address.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country'
});
Country.hasMany(Address, {
  foreignKey: 'country_id',
  as: 'addresses'
});

// ============= RELACIONES DE PRODUCTOS =============

/**
 * Product belongsTo Category (N:1)
 * Un producto pertenece a una categoría
 */
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});

// ============= RELACIONES DE ÓRDENES =============

/**
 * Order belongsTo User (N:1)
 * Una orden pertenece a un usuario
 */
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});
User.hasMany(Order, {
  foreignKey: 'user_id',
  as: 'orders'
});

/**
 * Order belongsTo OrderStatus (N:1)
 * Una orden tiene un estado
 */
Order.belongsTo(OrderStatus, {
  foreignKey: 'order_status_id',
  as: 'status'
});
OrderStatus.hasMany(Order, {
  foreignKey: 'order_status_id',
  as: 'orders'
});

/**
 * Order belongsTo PaymentMethod (N:1)
 * Una orden tiene un método de pago
 */
Order.belongsTo(PaymentMethod, {
  foreignKey: 'payment_method_id',
  as: 'paymentMethod'
});
PaymentMethod.hasMany(Order, {
  foreignKey: 'payment_method_id',
  as: 'orders'
});

// ============= RELACIONES DE ITEMS DE ORDEN =============

/**
 * Order hasMany OrderItems (1:N)
 * Una orden tiene múltiples items
 */
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'items'
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order'
});

/**
 * Product hasMany OrderItems (1:N)
 * Un producto puede estar en múltiples órdenes
 */
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'orderItems'
});
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

/**
 * Relación Many-to-Many entre Order y Product a través de OrderItem
 * Permite navegación directa entre órdenes y productos
 */
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: 'order_id',
  otherKey: 'product_id',
  as: 'products'
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders'
});

export {
  User,
  Address,
  Role,
  Gender,
  Access,
  Country,
  Department,
  City,
  Category,
  Product,
  Order,
  OrderItem,
  PaymentMethod,
  OrderStatus
};
```

## Exportación Centralizada (`index.ts`)

```typescript
/**
 * Punto de entrada centralizado para todos los modelos
 * Importa asociaciones para asegurar que se configuren correctamente
 */

// Importar modelos individuales
import User from './user.model';
import Address from './address.model';
import Role from './role.model';
import Gender from './gender.model';
import Access from './access.model';
import Country from './country.model';
import Department from './department.model';
import City from './city.model';
import Category from './category.model';
import Product from './product.model';
import Order from './order.model';
import OrderItem from './orderItem.model';
import PaymentMethod from './paymentMethod.model';
import OrderStatus from './orderStatus.model';
import Bank from './bank.model';

// Importar asociaciones para configurarlas
import './associations';

// Exportar todos los modelos
export {
  User,
  Address,
  Role,
  Gender,
  Access,
  Country,
  Department,
  City,
  Category,
  Product,
  Order,
  OrderItem,
  PaymentMethod,
  OrderStatus,
  Bank
};

// Exportar como objeto para uso alternativo
export default {
  User,
  Address,
  Role,
  Gender,
  Access,
  Country,
  Department,
  City,
  Category,
  Product,
  Order,
  OrderItem,
  PaymentMethod,
  OrderStatus,
  Bank
};
```

## Tipos de Datos Sequelize

### Tipos Básicos
```typescript
DataTypes.STRING(length)      // VARCHAR
DataTypes.TEXT               // TEXT
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.FLOAT              // FLOAT
DataTypes.DOUBLE             // DOUBLE
DataTypes.DECIMAL(precision, scale) // DECIMAL
DataTypes.BOOLEAN            // BOOLEAN
DataTypes.DATE               // TIMESTAMP
DataTypes.DATEONLY           // DATE
DataTypes.TIME               // TIME
DataTypes.JSON               // JSON (PostgreSQL)
DataTypes.JSONB              // JSONB (PostgreSQL)
DataTypes.UUID               // UUID
DataTypes.ENUM('value1', 'value2') // ENUM
```

### Configuraciones de Campo
```typescript
{
  type: DataTypes.STRING(100),
  allowNull: false,           // NOT NULL
  unique: true,              // UNIQUE constraint
  primaryKey: true,          // PRIMARY KEY
  autoIncrement: true,       // AUTO_INCREMENT
  defaultValue: 'default',   // DEFAULT value
  field: 'column_name',      // Nombre real de columna en BD
  references: {              // Foreign Key
    model: 'table_name',
    key: 'column_name'
  },
  validate: {                // Validaciones
    notEmpty: true,
    isEmail: true,
    len: [2, 100],
    isIn: [['value1', 'value2']]
  }
}
```

## Hooks de Sequelize

### Hooks de Instancia
```typescript
{
  hooks: {
    beforeValidate: (instance, options) => {
      // Antes de validar
    },
    afterValidate: (instance, options) => {
      // Después de validar
    },
    beforeCreate: (instance, options) => {
      // Antes de crear
    },
    afterCreate: (instance, options) => {
      // Después de crear
    },
    beforeUpdate: (instance, options) => {
      // Antes de actualizar
    },
    afterUpdate: (instance, options) => {
      // Después de actualizar
    },
    beforeDestroy: (instance, options) => {
      // Antes de eliminar
    },
    afterDestroy: (instance, options) => {
      // Después de eliminar
    }
  }
}
```

## Consultas con Asociaciones

### Incluir Relaciones
```typescript
// Buscar usuario con su rol y direcciones
const user = await User.findByPk(1, {
  include: [
    {
      model: Role,
      as: 'role'
    },
    {
      model: Address,
      as: 'addresses',
      include: [
        {
          model: City,
          as: 'city'
        }
      ]
    }
  ]
});

// Buscar órdenes con items y productos
const orders = await Order.findAll({
  include: [
    {
      model: User,
      as: 'user'
    },
    {
      model: OrderItem,
      as: 'items',
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Category,
              as: 'category'
            }
          ]
        }
      ]
    }
  ]
});
```

## Validaciones Personalizadas

### Validaciones a Nivel de Campo
```typescript
email: {
  type: DataTypes.STRING,
  validate: {
    isEmail: {
      msg: 'Must be a valid email'
    },
    notEmpty: {
      msg: 'Email cannot be empty'
    },
    async isUnique(value: string) {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error('Email already exists');
      }
    }
  }
}
```

### Validaciones a Nivel de Modelo
```typescript
{
  validate: {
    // Validación que involucra múltiples campos
    passwordConfirmation() {
      if (this.password !== this.passwordConfirm) {
        throw new Error('Passwords do not match');
      }
    },
    // Validación condicional
    requiredIfActive() {
      if (this.is_active && !this.email) {
        throw new Error('Email is required for active users');
      }
    }
  }
}
```

## Métodos Personalizados

### Métodos de Instancia
```typescript
class User extends Model {
  // Getter personalizado
  get fullName(): string {
    return `${this.name} ${this.last_name}`;
  }

  // Método de instancia
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Método para obtener órdenes del usuario
  public async getActiveOrders(): Promise<Order[]> {
    return Order.findAll({
      where: {
        user_id: this.id_user,
        is_active: true
      }
    });
  }
}
```

### Métodos Estáticos
```typescript
class User extends Model {
  // Método estático para buscar por email
  public static async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      include: [
        { model: Role, as: 'role' }
      ]
    });
  }

  // Método para obtener usuarios activos
  public static async getActiveUsers(): Promise<User[]> {
    return User.findAll({
      where: { is_active: true },
      order: [['createdAt', 'DESC']]
    });
  }
}
```

## Scopes

### Definición de Scopes
```typescript
User.init(
  { /* campos */ },
  {
    sequelize,
    scopes: {
      // Scope para usuarios activos
      active: {
        where: {
          is_active: true
        }
      },
      // Scope para usuarios por rol
      byRole(roleId: number) {
        return {
          where: {
            role_id: roleId
          }
        };
      },
      // Scope con includes
      withRole: {
        include: [
          {
            model: Role,
            as: 'role'
          }
        ]
      }
    }
  }
);
```

### Uso de Scopes
```typescript
// Usar scope simple
const activeUsers = await User.scope('active').findAll();

// Usar scope con parámetros
const admins = await User.scope({ method: ['byRole', 1] }).findAll();

// Combinar scopes
const activeAdmins = await User.scope(['active', 'withRole']).findAll();
```

## Mejores Prácticas Implementadas

### 1. Naming Conventions
- **Modelos**: PascalCase (`User`, `OrderItem`)
- **Campos**: snake_case en BD, camelCase en código
- **Asociaciones**: Nombres descriptivos (`as: 'role'`, `as: 'addresses'`)

### 2. Type Safety
- Interfaces completas para atributos
- Interfaces de creación con campos opcionales
- Tipado estricto en métodos personalizados

### 3. Validaciones
- Validaciones a nivel de campo y modelo
- Mensajes de error descriptivos
- Validaciones asíncronas cuando es necesario

### 4. Performance
- Índices en campos de búsqueda frecuente
- Lazy loading por defecto
- Eager loading explícito cuando es necesario

### 5. Seguridad
- Hash de contraseñas en hooks
- Exclusión de campos sensibles en respuestas
- Validación de datos de entrada

## Extensión de Models

### Agregar Nuevo Modelo

1. **Crear archivo del modelo**:
```typescript
// src/models/new-entity.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface NewEntityAttributes {
  id: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NewEntityCreationAttributes extends Optional<NewEntityAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class NewEntity extends Model<NewEntityAttributes, NewEntityCreationAttributes> implements NewEntityAttributes {
  public id!: number;
  public name!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NewEntity.init({
  // Definición de campos
}, {
  sequelize,
  tableName: 'new_entities',
  modelName: 'NewEntity'
});

export default NewEntity;
```

2. **Agregar asociaciones**:
```typescript
// En associations.ts
import NewEntity from './new-entity.model';

// Definir relaciones
NewEntity.belongsTo(OtherModel, {
  foreignKey: 'other_id',
  as: 'other'
});
```

3. **Exportar en index.ts**:
```typescript
// En index.ts
import NewEntity from './new-entity.model';

export { NewEntity };
```

## Troubleshooting Común

### 1. Error de Asociación
**Problema**: `Association not found`
**Solución**: Verificar que las asociaciones estén importadas en `index.ts`

### 2. Error de Validación
**Problema**: `Validation error`
**Solución**: Revisar validaciones en el modelo y datos de entrada

### 3. Error de Foreign Key
**Problema**: `Foreign key constraint fails`
**Solución**: Verificar que los registros referenciados existan

### 4. Error de Sincronización
**Problema**: `Table doesn't exist`
**Solución**: Ejecutar `sequelize.sync()` o verificar migraciones