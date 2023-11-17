import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Typography,
  Grid
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  headerText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: theme.spacing(2),
  },
  buttonGroup: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));


const DeviceParameterTable = () => {
  const classes = useStyles();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [parameters, setParameters] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedParameterName, setUpdatedParameterName] = useState('');
  const [updatedDataType, setUpdatedDataType] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [slaveId, setSlaveId] = useState('');
  // const [address, setAddress] = useState('');
  // const [ParameterName, setParameterName] = useState('');
  // const [DataType, setDataType] = useState('');
  const [deviceSuccessMessage, setDeviceSuccessMessage] = useState('');
  const [parameterSuccessMessage, setParameterSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddDeviceFormOpen, setIsAddDeviceFormOpen] = useState(false);
  const [isAddParameterFormOpen, setIsAddParameterFormOpen] = useState(false);
  // const [deviceId, setDeviceId] = useState('');
  // eslint-disable-next-line
  const [parameterToDelete, setParameterToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedDeviceName, setSelectedDeviceName] = useState('');
  const [selectedSlaveId, setSelectedSlaveId] = useState('');
  const [updateDeviceFormOpen, setUpdateDeviceFormOpen] = useState(false);
  const [updatedDeviceName, setUpdatedDeviceName] = useState('');
  const [updatedSlaveId, setUpdatedSlaveId] = useState('');
  const [isDeleteDeviceConfirmationOpen, setIsDeleteDeviceConfirmationOpen] = useState(false);
  // const [showAdditionalFields, setShowAdditionalFields] = useState(false); // Declare setShowAdditionalFields
  const [parameterFields, setParameterFields] = useState([{ address: '', ParameterName: '', data_type: '' }]);

  const clearMessagesAfterDelay = () => {
    setTimeout(() => {
      setDeviceSuccessMessage('');
      setParameterSuccessMessage('');
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  useEffect(() => {
    clearMessagesAfterDelay();
  }, [deviceSuccessMessage, parameterSuccessMessage, errorMessage, successMessage]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:5000/devices/');
        const data = await response.json();

        if (Array.isArray(data.devices)) {
          setDevices(data.devices);
        } else {
          console.error('Invalid response format for devices:', data);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceChange = async (event) => {
    const deviceId = event.target.value;

    try {
      const response = await fetch(`http://localhost:5000/devices/${deviceId}`);
      const data = await response.json();

      if (data.device && Array.isArray(data.device.parameters)) {
        if (data.device.parameters.length > 0) {
          setParameters(data.device.parameters);
          setSuccessMessage('');
          setErrorMessage('');
        } else {
          setParameters([]);
          setErrorMessage('No Parameters connected to the selected device');
        }
      } else {
        setParameters([]);
        setErrorMessage('Error fetching Parameters or no Parameters connected to the selected device');
      }

      // Set selectedDeviceName and selectedSlaveId based on the selected device
      setSelectedDevice(deviceId);
      if (data.device) {
        setSelectedDeviceName(data.device.name);
        setSelectedSlaveId(data.device.slave_id);
      }
    } catch (error) {
      console.error('Error fetching Parameters:', error);
      setErrorMessage('Error fetching Parameters. Please try again.');
    }
  };

  const handleUpdateClick = (parameter) => {
    setSelectedParameter(parameter);
    setUpdatedAddress(parameter.address);
    setUpdatedParameterName(parameter.parameter_name);
    setUpdatedDataType(parameter.data_type);
    setOpenUpdateDialog(true);
  };
  

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setUpdatedAddress('');
    setUpdatedParameterName('');
    setUpdatedDataType('');
  };

  const handleUpdateSubmit = async () => {
    if (!selectedParameter || !selectedParameter.id) {
      console.error('No Parameter selected for update');
      return;
    }

    const updatedValues = {
      address: updatedAddress,
      parameter_name: updatedParameterName,
      data_type: updatedDataType,
    };

    try {
      const response = await fetch(`http://localhost:5000/parameter/devices/${selectedDevice}/parameter/${selectedParameter.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (!response.ok) {
        throw new Error(`Failed to update Parameter: ${response.statusText}`);
      }

      handleDeviceChange({ target: { value: selectedDevice } });
      handleUpdateDialogClose();
      setParameterSuccessMessage('Parameter updated successfully!');
    } catch (error) {
      console.error('Error updating Parameter:', error);
      setErrorMessage(`Error updating Parameter. ${error.message}`);
    }
  };

  const handleDeleteSubmit = async (parameter) => {
    setIsDeleteConfirmationOpen(false);

    try {
      if (selectedDevice && parameter && parameter.id) {
        const response = await fetch(`http://localhost:5000/parameter/devices/${selectedDevice}/parameter/${parameter.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete parameter: ${response.statusText}`);
        }

        setParameterSuccessMessage('Parameter deleted successfully!');
        setErrorMessage('');

        // Update the device list
        const deviceResponse = await fetch(`http://localhost:5000/devices/${selectedDevice}`);
        const deviceData = await deviceResponse.json();

        if (deviceData.device && Array.isArray(deviceData.device.parameters)) {
          setParameters(deviceData.device.parameters);
        } else {
          setParameters([]);
        }

        // Fetch devices to update the list
        const devicesResponse = await fetch('http://localhost:5000/devices/');
        const devicesData = await devicesResponse.json();

        if (Array.isArray(devicesData.devices)) {
          setDevices(devicesData.devices);
        } else {
          console.error('Invalid response format for devices:', devicesData);
        }
      }
    } catch (error) {
      console.error('Error deleting Parameter:', error);
      setErrorMessage(`Error deleting Parameter. ${error.message}`);
    } finally {
      setOpenUpdateDialog(false);
      setSelectedParameter(null);
    }
  };

  // eslint-disable-next-line
  const handleDeleteClick = (parameter) => {  // Define handleDeleteClick explicitly
    setSelectedParameter(parameter);
    setIsDeleteConfirmationOpen(true);
  };

  const createDevice = async () => {
    if (deviceName && slaveId) {
      const newDevice = { name: deviceName, slave_id: slaveId };

      try {
        const response = await fetch('http://localhost:5000/devices/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDevice),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setDeviceSuccessMessage('Device created successfully!');
        clearDeviceForm();
        setIsAddDeviceFormOpen(false);

        // Fetch the updated list of devices
        const devicesResponse = await fetch('http://localhost:5000/devices/');
        const devicesData = await devicesResponse.json();

        if (Array.isArray(devicesData.devices)) {
          setDevices(devicesData.devices);
        } else {
          console.error('Invalid response format for devices:', devicesData);
        }
      } catch (error) {
        console.error('Error creating device:', error);
        setErrorMessage('Error creating device. Please try again.');
      }
    } else {
      setErrorMessage('Both device name and slave ID are required');
    }
  };

  const handleUpdateDevice = async () => {
    try {
      const updatedDevice = { name: updatedDeviceName, slave_id: updatedSlaveId };
  
      await fetch(`http://localhost:5000/devices/${selectedDevice}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDevice),
      });
  
      // Fetch the updated list of devices
      const devicesResponse = await fetch('http://localhost:5000/devices/');
      const devicesData = await devicesResponse.json();
  
      if (Array.isArray(devicesData.devices)) {
        // Update selected device details first
        setSelectedDeviceName(updatedDeviceName);
        setSelectedSlaveId(updatedSlaveId);
  
        // Then update the state of devices
        setDevices(devicesData.devices);
        setDeviceSuccessMessage('Device updated successfully!');
      } else {
        console.error('Invalid response format for devices:', devicesData);
      }
    } catch (error) {
      console.error('Error updating device:', error);
      setErrorMessage('Error updating device. Please try again.');
    } finally {
      setUpdateDeviceFormOpen(false);
    }
  };
  
  const handleDeleteDevice = async (deviceId) => {
    try {
      await fetch(`http://localhost:5000/devices/${deviceId}`, {
        method: 'DELETE',
      });
  
      // Fetch the updated list of devices
      const devicesResponse = await fetch('http://localhost:5000/devices/');
      const devicesData = await devicesResponse.json();
  
      if (Array.isArray(devicesData.devices)) {
        setDevices(devicesData.devices);
        // Clear the Parameters when a device is deleted
        setParameters([]);
        
        // Reset selected device details
        setSelectedDevice(null);
        setSelectedDeviceName('');
        setSelectedSlaveId('');
      } else {
        console.error('Invalid response format for devices:', devicesData);
      }
  
      setDeviceSuccessMessage('Device deleted successfully!');
    } catch (error) {
      console.error('Error deleting device:', error);
      setErrorMessage('Error deleting device. Please try again.');
    } finally {
      setIsDeleteDeviceConfirmationOpen(false);
      setOpenUpdateDialog(false);
      setSelectedParameter(null);
    }
  };
 

  const handleOpenUpdateDeviceForm = () => {
    setUpdatedDeviceName(selectedDeviceName);
    setUpdatedSlaveId(selectedSlaveId);
    setUpdateDeviceFormOpen(true);
  };

  const handleCloseUpdateDeviceForm = () => {
    setUpdateDeviceFormOpen(false);
  };

  const handleDeleteDeviceClick = () => {
    setIsDeleteDeviceConfirmationOpen(true);
  };

  const handleDeleteDeviceConfirmationClose = () => {
    setIsDeleteDeviceConfirmationOpen(false);
  };

  const handleDeleteDeviceDialogClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const clearDeviceForm = () => {
    setDeviceName('');
    setSlaveId('');
  };
  
  const handleAddDeviceClick = () => {
    setIsAddDeviceFormOpen(true);
  };
  
  const handleAddParameterClick = () => {
    setIsAddParameterFormOpen(true);
  };
  
  const handleAddDeviceFormClose = () => {
    setIsAddDeviceFormOpen(false);
    clearDeviceForm();
  };
  
  const handleAddParameterFormClose = () => {
    setIsAddParameterFormOpen(false);
    setParameterFields([{ address: '', ParameterName: '', data_type: '' }]); // Reset fields
    clearParameterForm();
  };

  const handleDeleteParameterDialogClose = () => {
    setIsDeleteConfirmationOpen(false);
    setParameterToDelete(null);
  };

  const handleDeleteParameterClick = (parameter) => {
    setSelectedParameter(parameter);
    setIsDeleteConfirmationOpen(true);
  }; 

  const clearParameterForm = () => {
    // Assuming you have state setters for address, ParameterName, and data_type
    setParameterFields([{ address: '', ParameterName: '', data_type: '' }]);
    // Add any other state resetting logic if needed
  };
  
  

  const handleAddButtonClick = () => {
    console.log('Add Parameter button clicked');
    setParameterFields([...parameterFields, { address: '', ParameterName: '', data_type: '' }]);
    setIsAddParameterFormOpen(true);
  };


  const handleUpdateParameterDialogClose = () => {
    setOpenUpdateDialog(false);
    setUpdatedAddress('');
    setUpdatedParameterName('');
    setUpdatedDataType('');
  };
  
  
  // const ParameterDevice = () => {
  //   if (!selectedDevice) {
  //     setErrorMessage('Please select a device!');
  //     return;
  //   }
  
  //   if (!address || !ParameterName || !data_type_type) {
  //     setErrorMessage('Please fill in all the required fields for the new Parameter!');
  //     return;
  //   }
  
  //   const newParameter = {
  //     address,
  //     parameter_name: ParameterName,
  //     data_type_type,
  //     device_id: selectedDevice,
  //   };
  
  //   fetch(`http://localhost:5000/Parameter/devices/${selectedDevice}/Parameter`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newParameter),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       setParameterSuccessMessage('New Parameter created successfully!');
  //       clearParameterForm();
  //       setIsAddParameterFormOpen(false);
  
  //       handleDeviceChange({ target: { value: selectedDevice } });
  //     })
  //     .catch((error) => {
  //       console.error('Error creating a new Parameter:', error);
  //       setErrorMessage('Error creating a new Parameter. Please try again.');
  //     });
  // };

  const parameterDevice = () => {
    if (!selectedDevice) {
      setErrorMessage('Please select a device!');
      return;
    }
  
    // Validate the fields for each row
    const invalidFields = parameterFields.some(
      (field) => !field.address || !field.ParameterName || !field.data_type
    );
  
    if (invalidFields) {
      setErrorMessage('Please fill in all the required fields for each parameter!');
      return;
    }
  
    const parameterPayload = {
      parameters: parameterFields.map((field) => ({
        active: true,
        address: field.address,
        parameter_name: field.ParameterName,
        data_type: field.data_type,
      })),
    };
  
    // Log the request body to the console
    // console.log('Request Body:', JSON.stringify(parameterPayload));
  
    fetch(`http://localhost:5000/parameter/devices/${selectedDevice}/parameter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameterPayload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('One or more parameters failed to create.');
        }
      })
      .then(() => {
        setParameterSuccessMessage('Parameters created successfully!');
        clearParameterForm();
        setIsAddParameterFormOpen(false);
        handleDeviceChange({ target: { value: selectedDevice } });
      })
      .catch((error) => {
        console.error('Error creating Parameters:', error);
        setErrorMessage('Error creating Parameters. Please try again.');
      });
  };
  

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...parameterFields];
    updatedFields[index][field] = value;
    setParameterFields(updatedFields);
  };

  // eslint-disable-next-line
  const addEmptyRow = () => {
    setParameterFields([...parameterFields, { address: '', ParameterName: '', data_type: '' }]);
  };

  const removeRow = (index) => {
    const updatedFields = [...parameterFields];
    updatedFields.splice(index, 1);
    setParameterFields(updatedFields);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FormControl>
          <InputLabel id="device-label">Select Device</InputLabel>
          {devices.length > 0 ? (
            <Select
              labelId="device-label"
              id="device-select"
              value={selectedDevice}
              label="Select Device"
              onChange={handleDeviceChange}
            >
              {devices.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <p>No devices available</p>
          )}
        </FormControl>
  
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" className={classes.body1}>
            <span style={{ color: 'blue' }}>Device:</span>
            <span style={{ color: 'red' }}>{selectedDeviceName}</span>
            <span style={{ color: 'blue', marginLeft: '10px' }}>Slave ID:</span>
            <span style={{ color: 'red', marginRight: '10px'  }}>{selectedSlaveId}</span>
          </Typography>
          <Button onClick={handleOpenUpdateDeviceForm} variant="contained" color="primary" style={{ marginRight: '10px' }}>Update</Button>
          <Button onClick={handleDeleteDeviceClick} variant="contained" color="error">
            Delete
          </Button>
        </div>
  
        <div className={classes.buttonGroup}>
        <Button onClick={handleAddDeviceClick} variant="contained" color="secondary" style={{ marginRight: '10px' }}>
          Add Device
        </Button>
        <Button onClick={handleAddParameterClick} variant="contained" color="secondary">
          Add Parameter
        </Button>
      </div>
      </div>
  
      {deviceSuccessMessage && (
        <Alert severity="success" onClose={() => setDeviceSuccessMessage('')}>
          {deviceSuccessMessage}
        </Alert>
      )}
  
      {parameterSuccessMessage && (
        <Alert severity="success" onClose={() => setParameterSuccessMessage('')}>
          {parameterSuccessMessage}
        </Alert>
      )}
  
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Parameter Name</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((parameter) => (
              <TableRow key={parameter.id}>
                <TableCell>{parameter.address}</TableCell>
                <TableCell>{parameter.parameter_name}</TableCell>
                <TableCell>{parameter.data_type}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateClick(parameter)} variant="contained" color="primary" style={{ marginRight: '10px' }}>Update</Button>
                  <Button onClick={() => handleDeleteParameterClick(parameter)} variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
      <Dialog open={openUpdateDialog} onClose={handleUpdateParameterDialogClose}>
      <DialogTitle style={{ color: '#008080' }}>Update Parameter</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Address"
                value={updatedAddress}
                onChange={(e) => setUpdatedAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Parameter Name"
                value={updatedParameterName}
                onChange={(e) => setUpdatedParameterName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={updatedDataType}
                  onChange={(e) => setUpdatedDataType(e.target.value)}
                >
                  <MenuItem value="Integer">Integer</MenuItem>
                  <MenuItem value="Float">Float</MenuItem>
                  <MenuItem value="Double">Double</MenuItem>
                  <MenuItem value="Boolean">Boolean</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateParameterDialogClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={isDeleteConfirmationOpen} onClose={handleDeleteDeviceDialogClose}>
        <DialogTitle>Delete Parameter</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Parameter?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteParameterDialogClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={() => handleDeleteSubmit(selectedParameter)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={updateDeviceFormOpen} onClose={handleCloseUpdateDeviceForm}>
        <DialogTitle>Update Device</DialogTitle>
        <DialogContent>
          <TextField
            label="Device Name"
            value={updatedDeviceName}
            onChange={(e) => setUpdatedDeviceName(e.target.value)}
          />
          <TextField
            label="Slave ID"
            value={updatedSlaveId}
            onChange={(e) => setUpdatedSlaveId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDeviceForm} variant="outlined" color="error">Cancel</Button>
          <Button onClick={handleUpdateDevice} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={isDeleteDeviceConfirmationOpen} onClose={handleDeleteDeviceConfirmationClose}>
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete "{selectedDeviceName}"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDeviceConfirmationClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={() => handleDeleteDevice(selectedDevice)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={isAddDeviceFormOpen} onClose={handleAddDeviceFormClose}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <TextField
            label="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField label="Slave ID" value={slaveId} onChange={(e) => setSlaveId(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDeviceFormClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={createDevice} variant="contained">Create Device</Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={isAddParameterFormOpen} onClose={handleAddParameterFormClose}>
        <DialogTitle>
          Add Parameter
        </DialogTitle>
        <DialogContent>
          {parameterFields.map((field, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Address"
                  value={field.address}
                  onChange={(e) => handleFieldChange(index, 'address', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Parameter Name"
                  value={field.ParameterName}
                  onChange={(e) => handleFieldChange(index, 'ParameterName', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl>
                  <InputLabel>Data Type</InputLabel>
                  <Select
                    value={field.data_type}
                    onChange={(e) => handleFieldChange(index, 'data_type', e.target.value)}
                  >
                    <MenuItem value="Integer">Integer</MenuItem>
                    <MenuItem value="Float">Float</MenuItem>
                    <MenuItem value="Double">Double</MenuItem>
                    <MenuItem value="Boolean">Boolean</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                {index !== 0 && (
                  <IconButton onClick={() => removeRow(index)}>
                    <RemoveIcon style={{ color: 'red' }} />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={1}>
                {index === parameterFields.length - 1 && (
                  <IconButton onClick={handleAddButtonClick}>
                    <AddIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddParameterFormClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={parameterDevice} variant="contained">Create Parameter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeviceParameterTable;
