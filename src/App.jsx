import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const calculateBMI = () => {
    const errorsObj = {};

    if (!gender) {
      errorsObj.gender = 'Gender is required';
    }
    if (!age) {
      errorsObj.age = 'Age is required';
    }
    if (!height) {
      errorsObj.height = 'Height is required';
    }
    if (!weight) {
      errorsObj.weight = 'Weight is required';
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }

    setErrors({});

    const heightMeters = height / 100;
    const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(2);
    setBmi(bmiValue);

    switch (true) {
      case bmiValue < 18.5:
        setStatus('Underweight');
        break;
      case bmiValue >= 18.5 && bmiValue <= 24.9:
        setStatus('Normal weight');
        break;
      case bmiValue >= 25 && bmiValue <= 29.9:
        setStatus('Overweight');
        break;
      default:
        setStatus('Obese');
        break;
    }
  };

  const getResultClassName = () => {
    switch (status) {
      case 'Normal weight':
        return 'normal';
      case 'Underweight':
        return 'underweight';
      case 'Overweight':
        return 'overweight';
      case 'Obese':
        return 'obese';
      default:
        return '';
    }
  };

  return (
    <div className='mt-5'>
      <div>
        <Row className='mb-md-5 p-2 d-flex justify-content-center align-items-center'>
          <Col md={2}></Col>
          <Col md={8}>
            <h2 className='text-center '>
              <FontAwesomeIcon icon={faWeightScale} />
              <span id='heading' className='ms-3'>
                Calculate your BMI
              </span>
            </h2>
            <p className='text-center'>Body mass index, or BMI, is used to determine whether you are in a healthy weight range for your height.</p>
          </Col>
          <Col md={2}></Col>
        </Row>

        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Row className=' border border-dark box mb-5'>
              <Col md={6}>
                <FormControl className='m-3 '>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Gender<span className='required'>*</span>
                  </FormLabel>
                  <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                  </RadioGroup>
                  {errors.gender && <p className='text-danger'>{errors.gender}</p>}
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined' className='m-3'>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Age<span className='required'>*</span>
                  </FormLabel>
                  <OutlinedInput type='number' inputProps={{ 'aria-label': 'age' }} value={age} onChange={(e) => setAge(e.target.value)} />
                  {errors.age && <p className='text-danger'>{errors.age}</p>}
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined' className='m-3'>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Height (cm)<span className='required'>*</span>
                  </FormLabel>
                  <OutlinedInput id='outlined-adornment-weight' type='number' endAdornment={<InputAdornment position='end'>cm</InputAdornment>} aria-describedby='outlined-weight-helper-text' value={height} onChange={(e) => setHeight(e.target.value)} />
                  {errors.height && <p className='text-danger'>{errors.height}</p>}
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined' className='m-3'>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Weight (kg)<span className='required'>*</span>
                  </FormLabel>
                  <OutlinedInput id='outlined-adornment-weight' type='number' endAdornment={<InputAdornment position='end'>kg</InputAdornment>} aria-describedby='outlined-weight-helper-text' value={weight} onChange={(e) => setWeight(e.target.value)} />
                  {errors.weight && <p className='text-danger'>{errors.weight}</p>}
                </FormControl>

                <div className='d-flex m-3'>
                  <Button variant='contained' onClick={calculateBMI}>
                    Calculate
                  </Button>
                </div>
              </Col>
              <Col md={6}>
                <Row className='m-3'>
                  {/* <h6>YOUR BMI IS</h6> */}

                  <div className={`border border-dark result w-100 d-flex justify-content-center rounded shadow mt-5 flex-column ${getResultClassName()}`}>
                    <h1 className='ms-5'>BMI: {bmi}</h1>
                    <p className='ms-5'>Status: {status}</p>
                  </div>
                </Row>
                <Row className='mt-5'>
                  <img src='https://m.timesofindia.com/photo/59645926.cms' alt='' />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
