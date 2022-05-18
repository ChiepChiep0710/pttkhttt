/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingSchema } from '../../database/models/rating.model';
// import { Categories, CategoriesSchema } from '../../database/models/Rating.model';
// import { Product, ProductSchema } from '../../database/models/product.model';
import { RatingDto, RatingUpdateDto, DeleteRatingDto } from './rating.dto';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import { Utils } from "../../common/utils/ultis";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from 'src/common/contants/app-config';
import { isEmpty } from 'class-validator';
import { User } from 'src/database/models/user.model';

@Injectable()
export class RatingService {
    constructor(
        @InjectModel('Rating') private readonly RatingModel: Model<Rating>,

        private readonly jwtService: JwtService,
    ) { }
    async insertRating(data: RatingDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        try {
            console.log(data)
            data.userid = user["_id"]
            await this.RatingModel.create(data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async deleteRating(id: DeleteRatingDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");
        try {
            await this.RatingModel.deleteMany({ "_id": { $in: id.deleteId } })
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }

    }
    async updateRating(data: RatingUpdateDto, request) {
        const user = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        if (user['role'] !== 'user') throw new ApiError('You done have permission to do this action', "E3");

        try {
            await this.RatingModel.updateOne({ "_id": data._id }, data);
            return new ApiOK({ result: true })
        } catch (err) {
            return new ApiError(err.message)
        }
    }
    async searchRating(data: any, request) {
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

        query.userid = user["_id"]

        console.log(query)
        console.log({ offset, limit, sortField, sortType })
        try {
            let total = await this.RatingModel.find(query).countDocuments();
            let searchres = await this.RatingModel.find(query)
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
