const express = require('express');
const router = express.Router();

const addressRouter = require('./Address/address.router')
const orderRouter = require('./Order/order.router')
const userRouter = require('./User/user.router')
const auctionRouter = require('./Auction/auction.router')
const auctionGuest = require('./Auction/auctionGuest.router')
const guestBidRouter = require('./Auction/guestBid.router')
const productRouter = require('./Product/product.router')
const companyRouter = require('./User/company.router')
const summaryRouter = require('./Order/summaryTransaction.router')
const documentRouter = require('./User/document.router')

// colocar las rutas aquí

//Adress
router.use(addressRouter)

//Order
router.use(orderRouter)
router.use(summaryRouter)

//User
router.use(userRouter)
router.use(companyRouter)
router.use(documentRouter)

//Auction
router.use(auctionRouter)
router.use(auctionGuest)
router.use(guestBidRouter)

//Product
router.use(productRouter)

module.exports = router;