# Documentación de Seeders - E-Commerce

## ¿Qué son los Seeders?

Los seeders son scripts que poblan la base de datos con datos iniciales necesarios para el funcionamiento de la aplicación. Permiten tener datos de prueba consistentes y configurar el sistema con información base.

## Arquitectura de Seeders

### Estructura de Archivos
```
src/seeders/
├── index.ts              # Orquestador principal
├── role.seeders.ts       # Seeder de roles
├── gender.seeder.ts      # Seeder de géneros
├── category.seeder.ts    # Seeder de categorías
├── payment-method.seeder.ts
├── bank.seeder.ts
├── order-status.seeder.ts
├── country.seeder.ts
├── department.seeder.ts
├── city.seeder.ts
├── access.seeder.ts
├── user.seeder.ts
├── product.seeder.ts
├── order.seeder.ts
├── address.seeder.ts
└── order-detail.seeder.ts
```

### Datos CSV
```
src/docs/data/
├── roles.csv
├── genders.csv
├── categories.csv
├── payment-methods.csv
├── banks.csv
├── order-status.csv
├── countries.csv
├── departaments.csv
├── cities.csv
├── accesses.csv
├── users.csv
├── products.csv
├── orders.csv
├── addresses.csv
└── order-details.csv
```

## Implementación Detallada

### 1. Orquestador Principal (`index.ts`)

```typescript
import { sequelize } from "../config/database";
import { seedRoles } from "./role.seeders";
import { seedGenders } from "./gender.seeder";
// ... otros imports

export const runSeeders = async () => {
  try {
    console.log("🌱 Starting seeders...");
    
    // Sincronizar base de datos (recrear tablas)
    await sequelize.sync({ force: true });
    console.log("📊 Database synchronized - all tables recreated");

    // Ejecutar seeders en orden de dependencias
    await seedRoles();
    await seedGenders();
    await seedCategories();
    await seedPaymentMethods();
    await seedBanks();
    await seedOrderStatuses();
    await seedCountries();
    await seedDepartments();
    await seedCities();
    await seedAccesses();
    await seedUsers();
    await seedProducts();
    await seedOrders();
    await seedAddresses();
    await seedOrderDetails();

    console.log("🎉 All seeders completed successfully!");
  } catch (error) {
    console.error("❌ Error running seeders:", error);
    throw error;
  }
};

// Ejecutar si es llamado directamente
if (require.main === module) {
  runSeeders()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
```

**Características clave:**
- **Orden de ejecución**: Respeta dependencias de foreign keys
- **Sincronización**: Recrea todas las tablas (`force: true`)
- **Manejo de errores**: Captura y reporta errores
- **Logging**: Feedback visual del progreso

### 2. Patrón de Seeder Individual

**Ejemplo: `address.seeder.ts`**

```typescript
import * as addressDao from "../dao/adresses.dao";
import * as fs from "fs";
import * as path from "path";

export const seedAddresses = async () => {
  try {
    console.log("🏠 Seeding addresses...");
    
    // 1. Leer archivo CSV
    const csvPath = path.join(__dirname, "../docs/data/addresses.csv");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",");
    
    // 2. Parsear datos
    const addresses = lines.slice(1).map(line => {
      const values = line.split(",");
      const address: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        let fieldName = header;
        
        // Mapear nombres de columnas si es necesario
        if (header === "departament_id") {
          fieldName = "department_id";
        }
        
        // Convertir tipos de datos
        if (header === "city_id" || header === "department_id" || 
            header === "country_id" || header === "user_id") {
          address[fieldName] = parseInt(value);
        } else {
          address[fieldName] = value;
        }
      });
      return address;
    });

    // 3. Insertar en base de datos
    for (const addressData of addresses) {
      await addressDao.createAddress(addressData);
    }
    
    console.log("✅ Addresses seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding addresses:", error);
    throw error;
  }
};
```

### 3. Tipos de Seeders Implementados

#### A. Seeders de Catálogos (Datos Maestros)
- **Roles**: Admin, Customer
- **Géneros**: Masculino, Femenino, Otro
- **Categorías**: Electrónicos, Ropa, Hogar, etc.
- **Métodos de Pago**: Tarjeta, Efectivo, Transferencia
- **Estados de Orden**: Pendiente, Procesando, Enviado, Entregado

#### B. Seeders Geográficos
- **Países**: Colombia, México, etc.
- **Departamentos**: Cundinamarca, Antioquia, etc.
- **Ciudades**: Bogotá, Medellín, etc.

#### C. Seeders de Entidades Principales
- **Usuarios**: Datos de prueba con diferentes roles
- **Productos**: Catálogo inicial con precios y categorías
- **Órdenes**: Órdenes de ejemplo
- **Direcciones**: Direcciones de envío de usuarios

## Estrategias de Implementación

### 1. Manejo de Dependencias

**Orden de ejecución basado en foreign keys:**
```
1. Catálogos independientes (roles, géneros, categorías)
2. Datos geográficos (países → departamentos → ciudades)
3. Usuarios (depende de roles, géneros, accesos)
4. Productos (depende de categorías)
5. Órdenes (depende de usuarios)
6. Direcciones (depende de usuarios, ciudades)
7. Detalles de orden (depende de órdenes, productos)
```

### 2. Conversión de Tipos de Datos

```typescript
// Identificar campos numéricos
const numericFields = ["city_id", "department_id", "country_id", "user_id"];

headers.forEach((header, index) => {
  const value = values[index];
  
  if (numericFields.includes(header)) {
    address[header] = parseInt(value);
  } else if (header === "is_active") {
    address[header] = value === "true";
  } else {
    address[header] = value;
  }
});
```

### 3. Mapeo de Nombres de Columnas

```typescript
// Corregir inconsistencias en nombres
let fieldName = header;
if (header === "departament_id") {
  fieldName = "department_id";
}
```

### 4. Manejo de Errores Específicos

```typescript
try {
  await addressDao.createAddress(addressData);
} catch (error) {
  if (error.name === 'SequelizeValidationError') {
    console.error(`Validation error for address:`, addressData);
  }
  throw error;
}
```

## Formato de Archivos CSV

### Estructura Estándar
```csv
campo1,campo2,campo3,is_active
valor1,valor2,valor3,true
valor4,valor5,valor6,false
```

### Ejemplo: `addresses.csv`
```csv
user_id,city_id,department_id,country_id,street,number,postal_code,is_active
1,1,1,1,Carrera 7,123-45,110111,true
2,2,2,1,Calle 50,25-30,050001,true
```

### Ejemplo: `users.csv`
```csv
role_id,gender_id,access_id,name,last_name,email,password,phone,is_active
1,1,1,Admin,User,admin@test.com,hashedpassword,1234567890,true
2,2,2,John,Doe,john@test.com,hashedpassword,0987654321,true
```

## Comandos de Ejecución

### Ejecutar Todos los Seeders
```bash
# Desde contenedor Docker
docker-compose exec app npm run seed

# Directamente con Node.js
npm run seed
```

### Ejecutar Seeder Individual
```bash
# Desde contenedor
docker-compose exec app npx ts-node src/seeders/address.seeder.ts
```

### Verificar Datos Insertados
```bash
# Conectar a base de datos
docker-compose exec db psql -U postgres -d ecommerce_db

# Verificar datos
SELECT COUNT(*) FROM addresses;
SELECT * FROM users LIMIT 5;
```

## Mejores Prácticas Implementadas

### 1. Logging Consistente
```typescript
console.log("🏠 Seeding addresses...");        // Inicio
console.log("✅ Addresses seeded successfully"); // Éxito
console.error("❌ Error seeding addresses:", error); // Error
```

### 2. Validación de Datos
```typescript
// Verificar que el archivo existe
if (!fs.existsSync(csvPath)) {
  throw new Error(`CSV file not found: ${csvPath}`);
}

// Validar headers
const requiredHeaders = ["user_id", "city_id", "department_id"];
const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
if (missingHeaders.length > 0) {
  throw new Error(`Missing headers: ${missingHeaders.join(", ")}`);
}
```

### 3. Transacciones (Opcional)
```typescript
const transaction = await sequelize.transaction();
try {
  for (const addressData of addresses) {
    await addressDao.createAddress(addressData, { transaction });
  }
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

## Troubleshooting Común

### 1. Error de Foreign Key
**Problema**: `violates foreign key constraint`
**Solución**: Verificar orden de ejecución de seeders

### 2. Error de Validación
**Problema**: `notNull Violation`
**Solución**: Verificar mapeo de nombres de columnas

### 3. Error de Parsing CSV
**Problema**: Datos mal formateados
**Solución**: Verificar formato CSV y caracteres especiales

## Extensión de Seeders

### Agregar Nuevo Seeder

1. **Crear archivo seeder**:
```typescript
// src/seeders/new-entity.seeder.ts
export const seedNewEntity = async () => {
  // Implementación similar
};
```

2. **Crear archivo CSV**:
```csv
// src/docs/data/new-entity.csv
field1,field2,is_active
value1,value2,true
```

3. **Agregar al orquestador**:
```typescript
// src/seeders/index.ts
import { seedNewEntity } from "./new-entity.seeder";

// En runSeeders()
await seedNewEntity();
```

## Consideraciones de Rendimiento

### Para Grandes Volúmenes de Datos
```typescript
// Usar bulk insert en lugar de inserts individuales
const addresses = parseCSVData();
await Address.bulkCreate(addresses);
```

### Optimización de Memoria
```typescript
// Procesar archivos grandes por chunks
const chunkSize = 1000;
for (let i = 0; i < addresses.length; i += chunkSize) {
  const chunk = addresses.slice(i, i + chunkSize);
  await Address.bulkCreate(chunk);
}
```