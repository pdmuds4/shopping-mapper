import { useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Check, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { LoadingDrop } from '@components/ui';
import { s__menuDialMain } from './style';

import DoneMemoUseCase from '@usecase/doneMemo';
import MemoRepository from '@domain/memo/repository';
import { DoneRequestDTO } from '@domain/memo/dto';

const MenuDial: React.FC<{
    memo_id: number;
    onFinished: () => void;
}> = (props) => {
    const [is_loading, setLoading] = useState(false)

    const doneMemoHandler = async() => {
        setLoading(true);
        new DoneMemoUseCase(
            new MemoRepository,
            new DoneRequestDTO(props.memo_id)
        ).execute()
        .then((response) => {
            console.log(response);
            props.onFinished();
        }).catch((error) => {
            console.error(error);
        }).finally(()=>{
            setLoading(false);
        })
    };

    const d__dialItems = [
        { 
            icon: <Check />, 
            tooltip: '完了としてマークする',
            onclick: doneMemoHandler
        }
    ];
    
    return (
        <>
            <SpeedDial
                ariaLabel="MemoMenu"
                sx={s__menuDialMain}
                icon={<SpeedDialIcon 
                    icon={<KeyboardArrowUp />}
                    openIcon={<KeyboardArrowDown />}
                />}
            >
                {d__dialItems.map((item, index) => (
                    <SpeedDialAction 
                        key={index} 
                        icon={item.icon} 
                        tooltipTitle={item.tooltip} 
                        tooltipOpen
                        onClick={item.onclick}
                    />
                ))}
            </SpeedDial>

            {/* ローティング画面 */}
            <LoadingDrop isOpen={is_loading} />
        </>
        
    )
}

export default MenuDial;