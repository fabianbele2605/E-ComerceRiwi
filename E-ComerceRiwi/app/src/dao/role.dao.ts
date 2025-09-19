// app/src/dao/role.dao.ts

/**
 * Role DAO
 * ---------
 * This file contains the Data Access Object (DAO) functions for the `Role` entity.
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createRole: Inserts a new Role into the database.
 *  - getRolesActive: Retrieves all roles.
 *  - getRoles: Retrieves all roles.
 *  - getRoleByIdActive: Retrieves a Role by ID.
 *  - getRoleById: Retrieves a Role by ID.
 *  - updateRole: Updates an existing Role.
 *  - softDeleteRole: Marks a Role as inactive (soft delete).
 */

import Role from "../models/role.model";
import { CreateRoleDto, UpdateRoleDto, RoleResponseDto } from "../dto/role.dto";

/**
 * Inserts a new Role into the database.
 *
 * @param data - Data required to create the Role (CreateRoleDto).
 * @returns {Promise<RoleResponseDto>} - The created Role.
 */
export const createRole = async (data: CreateRoleDto): Promise<RoleResponseDto> => {
  const role = await Role.create({
    name: data.name,
    is_active: data.is_active ?? true, // default if not provided
  });

  return role.toJSON() as RoleResponseDto;
};

/**
 * Retrieves all active Roles from the `Role` table.
 *
 * @returns {Promise<RoleResponseDto[]>} - List of active Roles.
 */
export const getRolesActive = async (): Promise<RoleResponseDto[]> => {
  const roles = await Role.findAll({ where: { is_active: true } });
  return roles.map((r) => r.toJSON() as RoleResponseDto);
};

/**
 * Retrieves all Roles from the `Role` table.
 *
 * @returns {Promise<RoleResponseDto[]>} - List of Roles.
 */
export const getRoles = async (): Promise<RoleResponseDto[]> => {
  const roles = await Role.findAll();
  return roles.map((r) => r.toJSON() as RoleResponseDto);
};

/**
 * Retrieves an active Role by ID.
 *
 * @param id_role - Role identifier.
 * @returns {Promise<RoleResponseDto | null>} - Found Role or null.
 */
export const getRoleByIdActive = async (id_role: number): Promise<RoleResponseDto | null> => {
  const role = await Role.findOne({ where: { id_role, is_active: true } });
  return role ? (role.toJSON() as RoleResponseDto) : null;
};

/**
 * Retrieves a Role by ID.
 *
 * @param id_role - Role identifier.
 * @returns {Promise<RoleResponseDto | null>} - Found Role or null.
 */
export const getRoleById = async (id_role: number): Promise<RoleResponseDto | null> => {
  const role = await Role.findByPk(id_role);
  return role ? (role.toJSON() as RoleResponseDto) : null;
};

/**
 * Updates an existing Role.
 *
 * @param id_role - Role identifier to update.
 * @param data - Data to update (UpdateRoleDto).
 * @returns {Promise<RoleResponseDto | null>} - Updated Role or null if not found.
 */
export const updateRole = async (id_role: number, data: UpdateRoleDto): Promise<RoleResponseDto | null> => {
  const [rows, roles] = await Role.update(data, {
    where: { id_role },
    returning: true,
  });

  if (rows > 0 && roles.length > 0) {
    const updatedRole = roles[0].toJSON() as RoleResponseDto;
    return updatedRole;
  }
  return null;
};

/**
 * Marks a Role as inactive (soft delete).
 *
 * @param id_role - Role identifier.
 * @returns {Promise<boolean>} - true if the Role was updated, false if not found.
 */
export const softDeleteRole = async (id_role: number): Promise<boolean> => {
  const [rows] = await Role.update(
    { is_active: false },
    { where: { id_role } }
  );

  return rows > 0;
};
