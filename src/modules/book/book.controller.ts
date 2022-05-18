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
import { BookService } from './book.service';
import { BookDto, DeleteBookDto, searchBookDto, BookUpdateDto, addQuantityBookDto } from './book.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Book')
@ApiTags('Book')
export class BookController {
    constructor(private readonly BookService: BookService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
   // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Book' })
    async insertBook(@Body() data: BookDto, @Request() request) {
        console.log(data)
        return await this.BookService.insertBook(data, request);
    }

    @Delete('/deleteBook')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteBook" })
    async deleteBook(@Body() id: DeleteBookDto, @Request() request) {
        return await this.BookService.deleteBook(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Book' })

    async updateBook(@Body() data: BookUpdateDto, @Request() request) {


        return await this.BookService.updateBook(data, request);
    }
    @Get('/getListBook')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Book " })
    async searchBook(@Query() data: searchBookDto) {
        return await this.BookService.searchBook(data);

    }
    @Put('/import')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Book' })

    async importBook(@Body() data: addQuantityBookDto, @Request() request) {


        return await this.BookService.addQuantityBook(data, request);
    }
    @Put('/export')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Book' })

    async exportBook(@Body() data: addQuantityBookDto, @Request() request) {


        return await this.BookService.minusQuantityBook(data, request);
    }


}
