import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Post,
    Request,
    Param,
    Delete,
    Put,
    Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto, DeleteCategoryDto, searchCategoryDto, CategoryUpdateDto } from './category.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Category')
@ApiTags('Category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Category' })
    async insertCategory(@Body() data: CategoryDto, @Request() request) {
        console.log(data)
        return await this.CategoryService.insertCategory(data, request);
    }

    @Delete('/deleteCategory')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteCategory" })
    async deleteCategory(@Body() id: DeleteCategoryDto, @Request() request) {
        return await this.CategoryService.deleteCategory(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Category' })

    async updateCategory(@Body() data: CategoryUpdateDto, @Request() request) {


        return await this.CategoryService.updateCategory(data, request);
    }
    @Get('/getListCategory')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Category " })
    async searchCategory(@Query() data: searchCategoryDto) {
        return await this.CategoryService.searchCategory(data);

    }

}
