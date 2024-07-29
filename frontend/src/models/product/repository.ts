import { callAPI } from "@utils/callApi";
import { CreateProductRequestDTO } from "./dto";

export default class ProductRepository {

    async createProduct(request: CreateProductRequestDTO) {
        const response = await callAPI(
            'POST',
            '/product/',
            request.json(),
        );
        return response;
    }
}