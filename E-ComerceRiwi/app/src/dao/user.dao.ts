import User, { UserCreationAttributes } from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

/**
 * DAO de Usuarios usando Sequelize
 * Funciones de acceso a datos para la entidad User
 */
export class UserDAO {
  
  /**
   * Crear un nuevo usuario
   */
  async create(userData: CreateUserDto): Promise<User> {
    return await User.create(userData as UserCreationAttributes);
  }

  /**
   * Obtener todos los usuarios
   */
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  /**
   * Buscar usuario por ID
   */
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  /**
   * Buscar usuario por email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  /**
   * Actualizar usuario
   */
  async update(id: number, userData: UpdateUserDto): Promise<[number, User[]]> {
    return await User.update(userData, { 
      where: { id_user: id },
      returning: true 
    });
  }

  /**
   * Eliminar usuario (soft delete)
   */
  async delete(id: number): Promise<number> {
    const [affectedRows] = await User.update(
      { is_active: false },
      { where: { id_user: id } }
    );
    return affectedRows;
  }
}

// Función exportada para compatibilidad con seeders
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const userDAO = new UserDAO();
  return await userDAO.create(userData);
}