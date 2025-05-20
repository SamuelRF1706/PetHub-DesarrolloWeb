import React from 'react'

export const Menu = () => {
    return (
        <div className='d-flex flex-column p-3 gap-3 h-100'>
            <div className='cursor-pointer border-bottom'>
                <h4>Cuenta</h4>
            </div>
            <div className='cursor-pointer border-bottom'>
                <h4>Mascotas</h4>
            </div>
        </div>
    )
}
