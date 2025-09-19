# Documentación de DAOs y DTOs - E-Commerce

## ¿Qué son los DAOs y DTOs?

### DAO (Data Access Object)
- **Propósito**: Encapsula toda la lógica de acceso a datos
- **Función**: Abstrae las operaciones de base de datos del resto de la aplicación
- **Beneficios**: Separación de responsabilidades, reutilización, mantenibilidad

### DTO (Data Transfer Object)
- **Propósito**: Define la estructura de datos para transferencia
- **Función**: Valida y tipifica datos de entrada y salida
- **Beneficios**: Type safety, validación, documentación automática

## Arquitectura Implementada

### Estructura de Archivos
```
src/
├── dao/                    # Data Access Objects
│   ├── adresses.dao.ts     # CRUD de direcciones
│   ├── user.dao.ts         # CRUD de usuarios
│   ├── product.dao.ts      # CRUD de productos
│   ├── order.dao.ts        # CRUD de órdenes
│   └── ...
├── dto/                    # Data Transfer Objects
│   ├── addresses.dto.ts    # Tipos para direcciones
│   ├── user.dto.ts         # Tipos para usuarios
│   ├── product.dto.ts      # Tipos para productos
│   └── ...
└── models/                 # Modelos Sequelize
    ├── address.model.ts
    ├── user.model.ts
    └── ...
```

## Implementación de DTOs

### 1. Estructura de DTO (`addresses.dto.ts`)

```typescript
/**
 * DTO para crear una nueva dirección
 * Contiene todos los campos requeridos para la creación
 */
export interface CreateAddressesDto {
    user_id: number;           // ID del usuario propietario
    city_id: number;           // ID de la ciudad
    department_id: number;     // ID del departamento
    country_id: number;        // ID del país
    street: string;            // Nombre de la calle
    number: string;            // Número de la dirección
    postal_code: string;       // Código postal
    is_active?: boolean;       // Estado activo (opcional, default: true)
}

/**
 * DTO para actualizar una dirección existente
 * Todos los campos son opcionales para permitir actualizaciones parciales
 */
export interface UpdateAddressesDto {
    user_id?: number;
    city_id?: number;
    department_id?: number;
    country_id?: number;
    street?: string;
    number?: string;
    postal_code?: string;
    is_active?: boolean;
}

/**
 * DTO de respuesta estándar
 * Incluye todos los campos que se devuelven al cliente
 */
export interface AddressesResponseDto {
    id_address: number;        // ID único de la dirección
    user_id: number;
    city_id: number;
    department_id: number;
    country_id: number;
    street: string;
    number: string;
    postal_code: string;
    is_active: boolean;
    createdAt: Date;           // Timestamp de creación
    updatedAt: Date;           // Timestamp de última actualización
}
```

### 2. Patrones de DTO Implementados

#### A. DTO de Creación
```typescript
// Campos requeridos para crear entidad
export interface CreateUserDto {
    role_id: number;
    gender_id: number;
    access_id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    is_active?: boolean;  // Opcional con valor por defecto
}
```

#### B. DTO de Actualización
```typescript
// Todos los campos opcionales para updates parciales
export interface UpdateUserDto {
    role_id?: number;
    gender_id?: number;
    name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
}
```

#### C. DTO de Respuesta
```typescript
// Incluye campos calculados y timestamps
export interface UserResponseDto {
    id_user: number;
    role_id: number;
    gender_id: number;
    access_id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
    // No incluye password por seguridad
}
```

## Implementación de DAOs

### 1. Estructura de DAO (`adresses.dao.ts`)

```typescript
import Address from "../models/address.model";
import { CreateAddressesDto, UpdateAddressesDto } from "../dto/addresses.dto";

/**
 * DTO de respuesta consistente que refleja la estructura de BD
 * Usado para estandarizar respuestas del DAO
 */
export interface AddressesResponseDto {
    id_address: number;
    user_id: number;
    city_id: number;
    department_id: number;
    country_id: number;
    street: string;
    number: string;
    postal_code: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Crear nueva dirección
 * @param data - Datos de la dirección a crear
 * @returns Dirección creada mapeada a DTO de respuesta
 */
export const createAddress = async (data: CreateAddressesDto): Promise<AddressesResponseDto> => {
    const newAddress = await Address.create(data);

    // Mapear modelo Sequelize a DTO de respuesta
    const response: AddressesResponseDto = {
        id_address: newAddress.id_address,
        user_id: newAddress.user_id,
        city_id: newAddress.city_id,
        department_id: newAddress.department_id,
        country_id: newAddress.country_id,
        street: newAddress.street,
        number: newAddress.number,
        postal_code: newAddress.postal_code,
        is_active: newAddress.is_active,
        createdAt: newAddress.createdAt,
        updatedAt: newAddress.updatedAt,
    };
    return response;
};

/**
 * Obtener todas las direcciones activas
 * @returns Lista de direcciones activas
 */
export const getActiveAddresses = async (): Promise<AddressesResponseDto[]> => {
    const addresses = await Address.findAll({ 
        where: { is_active: true } 
    });

    return addresses.map(address => ({
        id_address: address.id_address,
        user_id: address.user_id,
        city_id: address.city_id,
        department_id: address.department_id,
        country_id: address.country_id,
        street: address.street,
        number: address.number,
        postal_code: address.postal_code,
        is_active: address.is_active,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
    }));
};

/**
 * Obtener dirección por ID
 * @param id_address - ID único de la dirección
 * @returns Dirección encontrada o null
 */
export const getAddressById = async (id_address: number): Promise<AddressesResponseDto | null> => {
    const address = await Address.findByPk(id_address);

    if (!address) {
        return null;
    }

    return {
        id_address: address.id_address,
        user_id: address.user_id,
        city_id: address.city_id,
        department_id: address.department_id,
        country_id: address.country_id,
        street: address.street,
        number: address.number,
        postal_code: address.postal_code,
        is_active: address.is_active,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
    };
};

/**
 * Obtener direcciones por usuario
 * @param user_id - ID del usuario
 * @returns Lista de direcciones del usuario
 */
export const getAddressesByUserId = async (user_id: number): Promise<AddressesResponseDto[]> => {
    const addresses = await Address.findAll({ 
        where: { user_id, is_active: true } 
    });

    return addresses.map(address => ({
        id_address: address.id_address,
        user_id: address.user_id,
        city_id: address.city_id,
        department_id: address.department_id,
        country_id: address.country_id,
        street: address.street,
        number: address.number,
        postal_code: address.postal_code,
        is_active: address.is_active,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
    }));
};

/**
 * Actualizar dirección existente
 * @param id_address - ID de la dirección a actualizar
 * @param data - Datos a actualizar
 * @returns Dirección actualizada o null si no existe
 */
export const updateAddress = async (
    id_address: number, 
    data: UpdateAddressesDto
): Promise<AddressesResponseDto | null> => {
    const [rowsAffected, [updatedAddress]] = await Address.update(data, {
        where: { id_address },
        returning: true,  // Devolver el registro actualizado
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_address: updatedAddress.id_address,
        user_id: updatedAddress.user_id,
        city_id: updatedAddress.city_id,
        department_id: updatedAddress.department_id,
        country_id: updatedAddress.country_id,
        street: updatedAddress.street,
        number: updatedAddress.number,
        postal_code: updatedAddress.postal_code,
        is_active: updatedAddress.is_active,
        createdAt: updatedAddress.createdAt,
        updatedAt: updatedAddress.updatedAt,
    };
};

/**
 * Eliminación lógica (soft delete)
 * @param id_address - ID de la dirección a eliminar
 * @returns true si se eliminó, false si no existe
 */
export const softDeleteAddress = async (id_address: number): Promise<boolean> => {
    const [rowsAffected] = await Address.update(
        { is_active: false },
        { where: { id_address } }
    );

    return rowsAffected > 0;
};
```

### 2. Patrones de DAO Implementados

#### A. Operaciones CRUD Básicas
```typescript
// CREATE
export const createEntity = async (data: CreateDto): Promise<ResponseDto>

// READ
export const getEntityById = async (id: number): Promise<ResponseDto | null>
export const getAllEntities = async (): Promise<ResponseDto[]>
export const getActiveEntities = async (): Promise<ResponseDto[]>

// UPDATE
export const updateEntity = async (id: number, data: UpdateDto): Promise<ResponseDto | null>

// DELETE
export const softDeleteEntity = async (id: number): Promise<boolean>
export const hardDeleteEntity = async (id: number): Promise<boolean>
```

#### B. Consultas Especializadas
```typescript
// Búsquedas por relaciones
export const getAddressesByUserId = async (user_id: number): Promise<AddressesResponseDto[]>
export const getProductsByCategory = async (category_id: number): Promise<ProductResponseDto[]>

// Búsquedas con filtros
export const getOrdersByStatus = async (status: string): Promise<OrderResponseDto[]>
export const getUsersByRole = async (role_id: number): Promise<UserResponseDto[]>
```

#### C. Operaciones Complejas
```typescript
// Agregaciones
export const getOrderTotalByUser = async (user_id: number): Promise<number>

// Joins complejos
export const getOrdersWithDetails = async (): Promise<OrderWithDetailsDto[]>

// Transacciones
export const createOrderWithItems = async (
    orderData: CreateOrderDto, 
    items: CreateOrderItemDto[]
): Promise<OrderResponseDto>
```

## Mapeo de Datos

### 1. Modelo → DTO de Respuesta
```typescript
const mapAddressToResponseDto = (address: Address): AddressesResponseDto => ({
    id_address: address.id_address,
    user_id: address.user_id,
    city_id: address.city_id,
    department_id: address.department_id,
    country_id: address.country_id,
    street: address.street,
    number: address.number,
    postal_code: address.postal_code,
    is_active: address.is_active,
    createdAt: address.createdAt,
    updatedAt: address.updatedAt,
});
```

### 2. Mapeo con Relaciones
```typescript
export const getAddressWithLocation = async (id: number): Promise<AddressWithLocationDto | null> => {
    const address = await Address.findByPk(id, {
        include: [
            { model: City, as: 'city' },
            { model: Department, as: 'department' },
            { model: Country, as: 'country' }
        ]
    });

    if (!address) return null;

    return {
        ...mapAddressToResponseDto(address),
        city_name: address.city.name,
        department_name: address.department.name,
        country_name: address.country.name,
    };
};
```

## Validaciones en DTOs

### 1. Validaciones Básicas con TypeScript
```typescript
export interface CreateAddressesDto {
    user_id: number;           // Tipo numérico requerido
    city_id: number;
    department_id: number;
    country_id: number;
    street: string;            // Tipo string requerido
    number: string;
    postal_code: string;
    is_active?: boolean;       // Opcional con tipo boolean
}
```

### 2. Validaciones Avanzadas (Extensión Futura)
```typescript
import { IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    role_id: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    phone?: string;
}
```

## Manejo de Errores

### 1. En DAOs
```typescript
export const createAddress = async (data: CreateAddressesDto): Promise<AddressesResponseDto> => {
    try {
        const newAddress = await Address.create(data);
        return mapAddressToResponseDto(newAddress);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            throw new Error(`Validation failed: ${error.message}`);
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new Error(`Foreign key constraint failed: ${error.message}`);
        }
        throw error;
    }
};
```

### 2. Validaciones de Negocio
```typescript
export const updateAddress = async (
    id_address: number, 
    data: UpdateAddressesDto
): Promise<AddressesResponseDto | null> => {
    // Validar que la dirección existe
    const existingAddress = await Address.findByPk(id_address);
    if (!existingAddress) {
        throw new Error('Address not found');
    }

    // Validar que el usuario puede modificar esta dirección
    if (data.user_id && data.user_id !== existingAddress.user_id) {
        throw new Error('Cannot change address owner');
    }

    const [rowsAffected, [updatedAddress]] = await Address.update(data, {
        where: { id_address },
        returning: true,
    });

    return mapAddressToResponseDto(updatedAddress);
};
```

## Optimizaciones Implementadas

### 1. Consultas Eficientes
```typescript
// Usar índices para búsquedas frecuentes
export const getAddressesByUserId = async (user_id: number): Promise<AddressesResponseDto[]> => {
    const addresses = await Address.findAll({
        where: { 
            user_id,           // Índice en user_id
            is_active: true    // Índice en is_active
        },
        order: [['createdAt', 'DESC']]  // Ordenar por fecha
    });

    return addresses.map(mapAddressToResponseDto);
};
```

### 2. Paginación
```typescript
export const getAddressesPaginated = async (
    page: number = 1, 
    limit: number = 10
): Promise<{ addresses: AddressesResponseDto[], total: number }> => {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await Address.findAndCountAll({
        where: { is_active: true },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
    });

    return {
        addresses: rows.map(mapAddressToResponseDto),
        total: count
    };
};
```

## Uso en Controladores

### 1. Integración con Controladores
```typescript
// controllers/address.controller.ts
import * as addressDao from '../dao/addresses.dao';
import { CreateAddressesDto, UpdateAddressesDto } from '../dto/addresses.dto';

export const createAddress = async (req: Request, res: Response) => {
    try {
        const addressData: CreateAddressesDto = req.body;
        const newAddress = await addressDao.createAddress(addressData);
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAddressById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const address = await addressDao.getAddressById(id);
        
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

## Mejores Prácticas Implementadas

### 1. Consistencia en Naming
- **DAOs**: `createEntity`, `getEntityById`, `updateEntity`, `softDeleteEntity`
- **DTOs**: `CreateEntityDto`, `UpdateEntityDto`, `EntityResponseDto`

### 2. Separación de Responsabilidades
- **DAO**: Solo operaciones de base de datos
- **DTO**: Solo definición de tipos y validación
- **Controller**: Solo manejo de HTTP y orquestación

### 3. Type Safety
- Uso completo de TypeScript
- Interfaces bien definidas
- Mapeo explícito entre tipos

### 4. Documentación
- JSDoc en todas las funciones públicas
- Comentarios explicativos en lógica compleja
- Ejemplos de uso en comentarios

## Extensión del Sistema

### Agregar Nueva Entidad

1. **Crear DTO**:
```typescript
// src/dto/new-entity.dto.ts
export interface CreateNewEntityDto {
    name: string;
    description: string;
    is_active?: boolean;
}

export interface UpdateNewEntityDto {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export interface NewEntityResponseDto {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
```

2. **Crear DAO**:
```typescript
// src/dao/new-entity.dao.ts
import NewEntity from '../models/new-entity.model';
import { CreateNewEntityDto, UpdateNewEntityDto, NewEntityResponseDto } from '../dto/new-entity.dto';

export const createNewEntity = async (data: CreateNewEntityDto): Promise<NewEntityResponseDto> => {
    const entity = await NewEntity.create(data);
    return mapToResponseDto(entity);
};

// ... otras operaciones CRUD
```

3. **Usar en Controller**:
```typescript
// src/controllers/new-entity.controller.ts
import * as newEntityDao from '../dao/new-entity.dao';

export const createNewEntity = async (req: Request, res: Response) => {
    const entityData = req.body;
    const newEntity = await newEntityDao.createNewEntity(entityData);
    res.status(201).json(newEntity);
};
```