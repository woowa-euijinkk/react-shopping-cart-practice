import { useEffect, useState } from "react";
import { CART_ITEMS } from "./fixture";

export interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  imageUrl: string;
}

function getCartItems(): Promise<CartItemType[]> {
  return Promise.resolve(CART_ITEMS);
}

export function useGetCartItems() {
  const [data, setData] = useState<CartItemType[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCartItems();
        setData(data);
      } catch (e) {
        console.log("e", e);
      }
    }

    getData();
  }, []);

  return data;
}
