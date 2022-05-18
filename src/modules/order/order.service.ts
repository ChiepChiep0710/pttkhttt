/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderSchema } from '../../database/models/order.model';
import { User, UserSchema } from '../../database/models/user.model';

// import { Categories, CategoriesSchema } from '../../database/models/Order.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { OrderDto, OrderUpdateDto, DeleteOrderDto } from './order.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';
import { string } from 'joi';
import { Book } from 'src/database/models/book.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly OrderModel: Model<Order>,
        @InjectModel('User') private readonly UserModel: Model<User>,
        @InjectModel('Book') private readonly BookModel: Model<Book>,
        private readonly jwtService: JwtService,
    ) { }
    async insertOrder(data: OrderDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(user)
            const userid = user["_id"]
            const order = await this.OrderModel.create(data);
            console.log(userid)
            const userinfo = await this.UserModel.findOne({ _id: user['_id'] });
            let cartuser: string[] = userinfo.cart
            cartuser.push(order["_id"])
            userinfo.cart = cartuser
            console.log(userinfo)
            await userinfo.save()
            return new ApiOK({ result: order })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteOrder(id: DeleteOrderDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.OrderModel.deleteMany({ "_id": { $in: id.deleteId } })
            const userinfo = await this.UserModel.findOne({ _id: user['_id'] });
            const listdelete: string[] = id.deleteId
            console.log(listdelete)
            let cartuser: string[] = userinfo.cart
            cartuser = cartuser.filter(item => !listdelete.includes(item))
            console.log(cartuser)
            userinfo.cart = cartuser
            await userinfo.save()
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateOrder(data: OrderUpdateDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.OrderModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchOrder(data: any, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");
        let query = data.query || {}

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
        const userinfo = await this.UserModel.findOne({ _id: user['_id'] });
        const cart = userinfo["cart"]
        query._id = { $in: cart }

        console.log(query)
        console.log({ offset, limit, sortField, sortType })
        try {
            let total = await this.OrderModel.find(query).countDocuments();
            let searchres = await this.OrderModel.find(query)
                .skip(offset)
                .limit(limit)
                .sort([[sortField, sortType]])
                .collation({ locale: "en" })
                .lean()
            const res = []
            for (let order of searchres) {
                const bookres = await this.BookModel.find({ _id: order["bookid"] }).lean()
                let restmp
                restmp = order
                restmp.book = bookres

            }
            return new ApiOK({
                total: total,
                result: searchres || []
            })
        } catch (err) {
            return new ApiError(err.message)
        }
    }

}
