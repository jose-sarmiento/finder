import React from 'react'

function Company({ company }) {
  return (
    <div className='company'>
      {
        <img
          src={
            company.logo_path
              ? `https://image.tmdb.org/t/p/w185${company.logo_path}`
              : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw0t1i37rL0an_wx8TGFsyuQ&ust=1628217130970000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjRp5C1mvICFQAAAAAdAAAAABAD'
          }
          alt='logo'
        />
      }
      <span>{company.name}</span>
    </div>
  )
}

export default Company
