declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

export interface Product {
  handle:        string;
  id:            string;
  title:         string;
  description:   string;
  contents:      string;
  url:           string;
  images:        string[];
  is_giftcard:   boolean;
  weight:        number;
  category:      string;
  brand:         string;
  price:         number;
  options:       ProductOption[];
  variants:      Variant[];
  tag:           string;
  rating:        number;
  reviews_count: number;
}

export interface ProductOption {
  title:  string;
  values: string[];
}

export interface Variant {
  title:              string;
  prices:             Price[];
  options:            VariantOption[];
  inventory_quantity: number;
  manage_inventory:   boolean;
}

export interface VariantOption {
  value: string;
}

export interface Price {
  currency_code: string;
  amount:        number;
}
