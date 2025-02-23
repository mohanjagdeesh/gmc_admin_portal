import React from 'react'

const Header = () => {
  return (
    <div className=' flex  items-center border-2 border-red-50 w-full'>
    <div className=' h-20 w-20 rounded-full'>
      <img src='/asssets/ggmc.jpeg' alt='GGMC Logo' className='py-1 pl-2' />
    </div>
    <div className='mx-auto'>
      <h1 className='text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold leading-none text-green-600 text-center'>GUNTUR MUNCIPAL CORPORATION</h1>
      <h1 className='text-[0.9rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold leading-tight text-center'>గుంటూరు నగర పాలక సంస్ధ</h1>
    </div>
  </div>
  );
};

export default Header;