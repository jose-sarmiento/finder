import Company from './Company'

function ProductionCompanies({ companies }) {
  return (
    <div className='production-companies'>
      {companies.map(item => {
        return <Company key={item.id} company={item} />
      })}
    </div>
  )
}

export default ProductionCompanies
