import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div className='ml-4'>

      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='mb-4'>
        <Button onclickHandler={handleClick} value="hourly" title="Hourly" />
        <Button onclickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onclickHandler={handleClick} value="Yearly" title="Yearly" />
        <Button onclickHandler={handleClick} value="Weekly" title="Weekly" />
      </div>
      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="test" id="test" value="" onChange={handleChange} />
          <span className='checkmark'></span> ALL
        </label>

        <InputField
          handleChange={handleChange}
          value="30"
          title="< 30k"
          name="test" />

        <InputField
          handleChange={handleChange}
          value="50"
          title="< 50k"
          name="test" />
        <InputField
          handleChange={handleChange}
          value="80"
          title="< 80k"
          name="test" />
        <InputField
          handleChange={handleChange}
          value="100"
          title="< 10k"
          name="test" />
      </div>
    </div>
  )
}

export default Salary