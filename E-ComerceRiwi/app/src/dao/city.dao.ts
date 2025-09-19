// app/src/dao/city.dao.ts

/**
 * City DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `City` entity.
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createCity: Inserts a new city into the database.
 *  - getCitiesActive: Retrieves all active cities.
 *  - getCities: Retrieves all cities.
 *  - getCityByIdActive: Retrieves an active city by ID.
 *  - getCityById: Retrieves a city by ID.
 *  - updateCity: Updates an existing city.
 *  - softDeleteCity: Marks a city as inactive (soft delete).
 */

import City from "../models/city.model";
import { CreateCityDto, UpdateCityDto, CityResponseDto } from "../dto/city.dto";

/**
 * Inserts a new city into the database.
 *
 * @param data - Data required to create the city (CreateCityDto).
 * @returns {Promise<CityResponseDto>} - The created city.
 */
export const createCity = async (data: CreateCityDto): Promise<CityResponseDto> => {
  const city = await City.create({
    name: data.name,
    is_active: data.is_active ?? true, // default if not provided
  });

  return city.toJSON() as CityResponseDto;
};

/**
 * Retrieves all active cities from the `cities` table.
 *
 * @returns {Promise<CityResponseDto[]>} - List of active cities.
 */
export const getCitiesActive = async (): Promise<CityResponseDto[]> => {
  const cities = await City.findAll({ where: { is_active: true } });
  return cities.map((c) => c.toJSON() as CityResponseDto);
};

/**
 * Retrieves all cities from the `cities` table.
 *
 * @returns {Promise<CityResponseDto[]>} - List of cities.
 */
export const getCities = async (): Promise<CityResponseDto[]> => {
  const cities = await City.findAll();
  return cities.map((c) => c.toJSON() as CityResponseDto);
};

/**
 * Retrieves an active city by ID.
 *
 * @param id_city - Unique city identifier.
 * @returns {Promise<CityResponseDto | null>} - Found city or null.
 */
export const getCityByIdActive = async (id_city: number): Promise<CityResponseDto | null> => {
  const city = await City.findOne({ where: { id_city, is_active: true } });
  return city ? (city.toJSON() as CityResponseDto) : null;
};

/**
 * Retrieves a city by ID.
 *
 * @param id_city - Unique city identifier.
 * @returns {Promise<CityResponseDto | null>} - Found city or null.
 */
export const getCityById = async (id_city: number): Promise<CityResponseDto | null> => {
  const city = await City.findByPk(id_city);
  return city ? (city.toJSON() as CityResponseDto) : null;
};

/**
 * Updates an existing city.
 *
 * @param id_city - City identifier to update.
 * @param data - Data to update (UpdateCityDto).
 * @returns {Promise<CityResponseDto | null>} - Updated city or null if not found.
 */
export const updateCity = async (id_city: number, data: UpdateCityDto): Promise<CityResponseDto | null> => {
  const [rows, cities] = await City.update(data, {
    where: { id_city },
    returning: true,
  });

  if (rows > 0 && cities.length > 0) {
    const updatedCity = cities[0].toJSON() as CityResponseDto;
    return updatedCity;
  }
  return null;
};

/**
 * Marks a city as inactive (soft delete).
 *
 * @param id_city - City identifier.
 * @returns {Promise<boolean>} - true if the city was updated, false if not found.
 */
export const softDeleteCity = async (id_city: number): Promise<boolean> => {
  const [rows] = await City.update(
    { is_active: false },
    { where: { id_city } }
  );

  return rows > 0;
};
