/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillSchema } from '../../database/models/bill.model';
// import { Categories, CategoriesSchema } from '../../database/models/Bill.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { BillDto, BillUpdateDto, checkoutDto, DeleteBillDto } from './bill.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';
import { User } from 'src/database/models/user.model';
import { Order } from 'src/database/models/order.model';
import { Book } from 'src/database/models/book.model';

@Injectable()
export class BillService {
    constructor(
        @InjectModel('Bill') private readonly BillModel: Model<Bill>,
        @InjectModel('Order') private readonly OrderModel: Model<Order>,
        @InjectModel('Book') private readonly BookModel: Model<Book>,

        private readonly jwtService: JwtService,
    ) { }
    async reduceQuantity(listOder: any) {
        for (let order of listOder) {
            const bookid = order["bookid"]
            const quantity = order["quantity"]
            const book = await this.BookModel.findOne({ _id: bookid })
            if (book["quantity"] >= quantity) {
                book["quantity"] = book["quantity"] - quantity
                book.save()
            } else {
                return false
            }
        }
        return true
    }
    async insertBill(data: BillDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        if (!this.reduceQuantity(data["booklist"])) return new ApiError("Khong du so luong de mua")
        try {
            console.log(data)
            data.userid = user["_id"]
            data.status = "Pending"
            await this.BillModel.create(data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteBill(id: DeleteBillDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.BillModel.deleteMany({ "_id": { $in: id.deleteId } })
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateBill(data: BillUpdateDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.BillModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchBill(data: any, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user' || user['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");
        let query = data.query || {}
        if (user['role'] == "user") query.userid = user["_id"]
        if (user["admin"] == "admin") query.userid = data.userid
        let options = data.options || {}
        let sortField = 'createAt';
        let sortType = -1;
        let offset = 0;
        let limit = 0;
        query = {}



        sortField = data.sortField || 'createAt';
        if (sortType !== 1 || sortType !== 1) sortType = -1;
        else sortType = data.sortType;
        offset = Number(data.offset) || 0;
        limit = Number(data.limit) || 0;

        console.log({ offset, limit, sortField, sortType })



        console.log(query)
        console.log({ offset, limit, sortField, sortType })
        try {
            let total = await this.BillModel.find(query).countDocuments();
            let searchres = await this.BillModel.find(query)
                .skip(offset)
                .limit(limit)
                .sort([[sortField, sortType]])
                .collation({ locale: "en" })
            return new ApiOK({
                total: total,
                result: searchres || []
            })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async checkout(data: checkoutDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");

        try {
            const orderlist = data["orderlist"]
            let sum = 0;
            let res = [];
            for (let order of orderlist) {
                const book = await this.BookModel.findOne({ _id: order["bookid"] })
                const quantity = order["quantity"]
                sum = sum + book["price"] * quantity * (Number(book["sale"]) / 100)
                res.push({
                    book: book,
                    quantity: quantity
                })
                return new ApiOK({
                    price: sum,
                    result: res || []
                })
            }
        } catch (err) {
            return new ApiError(err.message)
        }
    }

}
