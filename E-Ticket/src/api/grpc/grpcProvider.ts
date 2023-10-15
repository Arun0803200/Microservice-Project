import { Service } from "typedi";
import { BookingService } from "../services/BookingService";
export class GRPCProvider {
    constructor(
        private bookingService: BookingService
    ) {}

    public async grpc(): Promise<void> {
        const protoPath = process.cwd() + '/src/AdminDoctor.proto';
        const grpc = require('@grpc/grpc-js');
        const protoLoader = require('@grpc/proto-loader');
        const packageDef = protoLoader.loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            default: true,
            oneofs: true
        });
        const admin_docctor_micro = grpc.loadPackageDefinition(packageDef).admin_doctor_micro;
        const grpsc = async(call, callback) => {
            let data;
            const payload = JSON.parse(call.request.payload);
            const serviceName = call.request.serviceName;
            const operationName = call.request.operationName;
            if (serviceName === 'BOOKING_SERVICE') {
                if (operationName === 'FIND') {
                    data = this.bookingService.find(payload);
                }
            }
            callback(undefined, {
                response: {
                    status: 1,
                    data: data ? JSON.stringify(data) : undefined
                }
            });
        }

        const server = new grpc.Server();
        server.addService(admin_docctor_micro.serviceProvider.Service, {ServiceReq: grpsc});
        server.bindAsync('localhost:50001', grpc.ServerCredentials.createInsecure(), () => {
            server.start();
        });
    }
}