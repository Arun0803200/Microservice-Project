import { Body, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import { Not } from "typeorm";
import { Theatre } from "../models/TheatreModel";
import { TheatreService } from "../services/TheatreService";
import { TheatreRequest } from "./request/TheatreRequest";
@JsonController('/theater')
export class TheatreController {
    constructor(
        private theaterService: TheatreService
    ) {}

    // Create Theatre
    @Post()
    public async createTheatre(@Body({validate: true}) theaterRequest: TheatreRequest, @Res() response: any): Promise<any> {
        const newTheatre = new Theatre();
        newTheatre.founderId = theaterRequest.founderId;
        newTheatre.approvalFlag = 0;
        newTheatre.licenceNo = theaterRequest.licenceNo;
        newTheatre.address1 = theaterRequest.address1;
        newTheatre.address2 = theaterRequest.address2;
        
    }

    @Get()
    public async getTheatre(@Res() response: any): Promise<any> {
    }

    // Update Theatre
    @Put('/:id')
    public async updateTheatre(@Param('id') id: number, @Body({validate: true}) theaterRequest: TheatreRequest, @Res() response: any): Promise<any> {
    }

    // Theatre Details
    @Get('/:id')
    public async getGounderDetail(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
    }
}