# Documentación del Proyecto E-Commerce

## Estructura del Proyecto

```
E-ComerceRiwi/
├── app/                          # Aplicación principal
│   ├── src/                      # Código fuente
│   │   ├── config/               # Configuraciones
│   │   │   └── database.ts       # Configuración de base de datos
│   │   ├── controllers/          # Controladores de rutas
│   │   │   └── user.controller.ts
│   │   ├── dao/                  # Data Access Objects
│   │   │   ├── adresses.dao.ts   # CRUD de direcciones
│   │   │   ├── user.dao.ts       # CRUD de usuarios
│   │   │   ├── product.dao.ts    # CRUD de productos
│   │   │   └── ...               # Otros DAOs
│   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── addresses.dto.ts  # Tipos para direcciones
│   │   │   ├── user.dto.ts       # Tipos para usuarios
│   │   │   └── ...               # Otros DTOs
│   │   ├── models/               # Modelos de Sequelize
│   │   │   ├── address.model.ts  # Modelo de direcciones
│   │   │   ├── user.model.ts     # Modelo de usuarios
│   │   │   ├── associations.ts   # Relaciones entre modelos
│   │   │   └── index.ts          # Exportación de modelos
│   │   ├── routes/               # Definición de rutas
│   │   │   └── user.routes.ts
│   │   ├── seeders/              # Pobladores de datos
│   │   │   ├── index.ts          # Ejecutor principal
│   │   │   ├── address.seeder.ts # Seeder de direcciones
│   │   │   └── ...               # Otros seeders
│   │   ├── docs/                 # Documentación y datos
│   │   │   └── data/             # Archivos CSV
│   │   │       ├── addresses.csv
│   │   │       ├── users.csv
│   │   │       └── ...
│   │   ├── index.ts              # Punto de entrada
│   │   └── server.ts             # Configuración del servidor
│   ├── package.json              # Dependencias de Node.js
│   ├── tsconfig.json             # Configuración TypeScript
│   └── Dockerfile                # Imagen Docker de la app
├── docker-compose.yml            # Orquestación de servicios
└── README.md                     # Documentación básica
```

## Arquitectura del Sistema

### 1. Patrón de Capas

**Modelo de 4 Capas:**
- **Controladores**: Manejan las peticiones HTTP
- **DAOs**: Lógica de acceso a datos
- **Modelos**: Definición de entidades de base de datos
- **DTOs**: Transferencia y validación de datos

### 2. Tecnologías Utilizadas

- **Backend**: Node.js + TypeScript
- **ORM**: Sequelize
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker + Docker Compose
- **Validación**: DTOs con interfaces TypeScript

## Funcionamiento Detallado

### 1. Configuración de Base de Datos (`config/database.ts`)

```typescript
// Establece conexión con PostgreSQL usando Sequelize
// Configuración desde variables de entorno
// Maneja sincronización de modelos
```

**Función:**
- Conecta con PostgreSQL
- Configura Sequelize ORM
- Sincroniza modelos con tablas

### 2. Modelos (`models/`)

**Propósito:** Definen la estructura de las tablas de base de datos

**Ejemplo - `address.model.ts`:**
```typescript
// Define tabla 'addresses' con campos:
// - id_address (PK)
// - user_id (FK)
// - department_id (FK)
// - city_id (FK)
// - country_id (FK)
// - street, number, postal_code
// - is_active, timestamps
```

**`associations.ts`:**
- Define relaciones entre modelos
- Configura foreign keys
- Establece asociaciones (hasMany, belongsTo)

### 3. DTOs (`dto/`)

**Propósito:** Validación y tipado de datos

**Tipos definidos:**
- `CreateAddressesDto`: Datos para crear dirección
- `UpdateAddressesDto`: Datos para actualizar dirección
- `AddressesResponseDto`: Formato de respuesta

### 4. DAOs (`dao/`)

**Propósito:** Encapsulan operaciones de base de datos

**Funciones típicas:**
- `create()`: Insertar registros
- `getById()`: Buscar por ID
- `getAll()`: Listar todos
- `update()`: Actualizar registro
- `softDelete()`: Eliminación lógica

**Ejemplo - `addresses.dao.ts`:**
```typescript
export const createAddress = async (data: CreateAddressesDto) => {
    const newAddress = await Address.create(data);
    return mapToResponseDto(newAddress);
};
```

### 5. Seeders (`seeders/`)

**Propósito:** Poblar base de datos con datos iniciales

**Flujo de ejecución (`index.ts`):**
1. Sincronizar base de datos (recrear tablas)
2. Ejecutar seeders en orden:
   - Roles → Géneros → Categorías
   - Métodos de pago → Bancos → Estados
   - Países → Departamentos → Ciudades
   - Accesos → Usuarios → Productos
   - Órdenes → Direcciones → Detalles de orden

**Cada seeder:**
1. Lee archivo CSV correspondiente
2. Parsea datos línea por línea
3. Convierte tipos de datos (string → number)
4. Inserta en base de datos usando DAO

### 6. Controladores (`controllers/`)

**Propósito:** Manejar peticiones HTTP y respuestas

**Estructura típica:**
```typescript
export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await userDao.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

### 7. Rutas (`routes/`)

**Propósito:** Definir endpoints de la API

```typescript
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
```

## Flujo de Datos

### 1. Petición HTTP
```
Cliente → Ruta → Controlador → DAO → Modelo → Base de Datos
```

### 2. Respuesta
```
Base de Datos → Modelo → DAO → DTO → Controlador → Cliente
```

### 3. Ejemplo Completo - Crear Dirección

1. **Cliente** envía POST a `/addresses`
2. **Ruta** dirige a `addressController.createAddress`
3. **Controlador** valida datos y llama `addressDao.createAddress`
4. **DAO** usa modelo Address para insertar en BD
5. **Respuesta** se mapea a DTO y se envía al cliente

## Configuración Docker

### `docker-compose.yml`

**Servicios definidos:**
- **app**: Aplicación Node.js (puerto 3000)
- **db**: PostgreSQL (puerto 5432)

**Volúmenes:**
- Código fuente montado para desarrollo
- Datos de PostgreSQL persistentes

### `Dockerfile`

**Proceso de construcción:**
1. Imagen base Node.js
2. Copiar package.json e instalar dependencias
3. Copiar código fuente
4. Exponer puerto 3000
5. Comando de inicio: `npm start`

## Comandos de Desarrollo

### Inicialización
```bash
# Clonar proyecto
git clone <repository-url>
cd E-ComerceRiwi/E-ComerceRiwi

# Levantar servicios
docker-compose up -d

# Poblar base de datos
docker-compose exec app npm run seed
```

### Desarrollo
```bash
# Ver logs
docker-compose logs -f app

# Ejecutar comandos en contenedor
docker-compose exec app npm run <script>

# Reconstruir después de cambios
docker-compose down
docker-compose up --build -d
```

### Base de Datos
```bash
# Conectar a PostgreSQL
docker-compose exec db psql -U postgres -d ecommerce_db

# Consultas útiles
SELECT * FROM users;
SELECT * FROM addresses;
\dt  # Ver tablas
\q   # Salir
```

## Scripts NPM Disponibles

```json
{
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "seed": "ts-node src/seeders/index.ts"
}
```

## Variables de Entorno

**Archivo `.env`:**
```
DB_HOST=db
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=password
NODE_ENV=development
```

## Relaciones de Base de Datos

### Entidades Principales
- **Users** (usuarios)
- **Addresses** (direcciones de usuarios)
- **Products** (productos)
- **Orders** (órdenes de compra)
- **Order_Items** (detalles de órdenes)

### Relaciones
- User → Addresses (1:N)
- Order → Order_Items (1:N)
- Product → Order_Items (1:N)
- Country → Departments (1:N)
- Department → Cities (1:N)
- City → Addresses (1:N)

## Próximos Pasos

### Para Desarrollo
1. Implementar autenticación JWT
2. Agregar validaciones con middleware
3. Implementar paginación en consultas
4. Agregar tests unitarios
5. Configurar CI/CD

### Para Producción
1. Configurar variables de entorno de producción
2. Implementar logging estructurado
3. Configurar monitoreo
4. Optimizar consultas de base de datos
5. Implementar cache (Redis)

## Troubleshooting

Ver archivo `TROUBLESHOOTING.md` para problemas comunes y soluciones.

## Contribución

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request