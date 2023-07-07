"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const seller_model_1 = require("./seller.model");
const createSeller = (seller) => __awaiter(void 0, void 0, void 0, function* () {
    const createdSeller = yield seller_model_1.Seller.create(seller);
    if (!createSeller) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create seller');
    }
    return createdSeller;
});
const getAllSellers = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePaginations(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield seller_model_1.Seller.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield seller_model_1.Seller.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSeller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_model_1.Seller.findById(id);
    return result;
});
const updateSeller = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_model_1.Seller.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSeller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_model_1.Seller.findByIdAndDelete(id);
    return result;
});
exports.SellerService = {
    createSeller,
    getAllSellers,
    getSingleSeller,
    updateSeller,
    deleteSeller,
};
