import { bootstrapMicroframework } from "microframework";
import { diLoader } from "../src/Loaders/DiLoader";
import { typeormLoader } from "../src/Loaders/TypeormLoader";
import { expressLoader } from "../src/Loaders/ExpressLoade";
import { homeLoader } from "../src/Loaders/HomeLoader";
import { grpcLoader } from "./Loaders/GRPCLoader";

bootstrapMicroframework({
    loaders: [
        diLoader,
        typeormLoader,
        expressLoader,
        homeLoader,
        grpcLoader
    ]
}).then(()=>{console.log('App running.............')})