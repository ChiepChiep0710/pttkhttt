/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookSchema } from '../../database/models/book.model';
// import { Categories, CategoriesSchema } from '../../database/models/book.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { BookDto, BookUpdateDto, DeleteBookDto } from './book.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly BookModel: Model<Book>,
        private readonly jwtService: JwtService,
    ) { }
    async insertBook(data: BookDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(data)
            await this.BookModel.create(data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteBook(id: DeleteBookDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.BookModel.deleteMany({ "_id": { $in: id.deleteId } })
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateBook(data: BookUpdateDto, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (admin['role'] !== 'admin') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.BookModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchBook(data: any) {
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
            let total = await this.BookModel.find(query).countDocuments();
            let searchres = await this.BookModel.find(query)
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
