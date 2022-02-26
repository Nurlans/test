import React, {FC} from 'react'


interface MySelectProps {
    options: number[],
    defualtvalue: string;
    value: string;
    onChange: (sort:string) => void
}

const MySelect: FC<MySelectProps> = ({options, defualtvalue, value, onChange}) => {
    return (
        <select value={value} onChange={event => onChange(event.target.value)}>
            <option disabled value="">{defualtvalue}</option>
            {options.map(option =>
                <option value={option} key={option}>{option}</option>)}
        </select>
    )
}

export default MySelect