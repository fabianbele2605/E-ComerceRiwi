# Guía de Solución de Problemas - E-Commerce Seeders

## Problemas Encontrados y Soluciones

### 1. Error: `Address.department_id cannot be null`

**Problema:**
```
ValidationError [SequelizeValidationError]: notNull Violation: Address.department_id cannot be null
```

**Causa:**
- El archivo CSV `addresses.csv` tenía la columna `departament_id` (con 'a')
- El modelo Address esperaba `department_id` (con 'e')
- Esta diferencia causaba que el campo fuera null al crear las direcciones

**Solución:**
```bash
# Corregir el nombre de columna en el CSV dentro del contenedor
docker-compose exec app sed -i 's/departament_id/department_id/g' src/docs/data/addresses.csv
```

### 2. Error: Foreign Key Constraint en Order Items

**Problema:**
```
insert or update on table "order_items" violates foreign key constraint "order_items_order_id_fkey"
Key (order_id)=(2) is not present in table "orders"
```

**Causa:**
- El seeder de órdenes solo creaba 1 orden (id=1)
- El CSV `order-details.csv` tenía referencias a order_id del 1 al 5
- Los order_items intentaban referenciar órdenes inexistentes

**Solución:**
```bash
# Cambiar todos los order_id a 1 en el CSV
docker-compose exec app sed -i 's/^[2-5],/1,/g' src/docs/data/order-details.csv
```

## Comandos Útiles para Desarrollo

### Reconstruir Contenedores
```bash
# Parar contenedores
docker-compose down

# Reconstruir sin cache (cuando hay cambios en código)
docker-compose build --no-cache

# Levantar contenedores
docker-compose up -d
```

### Ejecutar Seeders
```bash
# Ejecutar todos los seeders
docker-compose exec app npm run seed
```

### Consultas en Base de Datos
```bash
# Conectar a PostgreSQL
docker-compose exec db psql -U postgres -d ecommerce_db

# Consultas útiles dentro de psql:
\dt                    # Ver todas las tablas
SELECT * FROM users;   # Ver usuarios
SELECT * FROM orders;  # Ver órdenes
\q                     # Salir
```

### Verificar Archivos en Contenedor
```bash
# Ver contenido de archivos CSV
docker-compose exec app cat src/docs/data/addresses.csv
docker-compose exec app cat src/docs/data/order-details.csv

# Ver código de seeders
docker-compose exec app cat src/seeders/address.seeder.ts
```

## Configuración para Ubuntu

### Requisitos Previos
```bash
# Instalar Docker
sudo apt update
sudo apt install docker.io docker-compose

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
# Reiniciar sesión después de este comando
```

### Clonar y Ejecutar Proyecto
```bash
# Clonar repositorio
git clone <repository-url>
cd E-ComerceRiwi/E-ComerceRiwi

# Levantar servicios
docker-compose up -d

# Ejecutar seeders
docker-compose exec app npm run seed
```

### Problemas Comunes en Ubuntu

**Error de permisos con Docker:**
```bash
# Si aparece "permission denied"
sudo chmod 666 /var/run/docker.sock
# O reiniciar después de agregar usuario al grupo docker
```

**Puertos ocupados:**
```bash
# Verificar puertos en uso
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :5432

# Cambiar puertos en docker-compose.yml si es necesario
```

## Flujo de Trabajo Recomendado

1. **Editar código** en el editor (VS Code, etc.)
2. **Guardar cambios** (Ctrl+S)
3. **Reconstruir contenedor** si hay cambios en código:
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```
4. **Ejecutar seeders** para probar:
   ```bash
   docker-compose exec app npm run seed
   ```

## Notas Importantes

- Los cambios en archivos TypeScript requieren reconstruir el contenedor
- Los cambios en archivos CSV se pueden hacer directamente en el contenedor con `sed`
- Siempre verificar que los datos en CSV coincidan con las relaciones de la base de datos
- Usar `docker-compose logs app` para ver logs detallados en caso de errores

## Contacto

Si encuentras otros problemas, documenta:
1. El error exacto
2. Los pasos que llevaron al error
3. La solución aplicada

Esto ayudará a mantener esta guía actualizada para futuros desarrolladores.