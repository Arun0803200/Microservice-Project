import { GRPCProvider } from "../api/grpc/grpcProvider";
import Container from "typedi";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";

export const grpcLoader: MicroframeworkLoader = async (settingd: MicroframeworkSettings) => {
    const grpcService = Container.get<GRPCProvider>(GRPCProvider);
    try {
        await grpcService.grpc();
    } catch(err) {
        console.log(err);        
    }
}