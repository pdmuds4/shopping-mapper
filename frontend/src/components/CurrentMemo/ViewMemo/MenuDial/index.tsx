import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Check, Edit, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { s__menuDialMain } from './style';

const MenuDial: React.FC<{
    onEdit: () => void;
}> = (props) => {
    const d__dialItems = [
        { 
            icon: <Check />, 
            tooltip: '完了としてマークする', 
            onclick: () => console.log('complete') 
        },{ 
            icon: <Edit />,  
            tooltip: '編集する', 
            onclick: props.onEdit
        }
    ];
    
    return (
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
    )
}

export default MenuDial;