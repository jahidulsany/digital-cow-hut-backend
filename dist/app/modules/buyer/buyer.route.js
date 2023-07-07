/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const buyer_controller_1 = require("./buyer.controller");
const buyer_validatation_1 = require("./buyer.validatation");
const router = express_1.default.Router();
router.post('/create-buyer', (0, validateRequest_1.default)(buyer_validatation_1.BuyerValidation.createBuyerZodSchema), buyer_controller_1.BuyerController.createBuyer);
router.get('/:id', buyer_controller_1.BuyerController.getSingleBuyer);
router.patch('/:id', buyer_controller_1.BuyerController.updateBuyer);
router.delete('/:id', buyer_controller_1.BuyerController.deleteBuyer);
router.get('/', buyer_controller_1.BuyerController.getAllBuyers);
exports.BuyerRoutes = router;
