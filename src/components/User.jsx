import React, { useState, useEffect } from 'react';
import './Styles.css';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
  Grid
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteAlert from './DeleteAlert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Alert from './Alert';

function User(props) {

  const { item, searchTerm } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [show, setShow] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(item?.gender.charAt(0).toUpperCase() + item?.gender.slice(1).toLowerCase());
  const [country, setCountry] = useState(item?.country);
  const [desc, setDesc] = useState(item?.description);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (item?.first.toLowerCase().includes(searchTerm.toLowerCase())
    || item?.last.toLowerCase().includes(searchTerm.toLowerCase())) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [searchTerm,item]);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - dobDate.getFullYear();

    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  const [age, setAge] = useState(calculateAge(item?.dob));

  const handleClickEditButton = () => {
    if (calculateAge(item?.dob) >= 18) {
      setIsEditable(true);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClickDeleteButton = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setShow(false);
    setOpen(false);
  };

  const handleClickCheckButton = () => {
    if (age === "" || country === "" || desc === "") {
      alert("All values required");
    } else {
      setIsEditable(false);
    }
  };

  const handleClickCancelButton = () => {
    setIsEditable(false);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;

    const containsNumber = /\d/.test(inputValue);

    if (!containsNumber) {
      setCountry(inputValue);
    }
  };

  return (
    <>
      {
        show === true ? <div className="card-container">
          <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}>
              <Typography>
                <div style={{ display: 'flex' }}>
                  <div className="circular-image">
                    <img src={item.picture} alt="Logo" />
                  </div>
                  <div className="content-container">
                    {item?.first}
                    {' '}
                    {item?.last}
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  <Grid container>
                    <Grid item xs={4.5} sm={4.5} md={4.5}>
                      <div className="title">
                        Age
                      </div>
                      <div>
                        {
                          isEditable ? <input
                            type="number"
                            value={age}
                            onChange={(e) => (setAge(e.target.value))}
                            className="input-container"
                          /> : <div>{age} Years</div>
                        }
                      </div>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <div>
                        <div className="title">
                          Gender
                        </div>
                        <div>
                          {
                            isEditable ? <><select className="input-container" id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Transgender">Transgender</option>
                              <option value="Rather not say">Rather not say</option>
                              <option value="Other">Other</option>
                            </select></> : <div>{selectedOption}</div>
                          }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4.5} sm={4.5} md={4.5}>
                      <div>
                        <div className="title">
                          Country
                        </div>
                        <div>
                          {
                            isEditable ? <input
                            className="input-container"
                              type="text"
                              value={country}
                              onChange={handleTextChange}
                            /> : <div>{country}</div>
                          }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="description-container">
                    <div className="title">
                      Description
                    </div>
                    <div>
                      {
                        isEditable ? <textarea
                          type="text"
                          value={desc}
                          rows={6}
                          cols={70}
                          onChange={(e) => (setDesc(e.target.value))}
                        /> : <div>{desc}</div>
                      }
                    </div>
                  </div>
                  <div className="button-container">
                    {
                      isEditable ? <><div onClick={handleClickCancelButton} className="all-buttons">
                        <CancelOutlinedIcon />
                      </div>
                        <div onClick={handleClickCheckButton} className="all-buttons">
                          <CheckCircleOutlineOutlinedIcon />
                        </div></> : <><div onClick={handleClickDeleteButton} className="all-buttons">
                          <DeleteOutlinedIcon />
                        </div>
                        <div onClick={handleClickEditButton} className="all-buttons">
                          <EditOutlinedIcon />
                        </div></>
                    }
                  </div>
                  <DeleteAlert
                    open={open}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                  />
                  <Alert
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
      />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div> : ''
      }
    </>
  )
}

export default User