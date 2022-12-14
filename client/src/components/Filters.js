import { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Row } from 'react-bootstrap'

const Filters = ({ model, setSearch, benefits, setBenefitFilter, filterLocation  }) => {

  const [searchInput, setSearchInput] = useState('')
  const [ select, setSelect ] = useState(filterLocation ? filterLocation : 'default')

  useEffect(() => {
    console.log(select)
  }, [select])

  //Search Functions
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }
  
  //Select Functions
  const handleBenefitChange = (e) => {
    setSelect(e.target.value)
  }

  //update request parameter states on change
  useEffect(() => {
    setSearch(`&search=${searchInput}`)
    setBenefitFilter(`&benefit=${select}`)
  }, [searchInput, select])

  return (
    <Row className='filters mb-3 d-flex flex-column flex-sm-row justify-content-between'>
      <Form.Control className='px-3 search input' onChange={handleSearchInput}
        type='search'
        placeholder={`SEARCH  ${model.replace('active_', '').toUpperCase()}`}
        name='search'
        value={searchInput} />
      <Form.Select aria-label="Default select" className="select input" onChange={handleBenefitChange} value={select} name="selectBenefit">
        <option value='default'> Filter by benefit </option>
        {benefits && benefits.map(benefit => <option key={benefit} value={benefit}>{benefit}</option>)}
      </Form.Select>
    </Row>
  )
}

export default Filters