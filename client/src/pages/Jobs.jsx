import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobs";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import styles from "./Jobs.module.css";
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(false);
  useEffect(() => {
    getAllJobs({ skills: "" })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
        setJobs([]);
      });
  }, []);
  const navigate = useNavigate();
  const gotoJobDetails = (id) => {
    navigate(`/jobs/${id}`);
  };
  const triggerSearch = () => {
    getAllJobs({ skills })
      .then((response) => {
        setJobs(response.data);
        setFilteredSkills(true);
      })
      .catch((error) => {
        console.log(error);
        setJobs([]);
      });
  };
  return (
    <div>
      <Navbar />
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="search by skills (separate by comma)"
        />
        {filteredSkills && (
          <div className={styles.skills}>
            {skills.map((skill) => {
              return (
                <span className={styles.skill} key={skill}>
                  {skill} <span>X</span>
                </span>
              );
            })}
          </div>
        )}
        {localStorage.getItem("token") ? (
          <div className={styles.filter}>
            <button
              style={{ border: "none" }}
              className={styles.inactive}
              onClick={triggerSearch}
            >
              Clear
            </button>
            <button onClick={() => navigate("/createjob")}>+ Add Job</button>
          </div>
        ) : (
          <div className={styles.filter}>
            <button onClick={triggerSearch}>Apply Filter</button>
            <button
              style={{ border: "none" }}
              className={styles.inactive}
              onClick={triggerSearch}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <ul className={styles.jobList}>
        {jobs.map((job) => (
          <li key={job._id} className={styles.singleJob}>
            <div className={styles.left}>
              <img className={styles.img} src={job.companyLogo} alt="logo" />
              <h2>{job.title}</h2>
              <div>
                <span>{job.salary}</span>&nbsp;<span>{job.location}</span>
              </div>
              <div className={styles.locationType}>
                <span>{job.locationType}</span>&nbsp;<span>{job.jobType}</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.skills}>
                {job.skills.map((skill, idx) => (
                  <li className={styles.skill} key={idx}>
                    {skill}
                  </li>
                ))}
              </div>
              <button onClick={() => gotoJobDetails(job._id)}>
                View Details
              </button>
              {localStorage.getItem("token") && (
                <button
                  className={styles.inactive}
                  onClick={() => navigate(`/edit/${job._id}`)}
                >
                  Edit Job
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
