import { Profile } from "./profile.model";

export interface Product {
    slug: string;
    product_name: string;
    product_price: number;
    product_img: string[];
    favouritesCount: number;
    comments: [string]
    author: Profile;
    favorited: boolean;
    id_category: string;
}