"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastomError = void 0;
class CastomError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CastomError = CastomError;
