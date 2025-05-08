"use strict";

export function s_atob(str) {
    return Buffer.from(str, "base64").toString("binary");
}

export function s_btoa(str) {
    switch (typeof str) {
        case "string":
            return Buffer.from(str.toString(), "binary").toString("base64");
        case "object":
            if (str instanceof Buffer) {
                const buffer = str;
                return buffer.toString("base64");
            }
            break;
        default:
            throw new TypeError("The argument must be a string or a Buffer");
    }
}
