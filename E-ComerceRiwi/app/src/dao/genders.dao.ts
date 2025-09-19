/**
 * Gender DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the genders entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Gender from "../models/gender.model";
import { CreateGenderDto, UpdateGenderDto } from "../dto/genders.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes.
 */
export interface GenderResponseDto {
    id_gender: number;
    name: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Inserts a new gender record into the database.
 * @param data - Data required to create the gender (CreateGendersDto).
 * @returns {Promise<GenderResponseDto>} - The created gender record.
 */
export const createGender = async (data: CreateGenderDto): Promise<GenderResponseDto> => {
    const newGender = await Gender.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: GenderResponseDto = {
        id_gender: newGender.id_gender,
        name: newGender.name,
        is_active: newGender.is_active,
        createdAt: newGender.createdAt as Date,
        updatedAt: newGender.updatedAt as Date,
    };
    return response;
};

/**
 * Retrieves all genders from the 'genders' table.
 * @returns {Promise<GenderResponseDto[]>} - List of all genders.
 */
export const getGenders = async (): Promise<GenderResponseDto[]> => {
    const genders = await Gender.findAll();

    return genders.map(gender => ({
        id_gender: gender.id_gender,
        name: gender.name,
        is_active: gender.is_active,
        createdAt: gender.createdAt as Date,
        updatedAt: gender.updatedAt as Date,
    }));
};

/**
 * Retrieves all active genders from the 'genders' table.
 * @returns {Promise<GenderResponseDto[]>} - List of active genders.
 */
export const getActiveGenders = async (): Promise<GenderResponseDto[]> => {
    const genders = await Gender.findAll({ where: { is_active: true } });

    return genders.map(gender => ({
        id_gender: gender.id_gender,
        name: gender.name,
        is_active: gender.is_active,
        createdAt: gender.createdAt as Date,
        updatedAt: gender.updatedAt as Date,
    }));
};

/**
 * Retrieves a gender record by its unique ID.
 * @param id_gender - Unique gender identifier.
 * @returns {Promise<GenderResponseDto | null>} - The found gender record or null if not found.
 */
export const getGenderById = async (id_gender: number): Promise<GenderResponseDto | null> => {
    const gender = await Gender.findByPk(id_gender);

    if (!gender) {
        return null;
    }

    return {
        id_gender: gender.id_gender,
        name: gender.name,
        is_active: gender.is_active,
        createdAt: gender.createdAt as Date,
        updatedAt: gender.updatedAt as Date,
    };
};

/**
 * Updates an existing gender record by its ID.
 * @param id_gender - Gender identifier to update.
 * @param data - Data to update (UpdateGendersDto).
 * @returns {Promise<GenderResponseDto | null>} - The updated gender record or null if not found.
 */
export const updateGender = async (id_gender: number, data: UpdateGenderDto): Promise<GenderResponseDto | null> => {
    const [rowsAffected, [updatedGender]] = await Gender.update(data, {
        where: { id_gender },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_gender: updatedGender.id_gender,
        name: updatedGender.name,
        is_active: updatedGender.is_active,
        createdAt: updatedGender.createdAt as Date,
        updatedAt: updatedGender.updatedAt as Date,
    };
};

/**
 * Performs a soft delete on a gender record by marking it as inactive.
 * @param id_gender - Gender identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteGender = async (id_gender: number): Promise<boolean> => {
    const [rowsAffected] = await Gender.update(
        { is_active: false },
        { where: { id_gender } }
    );

    return rowsAffected > 0;
};