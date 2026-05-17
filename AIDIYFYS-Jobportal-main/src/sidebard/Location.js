import React from 'react'
import InputField from '../components/InputField'

const Location = ({ handleChange }) => {
    return (
        <div className="ml-4">
            <h4 className='text-lg font-medium mb-2 hidden sm:block'>Location</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test" id="test" value="" onChange={handleChange} />
                    <span className='checkmark'></span> ALL
                </label>
                <InputField
                    handleChange={handleChange}
                    value="london"
                    title="London"
                    name="test" />
                <InputField
                    handleChange={handleChange}
                    value="Dubai"
                    title="Dubai"
                    name="test" />
                <InputField
                    handleChange={handleChange}
                    value="United-Arab-Emirates"
                    title="United Arab Emirates"
                    name="test" />
                <InputField
                    handleChange={handleChange}
                    value="seattle"
                    title="Seattle"
                    name="test" />
                <InputField
                    handleChange={handleChange}
                    value="birsbane"
                    title="Brisbane"
                    name="test" />
                <InputField
                    handleChange={handleChange}
                    value="melbourne"
                    title="Melbourne"
                    name="test" />
            </div>
        </div>
    )
}

export default Location;
