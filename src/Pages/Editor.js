import React, { useState } from 'react';
import InputControl from '../components/InputControl/InputControl';

const Editor = (props) => {
  const sections = props.sections;

  const [activeSectionKey, setActiveSectionKey] = useState(Object.keys(sections)[0]);

  const basicInfoBody = (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Name"
          placeholder="Enter your full name e.g.: John Doe"
        />
        <InputControl
          label="Job Title"
          placeholder="Enter your current job position/title"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Contact Info"
          placeholder="Enter your contact information"
        />
        <InputControl
          label="Email"
          placeholder="Enter your working email here"
        />
      </div>
      <div>
        <InputControl
          label="Address"
          placeholder="Enter your address here"
        />
      </div>
    </div>
  );

  const workExpBody = (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Title"
          placeholder="Enter title e.g.: Front End Developer"
        />
        <InputControl
          label="Company Name"
          placeholder="Enter company name e.g.: Microsoft"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Certificate Link"
          placeholder="Enter certificate link"
        />
        <InputControl
          label="Location"
          placeholder="Enter Location e.g.: Remote"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Start Date"
          placeholder="Enter start date"
        />
        <InputControl
          label="End Date"
          placeholder="Enter end date"
        />
      </div>
      <div>
        <label className="block mb-2">Enter Work Experience</label>
        <InputControl placeholder="Line 1" />
        <InputControl placeholder="Line 2" />
        <InputControl placeholder="Line 3" />
      </div>
    </div>
  );

  const projectBody = (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Title"
          placeholder="Enter title e.g.: Project Name"
        />
        <InputControl
          label="Company/Client"
          placeholder="Enter company or client name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Project Link"
          placeholder="Enter project link"
        />
        <InputControl
          label="Location"
          placeholder="Enter location e.g.: New York"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Start Date"
          placeholder="Enter start date"
        />
        <InputControl
          label="End Date"
          placeholder="Enter end date"
        />
      </div>
      <div>
        <label className="block mb-2">Enter Project Details</label>
        <InputControl placeholder="Line 1" />
        <InputControl placeholder="Line 2" />
        <InputControl placeholder="Line 3" />
      </div>
    </div>
  );

  const educationBody = (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Title"
          placeholder="Enter title e.g.: MBA or BS IT"
        />
        <InputControl
          label="College/School Name"
          placeholder="Enter name of your college/school"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputControl
          label="Start Date"
          placeholder="Enter start date of this education"
        />
        <InputControl
          label="End Date"
          placeholder="Enter end date of this education"
        />
      </div>
      <div>
        <InputControl
          label="City/Location"
          placeholder="Enter location of your college/school"
        />
      </div>
    </div>
  );

  const achievementsBody = (
    <div className="mt-4">
      <label className="block mb-2">Enter your achievements</label>
      <InputControl placeholder="Achievement 1" />
      <InputControl placeholder="Achievement 2" />
      <InputControl placeholder="Achievement 3" />
    </div>
  );

  const summaryBody = (
    <div className="mt-4">
      <InputControl
        label="Summary"
        placeholder="Enter your objective/summary"
      />
    </div>
  );

  const otherBody = (
    <div className="mt-4">
      <InputControl
        label="Other"
        placeholder="Enter other information here related to you"
      />
    </div>
  );

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody;
      case sections.workExp:
        return workExpBody;
      case sections.projects:
        return projectBody;
      case sections.education:
        return educationBody;
      case sections.achievements:
        return achievementsBody;
      case sections.summary:
        return summaryBody;
      case sections.other:
        return otherBody;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg border border-gray-300 p-6 mb-5">
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.keys(sections)?.map((key) => (
          <div
            key={key}
            className={`cursor-pointer px-4 py-2 rounded-md ${activeSectionKey === key ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSectionKey(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>
      <div>
        <InputControl label="Title" placeholder="Enter Section Title" />
        {generateBody()}
      </div>
    </div>
  );
};

export default Editor;
