export type WishlistItem = {
    _id: string;
    id: string;
    title: string;
    price: number;
    images: string[];
    description?: string;
    imageCover: string;
    brand: {
        _id: string;
        name: string;
    };
    category: {
        _id: string;
        name: string;
    };
    sold: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    quantity: number;
};
