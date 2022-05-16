/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleSchema } from '../../database/models/sale.model';
// import { Categories, CategoriesSchema } from '../../database/models/Sale.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { SaleDto, SaleUpdateDto, DeleteSaleDto } from './sale.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';

@Injectable()
export class SaleService {
    constructor(
        @InjectModel('Sale') private readonly SaleModel: Model<Sale>,
        private readonly jwtService: JwtService,
    ) { }
    async insertSale(data: SaleDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(data)
            await this.SaleModel.create(data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteSale(id: DeleteSaleDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.SaleModel.deleteMany({ "_id": { $in: id.deleteId } })
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateSale(data: SaleUpdateDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.SaleModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchSale(data: any) {
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
            let total = await this.SaleModel.find(query).countDocuments();
            let searchres = await this.SaleModel.find(query)
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

}
