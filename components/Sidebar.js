import React from 'react'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria';

export default function Sidebar() {
    const {categorias}= useQuiosco();

  return (
      <div className='pt-3'>
          <Image
              width={300}
              height={100}
              src='/assets/img/logo.svg'
              alt='Logo Cafeteria'
          />
        <nav className='mt-10'>
            {categorias.map(categoria =>(
                 <Categoria key={categoria.id}   
                 categoria={categoria}
                 />
            ))}
        </nav>

      </div>
  )
}
