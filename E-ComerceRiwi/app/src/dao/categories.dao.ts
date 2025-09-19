/**
 * Category DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the categories entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Category from "../models/category.model";
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from "../dto/category.dto";

/**
 * Inserts a new category record into the database.
 * @param data - Data required to create the category (CreateCategoryDto).
 * @returns {Promise<CategoryResponseDto>} - The created category record.
 */
export const createCategory = async (data: CreateCategoryDto): Promise<CategoryResponseDto> => {
    const newCategory = await Category.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: CategoryResponseDto = {
        id: newCategory.id_category,
        name: newCategory.name,
        is_active: newCategory.is_active,
    };
    return response;
};

/**
 * Retrieves all categories from the 'categories' table.
 * @returns {Promise<CategoryResponseDto[]>} - List of all categories.
 */
export const getCategories = async (): Promise<CategoryResponseDto[]> => {
    const categories = await Category.findAll();

    return categories.map(category => ({
        id: category.id_category,
        name: category.name,
        is_active: category.is_active,
    }));
};

/**
 * Retrieves all active categories from the 'categories' table.
 * @returns {Promise<CategoryResponseDto[]>} - List of active categories.
 */
export const getActiveCategories = async (): Promise<CategoryResponseDto[]> => {
    const categories = await Category.findAll({ where: { is_active: true } });

    return categories.map(category => ({
        id: category.id_category,
        name: category.name,
        is_active: category.is_active,
    }));
};

/**
 * Retrieves a category record by its unique ID.
 * @param id_category - Unique category identifier.
 * @returns {Promise<CategoryResponseDto | null>} - The found category record or null if not found.
 */
export const getCategoryById = async (id_category: number): Promise<CategoryResponseDto | null> => {
    const category = await Category.findByPk(id_category);

    if (!category) {
        return null;
    }

    return {
        id: category.id_category,
        name: category.name,
        is_active: category.is_active,
    };
};

/**
 * Updates an existing category record by its ID.
 * @param id_category - Category identifier to update.
 * @param data - Data to update (UpdateCategoryDto).
 * @returns {Promise<CategoryResponseDto | null>} - The updated category record or null if not found.
 */
export const updateCategory = async (id_category: number, data: UpdateCategoryDto): Promise<CategoryResponseDto | null> => {
    const [rowsAffected, [updatedCategory]] = await Category.update(data, {
        where: { id_category },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id: updatedCategory.id_category,
        name: updatedCategory.name,
        is_active: updatedCategory.is_active,
    };
};

/**
 * Performs a soft delete on a category record by marking it as inactive.
 * @param id_category - Category identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteCategory = async (id_category: number): Promise<boolean> => {
    const [rowsAffected] = await Category.update(
        { is_active: false },
        { where: { id_category } }
    );

    return rowsAffected > 0;
};
