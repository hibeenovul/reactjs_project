import { useState } from "react";
import {useRef} from "react";
import { useReactToPrint } from "react-to-print";

function Builder() {
    const [generalInfo, setGeneralInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const[education, setEducation] = useState([]);
    const[educationInput, setEducationInput] = useState({
        school: '',
        title: '',
        date: '',
    });

    const[experience, setExperience] =useState([]);
    const[experienceInput, setExperienceInput] =useState({
        company: '',
        position: '',
        role: '',
        from: '',
        to: '',
    });

    const [isPreview, setIsPreview] = useState(false);

    const handleGeneralChange = (e) => {
        setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
    };

    const handleEducationChange = (e) => {
        setEducationInput({ ...educationInput, [e.target.name]: e.target.value});
    };

    const handleExperienceChange = (e) => {
        setExperienceInput({ ...experienceInput, [e.target.name]: e.target.value});
    };

    const addEducation = () => {
        if (educationInput.school && educationInput.title && educationInput.date) {
            setEducation([...education, {...educationInput}]);
            setEducationInput({
                school: '',
                title: '',
                date: '',
            });
        }
    };

    const addExperience = () => {
        if (experienceInput.company && experienceInput.position && experienceInput.role && experienceInput.from && experienceInput.to) {
            setExperience([...experience, {...experienceInput}]);
            setExperienceInput({
                company: '',
                position: '',
                role: '',
                from: '',
                to: '',
            });
        } 
    };

    const deleteEducation = (index) => {
        setEducation(education.filter((_, i) => i !== index));
    };

    const deleteExperience = (index) => {
        setExperience(experience.filter((_,i) => i !== index));
    };

    const handleSubmitCV = () => {
        setIsPreview(true);
    };

    const handleEditCV = () => {
        setIsPreview(false);
    };

    const previewRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => previewRef.current,
        documentTitle: 'CV',
        onAfterPrint: () => alert('CV printed successfully!'),
    });

    return (
        <div className="cv-builder">
            <h1>CV Builder</h1>

            {!isPreview ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="general">
                        <h2>General Information</h2>
                    </div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={generalInfo.name}
                        onChange={handleGeneralChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={generalInfo.email}
                        onChange={handleGeneralChange}
                        required
                    />
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={generalInfo.phone}
                        onChange={handleGeneralChange}
                        required
                    />

                    
                    <div className="education">
                        <h2>Education</h2>
                        <p>Please click on add Education after filling the form</p>
                    </div>
                    {education.map((edu, index) => (
                        <div key={index}>
                            <p><strong>{edu.school}</strong> - {edu.title} ({edu.date}) </p>
                            <button type="button" onClick={() => deleteEducation(index)}>Delete</button>
                        </div>
                    ))}
                    
                    <label>School</label>
                    <input
                        type="text"
                        name="school"
                        value={educationInput.school}
                        onChange={handleEducationChange}
                        required
                    />
                    <label>Title Of Study</label>
                    <input
                        type="text"
                        name="title"
                        value={educationInput.title}
                        onChange={handleEducationChange}
                        required
                    />
                    <label>Date of Study</label>
                    <input
                        type="date"
                        name="date"
                        value={educationInput.date}
                        onChange={handleEducationChange}
                        required
                    />
                    <button type="button" onClick={addEducation}>Add Education</button>

                    
                    <div className="experience">
                        <h2>Experience</h2>
                        <p>Please click on add Experience after filling the form</p>
                    </div>
                    {experience.map((exp, index) => (
                        <div key={index}>
                            <p><strong>{exp.company}</strong> - {exp.position} </p>
                            <p>{exp.role} </p>
                            <p>{exp.from} to {exp.to}</p>
                            <button type="button" onClick={() => deleteExperience(index)}>Delete</button>
                        </div>
                    ))}
                    
                    <label>Company</label>
                    <input
                        type="text"
                        name="company"
                        value={experienceInput.company}
                        onChange={handleExperienceChange}
                        required
                    />
                    <label>Position</label>
                    <input
                        type="text"
                        name="position"
                        value={experienceInput.position}
                        onChange={handleExperienceChange}
                        required
                    />
                    <label>Role</label>
                    <textarea
                        type="text"
                        name="role"
                        value={experienceInput.role}
                        onChange={handleExperienceChange}
                        required
                    />
                    <label>From</label>
                    <input
                        type="date"
                        name="from"
                        value={experienceInput.from}
                        onChange={handleExperienceChange}
                        required
                    /><label>To</label>
                    <input
                        type="date"
                        name="to"
                        value={experienceInput.to}
                        onChange={handleExperienceChange}
                        required
                    />
                    <button type="button" onClick={addExperience}>Add Experience</button>

                    <br /><br />
                    <button type="button" onClick={handleSubmitCV}>Submit</button>
                </form>
            )   :   (
                <div className="preview" ref={previewRef}>
                    {/* preview content */}
                    <h2>Preview Cv</h2>
                    <h3>General Information</h3>
                    <p><strong>Name:</strong>{generalInfo.name}</p>
                    <p><strong>Email:</strong>{generalInfo.email}</p>
                    <p><strong>Phone:</strong>{generalInfo.phone}</p>
                    
                    {education.length > 0 && (
                        <>
                            <h3>Education</h3>
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <p><strong>{edu.school}</strong> - {edu.title} ({edu.date})</p>
                                </div>
                            ))}
                        </>    
                    )}


                    {experience.length > 0 && (
                        <>
                            <h3>Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <p><strong>{exp.company}</strong> - {exp.position}</p>
                                    <p>{exp.role}</p>
                                    <p>{exp.from} to {exp.to}</p>
                                </div>
                            ))}
                        </>    
                    )}

                    <div className="edit">
                        <button onClick={handleEditCV}>Edit</button>
                    </div>
                    <div className="download-pdf">
                        <button onClick={handlePrint}>Download PDF</button>
                    </div>
                </div>
            
            )}
        </div>
    );
}

export default Builder;