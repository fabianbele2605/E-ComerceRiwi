/**
 * Address DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the addresses entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Address from "../models/address.model";
import { CreateAddressesDto, UpdateAddressesDto } from "../dto/addresses.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes, avoiding inconsistencies.
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
 * Inserts a new address record into the database.
 * @param data - Data required to create the address (CreateAddressesDto).
 * @returns {Promise<AddressesResponseDto>} - The created address record.
 */
export const createAddress = async (data: CreateAddressesDto): Promise<AddressesResponseDto> => {
    const newAddress = await Address.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: AddressesResponseDto = {
        id_address: newAddress.id_address,
        user_id: newAddress.user_id,
        city_id: newAddress.city_id,
        // Using `department_id` to match the ORM model
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
 * Retrieves all active addresses from the 'addresses' table.
 * @returns {Promise<AddressesResponseDto[]>} - List of active addresses.
 */
export const getActiveAddresses = async (): Promise<AddressesResponseDto[]> => {
    const addresses = await Address.findAll({ where: { is_active: true } });

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
 * Retrieves an address record by its unique ID.
 * @param id_address - Unique address identifier.
 * @returns {Promise<AddressesResponseDto | null>} - The found address record or null if not found.
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
 * Retrieves all addresses for a specific user.
 * @param user_id - The user's unique identifier.
 * @returns {Promise<AddressesResponseDto[]>} - A list of addresses for the user.
 */
export const getAddressesByUserId = async (user_id: number): Promise<AddressesResponseDto[]> => {
    const addresses = await Address.findAll({ where: { user_id, is_active: true } });

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
 * Updates an existing address record by its ID.
 * @param id_address - Address identifier to update.
 * @param data - Data to update (UpdateAddressesDto).
 * @returns {Promise<AddressesResponseDto | null>} - The updated address record or null if not found.
 */
export const updateAddress = async (id_address: number, data: UpdateAddressesDto): Promise<AddressesResponseDto | null> => {
    const [rowsAffected, [updatedAddress]] = await Address.update(data, {
        where: { id_address },
        returning: true,
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
 * Performs a soft delete on an address record by marking it as inactive.
 * @param id_address - Address identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteAddress = async (id_address: number): Promise<boolean> => {
    const [rowsAffected] = await Address.update(
        { is_active: false },
        { where: { id_address } }
    );

    return rowsAffected > 0;
};
