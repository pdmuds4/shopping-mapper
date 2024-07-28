import { useState, useEffect } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { Marker } from '@components/ProductsMap';

const ProductsMap: React.FC = () => {
    const [default_center, setDefaultCenter] = useState<{lat: number, lng: number}>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude)
            setDefaultCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    },[])

    return (
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
                    {/* <Marker 
                        productName={'iPhone 13 Pro Max'}
                        purchaseDate={new Date()}
                        position={{lat: 35.646596, lng: 139.7415097}}
                    /> */}
                </>
            </Map>) : 
            <></>
        }
        </APIProvider>
    )
}

export default ProductsMap