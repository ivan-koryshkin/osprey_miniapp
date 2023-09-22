import { WebStorage } from "./web.storage";
import {CartItem, ProductData} from "../types";

const CART_KEY = "cart"

export class CartStorage extends WebStorage {
    constructor() {
        super(CART_KEY);
    }

    deserialize() : CartItem[] {
        const current = this.read();
        if(!current) {
            return []
        } else {
            return JSON.parse(current)
        }
    }

    serialize(items: CartItem[]) {
        return JSON.stringify(items)
    }

    inc(product: ProductData)  : CartItem[] {
        let cartItems = this.deserialize();
        const existing = cartItems.filter((item: CartItem) => {
            return item.productId === product.id
        })
        if(existing.length === 0) {
            cartItems.push({
                productId: product.id,
                name: product.name,
                count: 1
            });
        } else {
            cartItems = cartItems.map((p: CartItem) => {
                if(p.productId === product.id) {
                        p.count++;
                }
                return p
            })
        }
        this.add(this.serialize(cartItems))
        return cartItems
    }

    dec(product: ProductData) : CartItem[] {
        let cartItems = this.deserialize();
        const existing = cartItems.filter((item: CartItem) => {
            return item.productId === product.id
        })
        if(existing.length !== 0) {
            cartItems = cartItems.map((p: CartItem) => {
                if(p.productId === product.id) {
                    p.count--;
                }
                return p
            })
            cartItems = cartItems.filter((p: CartItem) => {
                if(p.count >= 1) {
                    return p
                }
            })
        }
        this.add(this.serialize(cartItems))
        return cartItems
    }

    clearAll() {
        this.add(this.serialize([]));
    }

    count(productId: string) : number {
        let cart = this.deserialize();
        const item = cart.filter((item: CartItem) => {
            return item.productId === productId;
        })
        return item.length !== 0 ? item[0].count : 0;
    }
}