import { Body, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { Not } from "typeorm";
import { Founder } from "../models/Founder";
import { FounderService } from "../services/FounderService";
import { FounderRequest } from "./request/FounderRequest";
@JsonController('/founder')
export class FounderController {
    constructor(
        private founderService: FounderService
    ) {}

    // Create Founder
    @Post()
    public async createFounder(@Body({validate: true}) founderRequest: FounderRequest, @Res() response: any): Promise<any> {
        const newFounder = new Founder();
        const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (regularExpression.test(founderRequest.password) === true) {
            const hashPassword: any = await Founder.hashPassword(founderRequest.password);
            newFounder.password = hashPassword;
        } else {
            const errorMessage = {
                status: 0,
                message: 'The password must contain a lowercase letter, an uppercase letter, a number, a special character, minimum 8 characters and maximum 20 character !!'
            }
            return response.status(400).send(errorMessage);
        }
        const findFounder = await this.founderService.findOne({
            where: [{
                username: founderRequest.email,
                isActive: 1,
                deleteFlag: 0
            }
        ]
        });
        if (findFounder) {
            const errorMessage = {
                status: 0,
                message: 'The given email is already exists !! please give another email :)'
            }
            return response.status(400).send(errorMessage);
        }

        const ifMobile = await this.founderService.findOne({
            where: [
                {
                    mobileNo: founderRequest.mobileNo,
                    isActive: 1,
                    deleteFlag: 0
                }
                    ]
        });
        if (ifMobile) {
            const errorExample = {
                status: 0,
                message: 'Given mobile number is already exist !! Please give another mobile number :)'
            };
            return response.status(400).send(errorExample);
        }

        newFounder.address1 = founderRequest.address1;
        newFounder.address2 = founderRequest.address2;
        newFounder.approvalFlag = 0;
        newFounder.comission = founderRequest.comission;
        newFounder.country = founderRequest.country;
        newFounder.deleteFlag = 0;
        newFounder.city = founderRequest.city;
        newFounder.email = founderRequest.email;
        newFounder.firstName = founderRequest.firstName;
        newFounder.isActive = 1;
        newFounder.lastName = founderRequest.lastName;
        newFounder.mobileNo = founderRequest.mobileNo;
        newFounder.pinCode = founderRequest.pinCode;
        newFounder.state = founderRequest.state;
        newFounder.theatreName = founderRequest.theatreName;
        newFounder.theatreUrl = founderRequest.theatreUrl;
        newFounder.username = founderRequest.email;

        const createFounder = await this.founderService.create(newFounder);
        if (createFounder) {
            const successMessage = {
                status: 1,
                message: 'Successfully create a Founder !!',
                data: createFounder
            };
            return response.status(200).send(successMessage);
        } else {
            const errorMessage = {
                status: 0,
                message: 'Unable to create a Founder !!'
            }
            return response.status(200).send(errorMessage);
        }

    }

    // Update Founder
    @Put('/:id')
    public async updateFounder(@Param('id') id: number, @Body({validate: true}) founderRequest: FounderRequest, @Res() response: any): Promise<any> {
        const findFounder = await this.founderService.findOne({where: {founderId: id}});
        if (!findFounder) {
            const errorExample = {
                status: 0,
                message: 'Inalid founder Id !!'
            }
            return response.status(200).send(errorExample);
        }
        const ifMobile = await this.founderService.findOne({
            where: [
                {
                    mobileNo: founderRequest.mobileNo,
                    isActive: 1,
                    deleteFlag: 0
                },
                {
                    founderId: Not(id)
                }
                    ]
        });
        findFounder.firstName = founderRequest.firstName;
        findFounder.lastName = founderRequest.lastName;
        findFounder.mobileNo = founderRequest.mobileNo;
        findFounder.theatreName = founderRequest.theatreName;
        findFounder.theatreUrl = founderRequest.theatreUrl;
        findFounder.comission = founderRequest.comission;
        findFounder.address1 = founderRequest.address1;
        findFounder.address2 = founderRequest.address2;
        findFounder.country = founderRequest.country;
        findFounder.state = founderRequest.state;
        findFounder.city = founderRequest.city;
        findFounder.pinCode = founderRequest.pinCode;

        const updateFounder = await this.founderService.create(findFounder);
        if (updateFounder) {
            const successMessage = {
                status: 1,
                message: 'Sucessfully updated founder data !!',
                data: updateFounder
            }
            return response.status(200).send(successMessage);
        }

        const errorExample = {
            status: 0,
            message: 'Unable to update the Founder data !!'
        }
        return response.status(400).send(errorExample);
    }
}