import { useState, useEffect } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { Marker } from '@components/ProductsMap';
import { LoadingDrop } from "@components/ui";
import GetAllDoneProductsUseCase from "@usecase/getAllDoneProducts";
import ProductRepository from "@domain/product/repository";
import { GetDoneRequestDTO } from "@domain/product/dto";
import ProductEntity from "@domain/product/entity";

const ProductsMap: React.FC = () => {
    const [done_products, setDoneProducts] = useState<ProductEntity[]>([])
    const [default_center, setDefaultCenter] = useState<{lat: number, lng: number}>()
    const [is_loading, setLoading] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude)
            setDefaultCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })

        const user_id = localStorage.getItem('user_id')
        if (user_id) {
            new GetAllDoneProductsUseCase(
                new ProductRepository,
                new GetDoneRequestDTO(parseInt(user_id))
            ).execute()
            .then((response) => {
                console.log(response)
                setDoneProducts(response)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    },[])

    return (
        <>
            <APIProvider 
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
                libraries={['marker']}
            >
            {default_center ? (
                <Map
                    mapId={'map'}
                    style={{width: '100%', height: '88vh'}}
                    defaultCenter={default_center}
                    defaultZoom={18}
                    gestureHandling={'greedy'}
                >
                    <Marker position={default_center} isDefaultPosition/>
                    <>
                        {done_products.map((product, index) => (
                            <Marker 
                                key={index}
                                productName={product.getName}
                                purchaseDate={product.getCreatedAt}
                                position={product.getLocation}
                            />
                        ))}
                    </>
                </Map>) : 
                <></>
            }
            </APIProvider>
            <LoadingDrop isOpen={is_loading} />
        </>
    )
}

export default ProductsMap