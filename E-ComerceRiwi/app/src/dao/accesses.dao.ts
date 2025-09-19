// app/src/dao/access.dao.ts

/**
 * Access DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `accesses` entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Access from "../models/access.model";
import { CreateAccessesDto, UpdateAccessesDto, AccessesResponseDto } from "../dto/accesses.dto";

/**
 * Inserts a new access record into the database.
 * @param data - Data required to create the access (CreateAccessesDto).
 * @returns {Promise<AccessesResponseDto>} - The created access record.
 */
export const createAccess = async (data: CreateAccessesDto): Promise<AccessesResponseDto> => {
    const newAccess = await Access.create(data);

    // We convert the Sequelize model instance to the AccessesResponseDto type
    const response: AccessesResponseDto = {
        id_access: newAccess.id_access,
        username: newAccess.username,
        is_active: newAccess.is_active,
        createdAt: newAccess.createdAt,
        updatedAt: newAccess.updatedAt,
    };
    return response;
};

/**
 * Retrieves all active access records from the 'accesses' table.
 * @returns {Promise<AccessesResponseDto[]>} - List of active access records.
 */
export const getActiveAccesses = async (): Promise<AccessesResponseDto[]> => {
    const accesses = await Access.findAll({ where: { is_active: true } });

    return accesses.map(access => ({
        id_access: access.id_access,
        username: access.username,
        is_active: access.is_active,
        createdAt: access.createdAt,
        updatedAt: access.updatedAt,
    }));
};

/**
 * Retrieves an access record by its ID.
 * @param id_access - Unique access identifier.
 * @returns {Promise<AccessesResponseDto | null>} - The found access record or null if not found.
 */
export const getAccessById = async (id_access: number): Promise<AccessesResponseDto | null> => {
    const access = await Access.findByPk(id_access);

    if (!access) {
        return null;
    }

    return {
        id_access: access.id_access,
        username: access.username,
        is_active: access.is_active,
        createdAt: access.createdAt,
        updatedAt: access.updatedAt,
    };
};

/**
 * Retrieves an active access record by its username.
 * This is a common operation for login authentication.
 * @param username - The unique username.
 * @returns {Promise<AccessesResponseDto | null>} - The found access record or null.
 */
export const getActiveAccessByUsername = async (username: string): Promise<AccessesResponseDto | null> => {
    const access = await Access.findOne({
        where: {
            username: username,
            is_active: true
        }
    });

    if (!access) {
        return null;
    }

    return {
        id_access: access.id_access,
        username: access.username,
        is_active: access.is_active,
        createdAt: access.createdAt,
        updatedAt: access.updatedAt,
    };
};

/**
 * Updates an existing access record by its ID.
 * @param id_access - Access identifier to update.
 * @param data - Data to update (UpdateAccessesDto).
 * @returns {Promise<AccessesResponseDto | null>} - The updated access record or null if not found.
 */
export const updateAccess = async (id_access: number, data: UpdateAccessesDto): Promise<AccessesResponseDto | null> => {
    const [rowsAffected, [updatedAccess]] = await Access.update(data, {
        where: { id_access },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_access: updatedAccess.id_access,
        username: updatedAccess.username,
        is_active: updatedAccess.is_active,
        createdAt: updatedAccess.createdAt,
        updatedAt: updatedAccess.updatedAt,
    };
};

/**
 * Performs a soft delete on an access record by marking it as inactive.
 * @param id_access - Access identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteAccess = async (id_access: number): Promise<boolean> => {
    const [rowsAffected] = await Access.update(
        { is_active: false },
        { where: { id_access } }
    );

    return rowsAffected > 0;
};