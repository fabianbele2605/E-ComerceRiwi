// app/src/dao/department.dao.ts

/**
 * Department DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `Department` entity.
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createDepartment: Inserts a new Department into the database.
 *  - getDepartmentsActive: Retrieves all active Departments.
 *  - getDepartments: Retrieves all Departments.
 *  - getDepartmentByIdActive: Retrieves an active Department by ID.
 *  - getDepartmentById: Retrieves a Department by ID.
 *  - updateDepartment: Updates an existing Department.
 *  - softDeleteDepartment: Marks a Department as inactive (soft delete).
 */

import Department from "../models/department.model";
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentResponseDto } from "../dto/department.dto";

/**
 * Inserts a new Department into the database.
 *
 * @param data - Data required to create the Department (CreateDepartmentDto).
 * @returns {Promise<DepartmentResponseDto>} - The created Department.
 */
export const createDepartment = async (data: CreateDepartmentDto): Promise<DepartmentResponseDto> => {
  const Departments = await Department.create({
    name: data.name,
    is_active: data.is_active ?? true, // default if not provided
  });

  return Departments.toJSON() as DepartmentResponseDto;
};

/**
 * Retrieves all active Departments from the `Department` table.
 *
 * @returns {Promise<DepartmentResponseDto[]>} - List of active Departments.
 */
export const getDepartmentsActive = async (): Promise<DepartmentResponseDto[]> => {
  const Departments = await Department.findAll({ where: { is_active: true } });
  return Departments.map((c) => c.toJSON() as DepartmentResponseDto);
};

/**
 * Retrieves all Departments from the `Department` table.
 *
 * @returns {Promise<DepartmentResponseDto[]>} - List of Departments.
 */
export const getDepartments = async (): Promise<DepartmentResponseDto[]> => {
  const Departments = await Department.findAll();
  return Departments.map((c) => c.toJSON() as DepartmentResponseDto);
};

/**
 * Retrieves an active Department by ID.
 *
 * @param id_department - Department identifier.
 * @returns {Promise<DepartmentResponseDto | null>} - Found Department or null.
 */
export const getDepartmentByIdActive = async (id_department: number): Promise<DepartmentResponseDto | null> => {
  const Departments = await Department.findOne({ where: { id_department, is_active: true } });
  return Departments ? (Departments.toJSON() as DepartmentResponseDto) : null;
};

/**
 * Retrieves a Departmen by ID.
 *
 * @param id_department - department identifier.
 * @returns {Promise<DepartmentResponseDto | null>} - Found Department or null.
 */
export const getDepartmentById = async (id_department: number): Promise<DepartmentResponseDto | null> => {
  const Departments = await Department.findByPk(id_department);
  return Departments ? (Departments.toJSON() as DepartmentResponseDto) : null;
};

/**
 * Updates an existing Department.
 *
 * @param id_department - Department identifier to update.
 * @param data - Data to update (UpdateDepartmentDto).
 * @returns {Promise<DepartmentResponseDto | null>} - Updated Department or null if not found.
 */
export const updateDepartment = async (id_department: number, data: UpdateDepartmentDto): Promise<DepartmentResponseDto | null> => {
  const [rows, Departments] = await Department.update(data, {
    where: { id_department },
    returning: true,
  });

  if (rows > 0 && Departments.length > 0) {
    const updatedDepartment = Departments[0].toJSON() as DepartmentResponseDto;
    return updatedDepartment;
  }
  return null;
};

/**
 * Marks a Department as inactive (soft delete).
 *
 * @param id_department - Department identifier.
 * @returns {Promise<boolean>} - true if the Department was updated, false if not found.
 */
export const softDeleteDepartment = async (id_department: number): Promise<boolean> => {
  const [rows] = await Department.update(
    { is_active: false },
    { where: { id_department } }
  );

  return rows > 0;
};
