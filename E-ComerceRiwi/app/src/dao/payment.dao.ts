/**
 * Payment Method DAO
 * -------------------
 * This file contains the Data Access Object (DAO) functions for the payment_methods entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import PaymentMethod from "../models/paymentMethod.model";
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from "../dto/payment.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes.
 */
export interface PaymentMethodResponseDto {
    id_payment_method: number;
    name: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Inserts a new payment method record into the database.
 * @param data - Data required to create the payment method (CreatePaymentMethodDto).
 * @returns {Promise<PaymentMethodResponseDto>} - The created payment method record.
 */
export const createPaymentMethod = async (data: CreatePaymentMethodDto): Promise<PaymentMethodResponseDto> => {
    const newPaymentMethod = await PaymentMethod.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: PaymentMethodResponseDto = {
        id_payment_method: newPaymentMethod.id_payment_method,
        name: newPaymentMethod.name,
        is_active: newPaymentMethod.is_active,
        createdAt: newPaymentMethod.createdAt as Date,
        updatedAt: newPaymentMethod.updatedAt as Date,
    };
    return response;
};

/**
 * Retrieves all payment methods from the 'payment_methods' table.
 * @returns {Promise<PaymentMethodResponseDto[]>} - List of all payment methods.
 */
export const getPaymentMethods = async (): Promise<PaymentMethodResponseDto[]> => {
    const paymentMethods = await PaymentMethod.findAll();

    return paymentMethods.map(method => ({
        id_payment_method: method.id_payment_method,
        name: method.name,
        is_active: method.is_active,
        createdAt: method.createdAt as Date,
        updatedAt: method.updatedAt as Date,
    }));
};

/**
 * Retrieves all active payment methods from the 'payment_methods' table.
 * @returns {Promise<PaymentMethodResponseDto[]>} - List of active payment methods.
 */
export const getActivePaymentMethods = async (): Promise<PaymentMethodResponseDto[]> => {
    const paymentMethods = await PaymentMethod.findAll({ where: { is_active: true } });

    return paymentMethods.map(method => ({
        id_payment_method: method.id_payment_method,
        name: method.name,
        is_active: method.is_active,
        createdAt: method.createdAt as Date,
        updatedAt: method.updatedAt as Date,
    }));
};

/**
 * Retrieves a payment method record by its unique ID.
 * @param id_payment_method - Unique payment method identifier.
 * @returns {Promise<PaymentMethodResponseDto | null>} - The found payment method record or null if not found.
 */
export const getPaymentMethodById = async (id_payment_method: number): Promise<PaymentMethodResponseDto | null> => {
    const paymentMethod = await PaymentMethod.findByPk(id_payment_method);

    if (!paymentMethod) {
        return null;
    }

    return {
        id_payment_method: paymentMethod.id_payment_method,
        name: paymentMethod.name,
        is_active: paymentMethod.is_active,
        createdAt: paymentMethod.createdAt as Date,
        updatedAt: paymentMethod.updatedAt as Date,
    };
};

/**
 * Updates an existing payment method record by its ID.
 * @param id_payment_method - Payment method identifier to update.
 * @param data - Data to update (UpdatePaymentMethodDto).
 * @returns {Promise<PaymentMethodResponseDto | null>} - The updated payment method record or null if not found.
 */
export const updatePaymentMethod = async (id_payment_method: number, data: UpdatePaymentMethodDto): Promise<PaymentMethodResponseDto | null> => {
    const [rowsAffected, [updatedPaymentMethod]] = await PaymentMethod.update(data, {
        where: { id_payment_method },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_payment_method: updatedPaymentMethod.id_payment_method,
        name: updatedPaymentMethod.name,
        is_active: updatedPaymentMethod.is_active,
        createdAt: updatedPaymentMethod.createdAt as Date,
        updatedAt: updatedPaymentMethod.updatedAt as Date,
    };
};

/**
 * Performs a soft delete on a payment method record by marking it as inactive.
 * @param id_payment_method - Payment method identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeletePaymentMethod = async (id_payment_method: number): Promise<boolean> => {
    const [rowsAffected] = await PaymentMethod.update(
        { is_active: false },
        { where: { id_payment_method } }
    );

    return rowsAffected > 0;
};