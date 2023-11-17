// DeviceForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const backendUrl = 'http://localhost:5000';

const DeviceForm = () => {
  const [deviceName, setDeviceName] = useState('');
  const [slaveId, setSlaveId] = useState('');
  const [address, setAddress] = useState('');
  const [columnName, setColumnName] = useState('');
  const [data_type, setType] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createDevice = () => {
    if (deviceName && slaveId) {
      const newDevice = { name: deviceName, slave_id: slaveId };

      fetch(`${backendUrl}/devices/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDevice),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          setSuccessMessage('Device created successfully!');
          setErrorMessage('');
          clearDeviceForm();
        })
        .catch((error) => {
          console.error('Error creating device:', error);
          setErrorMessage('Error creating device. Please try again.');
        });
    } else {
      setErrorMessage('Both device name and slave ID are required');
    }
  };

  const registerDevice = () => {
    if (!deviceId) {
      setErrorMessage('Device ID is required!');
      return;
    }

    const newRegister = { address, parameter_name: columnName, data_type, device_id: deviceId };

    fetch(`${backendUrl}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRegister),
    })
      .then(() => {
        setSuccessMessage('New register created successfully!');
        setErrorMessage('');
        clearRegisterForm();
      })
      .catch((error) => {
        console.error('Error creating a new register:', error);
        setErrorMessage('Error creating a new register. Please try again.');
      });
  };

  const clearDeviceForm = () => {
    setDeviceName('');
    setSlaveId('');
  };

  const clearRegisterForm = () => {
    setAddress('');
    setColumnName('');
    setType('');
    setDeviceId('');
  };

  return (
    <Container>
      <Box mt={3}>
        <h2>Create Device</h2>
        <form>
          <TextField
            label="Device Name"
            variant="outlined"
            fullWidth
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField
            label="Slave ID"
            variant="outlined"
            fullWidth
            value={slaveId}
            onChange={(e) => setSlaveId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={createDevice}>
            Create Device
          </Button>
        </form>
      </Box>

      <Box mt={3}>
        <h2>Register Device</h2>
        <form>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Parameter Name"
            variant="outlined"
            fullWidth
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            value={data_type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            label="Device ID"
            variant="outlined"
            fullWidth
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={registerDevice}>
            Register Device
          </Button>
        </form>
      </Box>

      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default DeviceForm;
