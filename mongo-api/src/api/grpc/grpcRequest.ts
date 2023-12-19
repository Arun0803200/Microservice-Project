import { Service } from "typedi";
@Service()
export class GRPCRequest {
    public async calls(moduleName: string, serviceName: string, operationName: string, paylaod): Promise<any> {
        const protoPath = process.cwd() + '/src/Workers.proto';
        const grpc = require('@grpc/grpc-js');
        const protoLoader = require('@grpc/proto-loader');
        const packageDef = protoLoader.loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            default: true,
            oneofs: true
        });
        const workers_micro = grpc.loadPackageDefinition(packageDef).admin_doctor_micro;
        let adminService: {ServiceReq: (arg0: {serviceName: string, operationName: string, payload: any}, arg1: (err: any, response: any) => void) => void;};
        if (moduleName === 'ADMIN_SERVICE') {            
            adminService = new workers_micro.serviceProvider('localhost:50001', grpc.credentials.createInsecure());
        }
            return new Promise((resolve, reject) => {
                adminService.ServiceReq({
                    serviceName,
                    operationName,
                    payload: JSON.stringify(paylaod)
                }, (err, res) => {
                    if (err) {
                        resolve({err, ignore: undefined});
                    } else {
                        resolve(res.response.data ? JSON.parse(res.response.data) : undefined);
                    }
                });
            });
    }
}