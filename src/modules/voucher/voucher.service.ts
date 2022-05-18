/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voucher, VoucherSchema } from '../../database/models/voucher.model';
// import { Categories, CategoriesSchema } from '../../database/models/Voucher.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { VoucherDto, VoucherUpdateDto, DeleteVoucherDto, saveVoucherDto } from './voucher.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';
import { User } from 'src/database/models/user.model';

@Injectable()
export class VoucherService {
    constructor(
        @InjectModel('Voucher') private readonly VoucherModel: Model<Voucher>,
        @InjectModel('User') private readonly UserModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }
    async insertVoucher(data: VoucherDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(data)
            await this.VoucherModel.create(data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteVoucher(id: DeleteVoucherDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.VoucherModel.deleteMany({ "_id": { $in: id.deleteId } })
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateVoucher(data: VoucherUpdateDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.VoucherModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchVoucher(data: any) {
        let query = data.query || {}

        let options = data.options || {}
        let sortField = 'createAt';
        let sortType = -1;
        let offset = 0;
        let limit = 0;
        query = {}
        if (data.name) {
            query.name = Utils.convertString(data.name)
            query.name = { '$regex': Utils.escapeRegex(query.name), '$options': 'i' }
        }
        if (data.id) query._id = data.id



        sortField = data.sortField || 'createAt';
        if (sortType !== 1 || sortType !== 1) sortType = -1;
        else sortType = data.sortType;
        offset = Number(data.offset) || 0;
        limit = Number(data.limit) || 0;

        console.log({ offset, limit, sortField, sortType })

        query.$and = []
        let frdate
        if (data.fromprice) {

            const frprice = {
                '$gte': data.fromprice,
            }
            query.$and.push(frprice)
        }
        let tdate
        if (data.toprice) {
            const topr = {
                '$lte': data.toprice,
            }
            query.$and.push(topr)
        }
        if (query.$and.length === 0) delete query.$and

        console.log(query)
        console.log({ offset, limit, sortField, sortType })
        try {
            let total = await this.VoucherModel.find(query).countDocuments();
            let searchres = await this.VoucherModel.find(query)
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
    async saveVoucher(data: saveVoucherDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(data)
            const userinfo = await this.UserModel.findOne({ _id: user['_id'] });
            const voucherlist = data.voucherlist
            for (let voucherid of voucherlist) {
                userinfo.voucher.push(voucherid)
            }
            await userinfo.save();
            return new ApiOK({ result: userinfo })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async getVoucher(request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {

            const userinfo = await this.UserModel.findOne({ _id: user['_id'] });
            const voucherlist = userinfo.voucher
            const voucherres = await this.VoucherModel.find({ _id: { $in: voucherlist } }).lean()

            return new ApiOK({ result: voucherres })
        } catch (err) {
            return new ApiError(err.message)
        }
    }

}
