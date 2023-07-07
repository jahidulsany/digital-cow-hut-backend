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
exports.OrdersService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const buyer_model_1 = require("../buyer/buyer.model");
const cow_model_1 = require("../cow/cow.model");
const seller_model_1 = require("../seller/seller.model");
const orders_model_1 = require("./orders.model");
const createOrders = (cow, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        // Change the cow's label to 'sold out'
        yield cow_model_1.Cow.findByIdAndUpdate(cow, { label: 'sold out' });
        // Deduct the cost of the cow from the buyer's budget
        yield buyer_model_1.Buyer.findByIdAndUpdate(buyer, {});
        // Increase the seller's income by the same amount
        yield cow_model_1.Cow.findById(cow);
        yield seller_model_1.Seller.findByIdAndUpdate(cow.seller, {});
        session.startTransaction();
        // Create student using sesssin
        const newCow = yield cow_model_1.Cow.create([cow], { session });
        if (!newCow.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create cow');
        }
        const newBuyer = yield buyer_model_1.Buyer.create([buyer], { session });
        if (!newBuyer.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create buyer');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrders = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePaginations(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield orders_model_1.Order.find()
        .populate('cow buyer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield orders_model_1.Order.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.OrdersService = {
    createOrders,
    getAllOrders,
};
