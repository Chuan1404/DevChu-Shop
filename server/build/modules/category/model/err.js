"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrCategoryInvalid = exports.ErrCategoryNameTooShort = exports.ErrCategoryNameDuplicate = void 0;
exports.ErrCategoryNameDuplicate = new Error("Category name already exists");
exports.ErrCategoryNameTooShort = new Error("Category name too short");
exports.ErrCategoryInvalid = new Error("Invalid category");
