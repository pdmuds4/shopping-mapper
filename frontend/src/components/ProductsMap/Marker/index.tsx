import { useState } from 'react';
import { Typography, Chip } from '@mui/material';
import { AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { Person, ShoppingBag } from '@mui/icons-material';

import { s__markerChip } from './style';

const Marker: React.FC<{
    position: {lat: number, lng: number},
    productName?: string,
    purchaseDate?: Date,
    isDefaultPosition?: boolean
}> = (props) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(!infowindowOpen)}
                position={props.position}
            >
            {props.isDefaultPosition ? (
                <Pin background={'#1e89a1'} borderColor={'#17687a'} scale={1.7}>
                    <Person sx={{color: 'white'}} />
                </Pin>
            ) : (
                <Pin background={'#ec8434'} borderColor={'#ba692b'} scale={1.4}>
                    <ShoppingBag sx={{color: 'white'}} />
                </Pin>
            )}
            </AdvancedMarker>
            {!props.isDefaultPosition && infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}                    
                    onCloseClick={() => setInfowindowOpen(!infowindowOpen)}
                >
                    <Chip 
                        sx={s__markerChip}
                        label={props.purchaseDate?.toLocaleDateString()}
                        variant='outlined'
                    />
                    <Typography variant='h6'>{props.productName}</Typography>
                </InfoWindow>
            )}
        </>
    )
}

export default Marker;