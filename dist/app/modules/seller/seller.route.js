"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const seller_controller_1 = require("./seller.controller");
const seller_validatation_1 = require("./seller.validatation");
const router = express_1.default.Router();
router.post('/create-seller', (0, validateRequest_1.default)(seller_validatation_1.SellerValidation.createSellerZodSchema), seller_controller_1.SellerController.createSeller);
router.get('/:id', seller_controller_1.SellerController.getSingleSeller);
router.patch('/:id', seller_controller_1.SellerController.updateSeller);
router.delete('/:id', seller_controller_1.SellerController.deleteSeller);
router.get('/', seller_controller_1.SellerController.getAllSellers);
exports.SellerRoutes = router;
