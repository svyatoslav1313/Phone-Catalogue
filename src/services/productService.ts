import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import products from '../../public/api/products.json';
import { Phone } from '../types/Phone';
import { Product } from '../types/Product';

const allDetails = [
  ...phones,
  ...tablets,
  ...accessories,
] as unknown as Phone[];
const detailsMap = new Map<string, Phone>();
const summaryMap = new Map<string, Product>();

allDetails.forEach(item => {
  detailsMap.set(item.id, item);
});

products.forEach(item => {
  summaryMap.set(item.itemId, item as Product);
});

export const productService = {
  getAllDetails: () => allDetails,

  getDetailById: (id: string): Phone | undefined => {
    return detailsMap.get(id);
  },

  getAllProducts: () => products as Product[],

  getProductYear: (itemId: string): number => {
    return summaryMap.get(itemId)?.year || 0;
  },

  getSuggestedProducts: (currentId: string) => {
    return allDetails.sort(() => 0.5 - Math.random()).slice(0, 10);
  },
};
