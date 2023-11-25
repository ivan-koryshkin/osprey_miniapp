import {WebStorage} from "./web.storage";
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

    addItem(product: ProductData)  : CartItem[] {
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
            cartItems = this.increment(product.id)
        }
        this.add(this.serialize(cartItems))
        return cartItems
    }

    removeItem(product: ProductData) : CartItem[] {
        return this.decrement(product.id);
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

    increment(productId: string) : CartItem[] {
        let cartItems = this.deserialize();
        if(cartItems.length > 0) {
            cartItems = cartItems.map((p: CartItem) => {
                if(p.productId === productId) {
                    p.count++;
                }
                return p
            })
            cartItems = cartItems.filter((p: CartItem) => {
                if(p.count >= 1) {
                    return p
                }
                return null
            })
        }
        this.add(this.serialize(cartItems))
        return cartItems
    }

    decrement(productId: string) : CartItem[] {
        let cartItems = this.deserialize();
        const existing = cartItems.filter((item: CartItem) => {
            return item.productId === productId
        })
        if(existing.length !== 0) {
            cartItems = cartItems.map((p: CartItem) => {
                if(p.productId === productId) {
                    p.count--;
                }
                return p
            })
            cartItems = cartItems.filter((p: CartItem) => {
                if(p.count >= 1) {
                    return p
                }
                return null
            })
        }
        this.add(this.serialize(cartItems))
        return cartItems
    }

    prepareData() : string {
        const items = this.deserialize();
        let msg = "";
        items.forEach((item: CartItem) => {
            msg += `#${item.productId}\n`
            msg += `$x{item.count} - ${item.name}}\n`
        })
        return msg
    }

    sendData() : boolean {
        try {
            window.Telegram.WebApp.sendData("data")
            return true;
        } catch (e: any) {
            console.log('sendDataError', e)
            return false;
        }
    }

}