import type ErrorMessagesType from "../types/ErrorMessagesType";


type TypeCheckFunc = (value: any) => boolean;

interface CheckFuncs {
    [field: string]: [TypeCheckFunc, string][]
}

class Validator {
    //[field, checkFunction, message]
    checkFuncs: CheckFuncs;

    constructor() {
        this.checkFuncs = {};
        return this;
    }

    add(field: string, checkFunc: TypeCheckFunc, errorMessage: string) {
        if (Array.isArray(this.checkFuncs[field])) {
            this.checkFuncs[field].push([checkFunc, errorMessage]);
        } else {
            this.checkFuncs[field] = [[checkFunc, errorMessage]];
        }
        return this;
    }

    check(item: any): ErrorMessagesType[] {
        const errors: ErrorMessagesType[] = [];
        for (const field in this.checkFuncs) {
            const value = item[field];
            if (errors.some((err) => err.field === field)) continue;
            for (const [check, errMessage] of this.checkFuncs[field]) {
                if (errors.some((err) => err.field === field)) break;
                if (!check(value)) errors.push({ message: errMessage, field: field });
            }
        }
        return errors;
    }
}

export default Validator;