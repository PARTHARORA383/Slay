

"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label ,
    type 
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type : any
}) => {
 
    return <div className="pt-2">
        <label className="block mb-2 text-md font-medium ">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} type={type} id="first_name" className="  text-gray-900 text-md rounded-md   outline-none w-full p-2.5" placeholder={placeholder} />
    </div>
}