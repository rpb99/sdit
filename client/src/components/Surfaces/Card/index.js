import React from 'react'

const Card = ({ label, total }) => {
    return (
        <div className="flex flex-col w-64  px-4 py-2 rounded text-white bg-black bg-opacity-10">
            <div>{label}</div>
            <div className="mt-6 self-center text-4xl">{total}</div>
        </div>
    )
}

export default Card
