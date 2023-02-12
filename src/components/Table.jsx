import React from 'react'

export default function Table({companiesList}) {
  return (
    <table className='flex flex-col justify-center mt-4'>
      <thead>
        <tr className='flex flex-row items-center bg-black text-white'>
          <th className='basis-1/12 text-sm md:text-base border-r border-white last:border-r-0 py-1'>Id</th>
          <th className='basis-7/12 text-sm md:text-base border-r border-white last:border-r-0 py-1'>Name</th>
          <th className='basis-1/12 text-sm md:text-base border-r border-white last:border-r-0 py-1'>Type</th>
          <th className='basis-3/12 text-sm md:text-base border-r border-white last:border-r-0 text-center'>Date</th>
        </tr>
      </thead>
      <tbody>
        {companiesList.map((company) => (
          <tr className='flex flex-row' key={company.id}>
            <td className='basis-1/12 text-center bg-gray-200 border-b border-white text-sm md:text-base'>{company.id}</td>
            <td className='basis-7/12 font-semibold pl-2 text-sm md:text-base'>{company.name}</td>
            <td className='basis-1/12 text-center font-light text-sm md:text-base'>{company.type}</td>
            <td className='basis-3/12 text-center text-sm md:text-base'>{new Date(company.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
