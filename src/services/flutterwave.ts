import configs from "../config/config";
import { postRequest } from "../helpers/apiRequests";
import isSuccesfulResponse from "../helpers/isSuccesfulResponse";
import generateRef from "../utils/subscribtion/generateRef";

class FlutterwaveApi {
    SECRET_KEY;
    BASE_URL;
    CREATED_DATE;
    TRX_REF;

    constructor() {
        this.SECRET_KEY = configs.FLW_SECRET_KEY;
        this.BASE_URL = `https://api.flutterwave.com/v3/`;
        this.CREATED_DATE = new Date();
        this.TRX_REF = generateRef();
    }

    handleError = (error: any) => {
        console.log(`${error.name}: ${error.message}`);
        return false;
    };

    chargeAuthorization = async ({ email, userId, amount }: { email: any, userId: string, amount: number }) => {
        try {
            const endpoint = `${this.BASE_URL}/payments`;
            const data = {
                tx_ref: this.TRX_REF,
                amount: amount,
                currency: "USD",
                redirect_url: `http://localhost:3000/callback?email=${email}`,
                meta: {
                    consumer_id: userId,
                },
                customer: {
                    email: email,
                },
                customizations: {
                    title: "Interior AI Pro",
                    logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
                },
            };

            const response = await postRequest({
                endpoint,
                data,
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                },
            });

            if (isSuccesfulResponse(response) && response.data.data) {
                return response.data.data;
            }
            return false;
        } catch (error: any) {
            throw new Error(error);
        }
    };



}

export default FlutterwaveApi;