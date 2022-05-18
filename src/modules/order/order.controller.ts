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
import { OrderService } from './order.service';
import { OrderDto, DeleteOrderDto, searchOrderDto, OrderUpdateDto } from './order.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Order')
@ApiTags('Order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Order' })
    async insertOrder(@Body() data: OrderDto, @Request() request) {
        console.log(data)
        return await this.OrderService.insertOrder(data, request);
    }

    @Delete('/deleteOrder')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteOrder" })
    async deleteOrder(@Body() id: DeleteOrderDto, @Request() request) {
        return await this.OrderService.deleteOrder(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Order' })

    async updateOrder(@Body() data: OrderUpdateDto, @Request() request) {


        return await this.OrderService.updateOrder(data, request);
    }
    @Get('/getListOrder')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Order " })
    async searchOrder(@Query() data: searchOrderDto, @Request() request) {
        return await this.OrderService.searchOrder(data, request);

    }

}
