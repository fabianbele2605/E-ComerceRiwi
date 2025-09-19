/**
 * Data Transfer Object for adding products to a shopping cart.
 * @interface AddShoppingCartDto
 * @property {number} userId - The unique identifier of the user adding products to the cart.
 * @property {ProductItemDto[]} products - An array of products to add to the cart.
 * @example
 * const addCartDto: AddShoppingCartDto = {
 *   userId: 1001,
 *   products: [
 *     {
 *       name: "Laptop",
 *       description: "High-performance laptop",
 *       price: 999.99,
 *       quantity: 1,
 *       categoryId: 1
 *     },
 *     {
 *       name: "Mouse",
 *       description: "Wireless mouse",
 *       price: 29.99,
 *       quantity: 2,
 *       categoryId: 2
 *     }
 *   ]
 * };
 */
export interface AddShoppingCartDto {
    userId: number;
    products: ProductItemDto[];
}

/**
 * Data Transfer Object for a single product item in the shopping cart.
 * @interface ProductItemDto
 * @property {string} name - The name of the product.
 * @property {string} description - A brief description of the product.
 * @property {number} price - The price of the product (in USD or specified currency).
 * @property {number} quantity - The quantity of the product to add.
 * @property {number} categoryId - The identifier of the product’s category.
 */
export interface ProductItemDto {
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
}

/**
 * Data Transfer Object for updating products in a shopping cart.
 * @interface UpdateCartItemDto
 * @property {number} [userId] - The unique identifier of the user updating the cart (optional, for validation purposes).
 * @property {Partial<ProductItemDto>[]} products - An array of product updates, where each product can have partial updates for its fields.
 * @example
 * const updateCartDto: UpdateCartItemDto = {
 *   userId: 1001,
 *   products: [
 *     {
 *       name: "Laptop",
 *       quantity: 3 // Update quantity only
 *     },
 *     {
 *       name: "Mouse",
 *       price: 25.99, // Update price
 *       quantity: 1    // Update quantity
 *     }
 *   ]
 * };
 */
export interface UpdateCartItemDto {
    userId?: number;
    products: Partial<ProductItemDto>[];
}

