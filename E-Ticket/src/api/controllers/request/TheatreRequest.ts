import { IsNotEmpty } from "class-validator";

export interface ScreenDetails {

}

export class TheatreRequest {
    @IsNotEmpty()
    public founderId: number;

    public licenceNo: string;

    public address1: string;

    public address2: string;
}