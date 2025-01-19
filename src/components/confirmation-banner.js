import React from 'react';
import { Banner, Button} from "flowbite-react";


const ConfirmationBanner = ({title , confButton , onCancel , onConfirm}) => {
  return (
    <div className=' bg-[#0000004e] h-full w-full absolute top-0 left-0 flex items-center justify-center'>
        <Banner>
            <div className="flex flex-col w-full bg-gray-200 p-6">
                <h1 className=' text-2xl font-bold'>{title}</h1>
                <div className=' flex justify-between mt-4'>
                    <Button onClick={onCancel} type='button'>Cancel</Button>
                    <Button onClick={onConfirm} type='button'>{confButton}</Button>
                </div>
            </div>
        </Banner>
    </div>
  )
}

export default ConfirmationBanner