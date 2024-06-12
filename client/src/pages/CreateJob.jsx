import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob, getJobById, updateJob } from "../services/jobs";
import JobImage from "../assets/job.png";
import styles from "./CreateJob.module.css";
export default function CreateJob() {
  const url = new URL(window.location.href);

  const isEdit = url.pathname.includes("edit");
  const [data, setData] = useState({
    title: "",
    companyName: "",
    companyLogo: "",
    aboutCompany: "",
    location: "",
    description: "",
    salary: "",
    locationType: "",
    jobType: "",
    skills: "",
    information: "",
  });
  const handleChange = (e) => {
    setData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      if (isEdit) {
        const id = url.pathname.split("/")[2];
        console.log(id);
        const res = getJobById(id);
        res.then((response) => {
          const skills = response.data.skills.join(",");
          setData({ ...response.data, skills });
        });
      }
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = url.pathname.split("/")[2];
      const response = await updateJob(id, data);
      if (response.status === 200) {
        alert("Job updated successfully");
        navigate("/jobs");
      } else {
        alert("Error updating job");
      }
    } else {
      const response = await createJob(data);
      alert(response.data);
      if (response.status === 201) {
        navigate("/jobs");
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          {isEdit ? <>Edit</> : <>Add</>} job description
        </h1>
        <div className={styles.jobForm}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="companyName">
              Company Name:
            </label>
            <input
              className={styles.input}
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="companyLogo">
              Add Logo URL:
            </label>
            <input
              className={styles.input}
              type="text"
              name="companyLogo"
              value={data.companyLogo}
              onChange={handleChange}
              placeholder="Enter logo link"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">
              Job Title:
            </label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter job title"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="salary">
              Salary:
            </label>
            <input
              className={styles.input}
              type="text"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              placeholder="Enter job salary"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="jobType">
              Job Type:
            </label>
            <select
              className={styles.input}
              name="jobType"
              value={data.jobType}
              onChange={handleChange}
            >
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="locationType">
              Remote/Office:
            </label>
            <select
              className={styles.input}
              name="locationType"
              value={data.locationType}
              onChange={handleChange}
            >
              <option value={""}>Choose Location</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="location">
              Location:
            </label>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              placeholder="Enter job location"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Description:
            </label>
            <textarea
              className={styles.input}
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter job description"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="aboutCompany">
              About Company:
            </label>
            <textarea
              className={styles.input}
              name="aboutCompany"
              value={data.aboutCompany}
              onChange={handleChange}
              placeholder="Enter company description"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="skills">
              Skills:
            </label>
            <input
              className={styles.input}
              type="text"
              name="skills"
              value={data.skills}
              onChange={handleChange}
              placeholder="skills"
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="information">
              Information:
            </label>
            <input
              className={styles.input}
              type="text"
              name="information"
              value={data.information}
              onChange={handleChange}
              placeholder="Enter the additional information"
            />
          </div> */}
        </div>
        <button onClick={() => navigate("/jobs")} className={styles.cancel}>
          Cancel
        </button>
        <button onClick={handleSubmit} className={styles.add}>
          {isEdit ? <>Edit</> : <>+Add</>} Job
        </button>
      </div>
      <img style={{ maxHeight: "100vh", width: "50vw" }} src={JobImage} />
    </div>
  );
}
