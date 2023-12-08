import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Alert,
  Paper,
  Button,
  TextField,
} from '@mui/material';

const baseUrl = process.env.REACT_APP_BASEURL;

const RetentionParameterForm= () => {
    const [data, setData] = useState(null);
    const [RetentionParameterSuccessMessage, setRetentionParameterSuccessMessage] = useState('');
    const [TimeDelaySuccessMessage, setTimeDelaySuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [retentionParameters, setRetentionParameters] = useState({
        checkFrequency: { days: '', hours: '', minutes: '', seconds: '' },
        successRetention: { days: '', hours: '', minutes: '', seconds: '' },
        failureRetention: { days: '', hours: '', minutes: '', seconds: '' },
    });
    const [valuesChanged, setValuesChanged] = useState(false);
    const [timeDelayParameters, setTimeDelayParameters] = useState({
        minutes: '',
        seconds: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const clearMessagesAfterDelay = () => {
        setTimeout(() => {
        setRetentionParameterSuccessMessage('');
        setTimeDelaySuccessMessage('');
        setErrorMessage('');
        setSuccessMessage('');
    }, 5000);
    };

    useEffect(() => {
    clearMessagesAfterDelay();
    }, [RetentionParameterSuccessMessage, TimeDelaySuccessMessage, errorMessage, successMessage]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${baseUrl}/node-parameter/`);
        const responseData = await response.json();
        setData(responseData);
    
        // Initialize selectedModbus state with modbus values
        if (responseData.node_parameters) {
    
            // Initialize retention parameters
            const retentionValues = responseData.node_parameters.find(param => param.name === 'retention_parameter')?.value;
            if (retentionValues) {
            setRetentionParameters(retentionValues);
            }

            const timeDelayValues = responseData.node_parameters.find(param => param.name === 'time_delay')?.value;
            if (timeDelayValues) {
            setTimeDelayParameters(timeDelayValues);
            }
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
    }, []);
    
    

    if (!data) {
    return <p>Loading...</p>;
    }



// Define SuccessMessage and ErrorMessage components
  const SuccessMessage = ({ message}) => (
    <Alert severity="success" >
      {message}
    </Alert>
  );

  const ErrorMessage = ({ message}) => (
    <Alert severity="error">
      {message}
    </Alert>
  );
  
  const handleRetentionParameterChange = (param, unit, value) => {
    // Parse the input value as an integer
    const integerValue = parseInt(value, 10);
  
    // Check if the parsed value is a valid integer
    if (!isNaN(integerValue)) {
      setRetentionParameters((prevParameters) => ({
        ...prevParameters,
        [param]: { ...prevParameters[param], [unit]: integerValue },
      }));
    }
    // Set valuesChanged to true when any value changes
    setValuesChanged(true);
  };
  
  
  const handleRetentionParameterSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/node-parameter/5`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          retention_parameter: retentionParameters,
        }),
      });
      // After successful submission, reset valuesChanged to false
      setValuesChanged(false);

      if (response.ok) {
        setRetentionParameterSuccessMessage('Retention Parameters updated successfully.');
      } else {
        setErrorMessage(`Failed to update Retention Parameters: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating Retention Parameters: ${error}`);
    }
  };

  const handleReset = () => {
    // Replace the initialValues with your actual initial values
    const initialValues = {
      check_frequency: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      success_retention: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      failure_retention: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  
    setRetentionParameters(initialValues);
    setValuesChanged(false);
  };
  

  const handleTimeDelayParameterSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/node-parameter/6`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time_delay: timeDelayParameters,
        }),
      });
      // Assuming the submission is successful, disable the submit button
      setIsFormValid(false);

      if (response.ok) {
        // Display success message or handle as needed
        setTimeDelaySuccessMessage('Time Delay updated successfully.');
      } else {
        // Display error message or handle as needed
        setErrorMessage(`Failed to update Time Delay: ${response.statusText}`);
      }
    } catch (error) {
      // Display error message or handle as needed
      setErrorMessage(`Error updating Time Delay: ${error}`);
    }
  };


    return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
          {RetentionParameterSuccessMessage && (
            <SuccessMessage message={RetentionParameterSuccessMessage} onClose={() => setRetentionParameterSuccessMessage('')}/>
          )}
          {TimeDelaySuccessMessage && (
            <SuccessMessage message={TimeDelaySuccessMessage} onClose={() => setTimeDelaySuccessMessage('')}/>
          )}
          {errorMessage && (
            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')}/>
          )}
          </Grid>
    
          <Grid item xs={4}>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6">Retention Parameters</Typography>
              <form>
                {['check_frequency', 'success_retention', 'failure_retention'].map((param, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1">{param.replace('_', ' ')}</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {['days', 'hours', 'minutes', 'seconds'].map((unit, unitIndex) => (
                        <TextField
                          key={unitIndex}
                          label={unit.charAt(0).toUpperCase() + unit.slice(1)}
                          type="number"
                          value={retentionParameters[param][unit]}
                          onChange={(e) => handleRetentionParameterChange(param, unit, e.target.value)}
                          fullWidth
                          style={{ marginRight: '10px' }}
                          inputProps={{
                            min: 0,
                            max: unit === 'days' ? 31 : unit === 'hours' ? 24 : 60,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={handleReset}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: '10px' }}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleRetentionParameterSubmit}
                    color="primary"
                    variant="contained"
                    disabled={!valuesChanged} // Disable if values have not changed
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
    
    
          <Grid item xs={4}>
            <Paper style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6">Time Delay Parameters</Typography>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginRight: '20px' }}>
                <TextField
                  label="Minutes"
                  type="number"
                  value={timeDelayParameters.minutes}
                  style={{ marginRight: '5px' }}
                  onChange={(e) => {
                    let newValue = parseInt(e.target.value) || 0;
                    // Set upper limit to 60
                    newValue = Math.min(newValue, 60);
                    newValue = Math.max(newValue, 0); // Set lower limit to 0
    
                    setTimeDelayParameters((prev) => ({
                      ...prev,
                      minutes: newValue,
                    }));
                    setIsFormValid(true);
                  }}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 60,
                  }}
                />
                <TextField
                  label="Seconds"
                  type="number"
                  value={timeDelayParameters.seconds}
                  onChange={(e) => {
                    let newValue = parseInt(e.target.value) || 0;
                    // Set upper limit to 60
                    newValue = Math.min(newValue, 60);
                    newValue = Math.max(newValue, 0); // Set lower limit to 0
    
                    setTimeDelayParameters((prev) => ({
                      ...prev,
                      seconds: newValue,
                    }));
                    setIsFormValid(true);
                  }}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 60,
                  }}
                />
                </div>
                <Button
                  onClick={handleTimeDelayParameterSubmit}
                  color="primary"
                  variant="contained"
                  style={{ marginBottom: '15px' }}
                  disabled={!isFormValid} // Disable the button when the form is not valid
                >
                  Submit
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>  
    );
}
    
export default RetentionParameterForm;