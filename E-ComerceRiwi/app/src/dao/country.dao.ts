// app/src/dao/country.dao.ts

/**
 * Country DAO
 * ------------
 * This file contains the Data Access Object (DAO) functions for the `Country` entity.
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createCountry: Inserts a new Country into the database.
 *  - getCountriesActive: Retrieves all active Countries.
 *  - getCountries: Retrieves all countries.
 *  - getCountryByIdActive: Retrieves an active Country by ID.
 *  - getCountryById: Retrieves a Country by ID.
 *  - updateCountry: Updates an existing Country.
 *  - softDeleteCountry: Marks a Country as inactive (soft delete).
 */

import Country from "../models/country.model";
import { CreateCountryDto, UpdateCountryDto, CountryResponseDto } from "../dto/country.dto";

/**
 * Inserts a new Country into the database.
 *
 * @param data - Data required to create the Country (CreateCountryDto).
 * @returns {Promise<CountryResponseDto>} - The created Country.
 */
export const createCountry = async (data: CreateCountryDto): Promise<CountryResponseDto> => {
  const country = await Country.create({
    name: data.name,
    is_active: data.is_active ?? true, // default if not provided
  });

  return country.toJSON() as CountryResponseDto;
};

/**
 * Retrieves all active Countries from the `Country` table.
 *
 * @returns {Promise<CountryResponseDto[]>} - List of active Countries.
 */
export const getCountriesActive = async (): Promise<CountryResponseDto[]> => {
  const countries = await Country.findAll({ where: { is_active: true } });
  return countries.map((c) => c.toJSON() as CountryResponseDto);
};

/**
 * Retrieves all Countries from the `Country` table.
 *
 * @returns {Promise<CountryResponseDto[]>} - List of Countries.
 */
export const getCountries = async (): Promise<CountryResponseDto[]> => {
  const countries = await Country.findAll();
  return countries.map((c) => c.toJSON() as CountryResponseDto);
};

/**
 * Retrieves an active Country by ID.
 *
 * @param id_country - Country identifier.
 * @returns {Promise<CountryResponseDto | null>} - Found Country or null.
 */
export const getCountryByIdActive = async (id_country: number): Promise<CountryResponseDto | null> => {
  const country = await Country.findOne({ where: { id_country, is_active: true } });
  return country ? (country.toJSON() as CountryResponseDto) : null;
};

/**
 * Retrieves a Country by ID.
 *
 * @param id_country - Country identifier.
 * @returns {Promise<CountryResponseDto | null>} - Found Country or null.
 */
export const getCountryById = async (id_country: number): Promise<CountryResponseDto | null> => {
  const country = await Country.findByPk(id_country);
  return country ? (country.toJSON() as CountryResponseDto) : null;
};

/**
 * Updates an existing Country.
 *
 * @param id_country - Country identifier to update.
 * @param data - Data to update (UpdateCountryDto).
 * @returns {Promise<CountryResponseDto | null>} - Updated Country or null if not found.
 */
export const updateCountry = async (id_country: number, data: UpdateCountryDto): Promise<CountryResponseDto | null> => {
  const [rows, countries] = await Country.update(data, {
    where: { id_country },
    returning: true,
  });

  if (rows > 0 && countries.length > 0) {
    const updatedCountry = countries[0].toJSON() as CountryResponseDto;
    return updatedCountry;
  }
  return null;
};

/**
 * Marks a Country as inactive (soft delete).
 *
 * @param id_country - Country identifier.
 * @returns {Promise<boolean>} - true if the Country was updated, false if not found.
 */
export const softDeleteCountry = async (id_country: number): Promise<boolean> => {
  const [rows] = await Country.update(
    { is_active: false },
    { where: { id_country } }
  );

  return rows > 0;
};
