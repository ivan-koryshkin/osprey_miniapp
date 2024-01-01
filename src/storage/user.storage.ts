import {WebStorage} from "./web.storage";

const USER_KEY = "user"


export class UserStorage extends WebStorage {
    constructor() {
        super(USER_KEY);
    }
}