export class WebStorage {
    key: string

    constructor(key: string) {
        this.key = key;
    }

    add(value: string) {
        window.localStorage.setItem(this.key, value);
    }

    read() : string | null {
        return window.localStorage.getItem(this.key);
    }

    clear() {
        window.localStorage.clear()
    }
}