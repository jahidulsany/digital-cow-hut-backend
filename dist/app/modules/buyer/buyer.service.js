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
exports.BuyerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const buyer_model_1 = require("./buyer.model");
const createBuyer = (buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBuyer = yield buyer_model_1.Buyer.create(buyer);
    if (!createBuyer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Buyer');
    }
    return createdBuyer;
});
const getAllBuyers = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePaginations(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield buyer_model_1.Buyer.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield buyer_model_1.Buyer.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBuyer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_model_1.Buyer.findById(id);
    return result;
});
const updateBuyer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_model_1.Buyer.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBuyer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_model_1.Buyer.findByIdAndDelete(id);
    return result;
});
exports.BuyerService = {
    createBuyer,
    getAllBuyers,
    getSingleBuyer,
    updateBuyer,
    deleteBuyer,
};
