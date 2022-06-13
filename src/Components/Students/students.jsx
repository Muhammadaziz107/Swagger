import React from "react";
import Navbar from "../Navbar/navbar";
import "./students.css";
import { useState, useEffect, useRef } from "react";
import close from "../../Assets/Images/close.png";

function Students() {
  const [data, setData] = useState([]);
  const elNewStudentForm = useRef(null);
  const fullName = useRef(null);
  const universityName = useRef(null);
  const entranceYear = useRef(null);
  const graduationYear = useRef(null);
  const faculty = useRef(null);
  const speciality = useRef(null);
  const studyType = useRef(null);
  const academicType = useRef(null);
  const diplomaSerial = useRef(null);
  const diplomaRegistrationNumber = useRef(null);
  const givenDate = useRef(null);
  const academicLevel = useRef(null);
  const appendixNumber = useRef(null);
  const organizationId = useRef(null);
  const elStudentModal = useRef(null);
  const findStudentId = useRef(null);
  const findStudentIdBtn = useRef(null);

  const handleCreateNewStudent = async evt => {
    try {
      evt.preventDefault();
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/student/create`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            fullName: fullName.current.value,
            universityName: universityName.current.value,
            entranceYear: entranceYear.current.value,
            graduationYear: graduationYear.current.value,
            faculty: faculty.current.value,
            speciality: speciality.current.value,
            studyType: studyType.current.value,
            academicType: academicType.current.value,
            diplomaSerial: diplomaSerial.current.value,
            diplomaRegistrationNumber: diplomaRegistrationNumber.current.value,
            givenDate: givenDate.current.value,
            academicLevel: academicLevel.current.value,
            appendixNumber: appendixNumber.current.value,
            organizationId: organizationId.current.value,
          }),
        }
      );

      if (res.status === 200) {
        alert("Created Successfully!✅");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getOneStudent = async evt => {
    try {
      const value = findStudentId.current.value;
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/student/get/${value}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const request = await res.json();
        const data = request.data.data;
        setData([data]);
      } else {
        alert("Not found!");
      }

      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [data]);
  // ========

  const deleteStudent = async evt => {
    try {
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/student/delete/${evt.target.dataset.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );

      if (res.status === 200) {
        alert("Deleted!");
      } else {
        alert("Not found!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openNewStudentModal = () => {
    elStudentModal.current.classList.add("create--active");
  };
  const closeNewStudentModal = () => {
    elStudentModal.current.classList.remove("create--active");
  };
  return (
    <>
      <div className="users">
        <div className="users__wrapper students__wrapper">
          <div className="fixed_navbar">
            <Navbar />
          </div>

          <div className="allUsers">
            <h3 className="allUsers-info">All Students Info</h3>

            <button className="open-modal createNewStudent" onClick={openNewStudentModal}>
              New
            </button>
          </div>
          <div className="allUsers">
            <h3 className="allUsers-info">Show one student info</h3>
            <div className="find__wrapper">
              <input
                ref={findStudentId}
                className="findStudentId"
                type="number"
                placeholder="Enter student id"
              />
              <button
                ref={findStudentIdBtn}
                className="open-modal find-btn"
                onClick={getOneStudent}
              >
                Find
              </button>
            </div>

            {data &&
              data.map(e => (
                <div className="about-student" key={e.id}>
                  <h2 className="about__heading2">ID: {e.id}</h2>
                  <h2 className="about__heading2">Full name: {e.fullName}</h2>
                  <h3 className="about__heading2">University name: {e.universityName}</h3>
                  <h3 className="about__heading2">Entrance year: {e.entranceYear}</h3>
                  <h3 className="about__heading2">Graduation year: {e.graduationYear}</h3>
                  <h3 className="about__heading2">Faculty: {e.faculty}</h3>
                  <h3 className="about__heading2">Speciality: {e.speciality}</h3>
                  <h3 className="about__heading2">Study type: {e.studyType}</h3>
                  <h3 className="about__heading2">Academic type: {e.academicType}</h3>
                  <h3 className="about__heading2">diploma serial: {e.diplomaSerial}</h3>
                  <h3 className="about__heading2">
                    Diploma registration number: {e.diplomaRegistrationNumber}
                  </h3>
                  <h3 className="about__heading2">Given date: {e.givenDate}</h3>
                  <h3 className="about__heading2">Academic level: {e.academicLevel}</h3>
                  <h3 className="about__heading2">Appendix number: {e.appendixNumber}</h3>
                  <button
                    type="button"
                    className="user-delete-btn student-delete-btn"
                    data-id={e.id}
                    onClick={deleteStudent}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ================== */}

      <div className="newStudent-modal" ref={elStudentModal}>
        <div className="newStudent-modal__wrapper">
          <h3 className="newStudent-modal__wrapper__heading">Create new student</h3>
          <div className="close-btn-div" onClick={closeNewStudentModal}>
            <img src={close} alt="close btn" width="20" height="20" />
          </div>
          <form
            ref={elNewStudentForm}
            action=""
            method="post"
            className="newStudent_form"
            onSubmit={handleCreateNewStudent}
          >
            <input
              ref={fullName}
              className="create-input"
              type="text"
              placeholder="fullName"
              required
            />
            <input
              ref={universityName}
              className="create-input"
              type="text"
              placeholder="universityName"
              required
            />
            <input
              ref={entranceYear}
              className="create-input"
              type="text"
              placeholder="entranceYear"
              required
            />
            <input
              ref={graduationYear}
              className="create-input"
              type="text"
              required
              placeholder="graduationYear"
            />
            <input
              ref={faculty}
              className="create-input"
              type="text"
              placeholder="faculty"
            />
            <input
              ref={speciality}
              className="create-input"
              type="text"
              placeholder="speciality"
              required
            />
            <input
              ref={studyType}
              className="create-input"
              type="text"
              placeholder="studyType"
            />
            <input
              ref={academicType}
              className="create-input"
              type="text"
              placeholder="academicType"
              required
            />
            <input
              ref={diplomaSerial}
              className="create-input"
              type="text"
              placeholder="diplomaSerial"
            />
            <input
              ref={diplomaRegistrationNumber}
              className="create-input"
              type="text"
              placeholder="diplomaRegistrationNumber"
              required
            />
            <input
              ref={givenDate}
              className="create-input"
              type="text"
              required
              placeholder="givenDate"
            />
            <input
              ref={academicLevel}
              className="create-input"
              type="text"
              placeholder="academicLevel"
            />
            <input
              ref={appendixNumber}
              className="create-input"
              type="text"
              placeholder="appendixNumber"
              required
            />
            <input
              ref={organizationId}
              className="create-input"
              type="text"
              placeholder="organizationId"
              required
            />

            <button type="submit" className="create-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Students;
