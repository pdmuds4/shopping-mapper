import { callAPI } from "@utils/callApi";
import ProductEntity from "./entity";
import { CreateProductRequestDTO, GetMemoRequestDTO, DoneRequestDTO, UndoneRequestDTO } from "./dto";
import { ProductEntityType } from "@domain/product/entityType";

export default class ProductRepository {

    async createProduct(request: CreateProductRequestDTO) {
        const response = await callAPI(
            'POST',
            '/api/product/',
            request.json(),
        );
        return response;
    }

    // async getAllDone (request: GetDoneRequestDTO)/*: Promise<ProductEntity[]>*/ {
    //     return;
    // }

    async getMemoProducts(request: GetMemoRequestDTO): Promise<ProductEntity[]> {
        const response = await callAPI(
            'GET',
            `/api/product/${request.getMemoId}`,
        ) as ProductEntityType[];

        return response.map((product) => new ProductEntity(
            product.id,
            product.memo_id,
            product.name,
            product.is_done,
            product.created_at,
            product.latitude,
            product.longitude,
            product.price,
        ));
    }

    async doneProduct(request: DoneRequestDTO) {
        const response = await callAPI(
            'PATCH',
            '/api/product/mark_done',
            request.json(),
        );
        return response;
    }

    async undoneProduct(request: UndoneRequestDTO) {
        const response = await callAPI(
            'PATCH',
            `/api/product/mark_not_done/${request.getProductId}`,
        );
        return response;
    }
}