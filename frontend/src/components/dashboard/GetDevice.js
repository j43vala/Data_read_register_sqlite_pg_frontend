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
  Grid
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core/styles';
import config from './config';

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

const baseUrl = config.backendUrl;

const DeviceParameterTable = () => {
  const classes = useStyles();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [parameters, setParameters] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedFunctionCode, setUpdatedFunctionCode] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedParameterName, setUpdatedParameterName] = useState('');
  const [updatedDataType, setUpdatedDataType] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [slaveId, setSlaveId] = useState('');
  const [deviceSuccessMessage, setDeviceSuccessMessage] = useState('');
  const [parameterSuccessMessage, setParameterSuccessMessage] = useState('');
  const [attributeSuccessMessage, setAttributeSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddDeviceFormOpen, setIsAddDeviceFormOpen] = useState(false);
  const [isAddParameterFormOpen, setIsAddParameterFormOpen] = useState(false);
  const [isAddAttributeFormOpen, setIsAddAttributeFormOpen] = useState(false);
  // eslint-disable-next-line
  const [parameterToDelete, setParameterToDelete] = useState(null);
  // eslint-disable-next-line
  const [attributeToDelete, setAttributeToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeleteAttributeConfirmationOpen, setIsDeleteAttributeConfirmationOpen] = useState(false);
  const [selectedDeviceName, setSelectedDeviceName] = useState('');
  // eslint-disable-next-line
  const [selectedSlaveId, setSelectedSlaveId] = useState('');
  const [updateDeviceFormOpen, setUpdateDeviceFormOpen] = useState(false);
  const [updatedDeviceName, setUpdatedDeviceName] = useState('');
  const [updatedSlaveId, setUpdatedSlaveId] = useState('');
  const [isDeleteDeviceConfirmationOpen, setIsDeleteDeviceConfirmationOpen] = useState(false);
  const [parameterFields, setParameterFields] = useState([{ function_code: '', address: '', ParameterName: '', data_type: '' }]);
  const [attributeFields, setAttributeFields] = useState([{ name: '', value: ''}]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [openUpdateAttributeDialog, setOpenUpdateAttributeDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [parameterTableData, setParameterTableData] = useState([]);

  const clearMessagesAfterDelay = () => {
    setTimeout(() => {
      setDeviceSuccessMessage('');
      setParameterSuccessMessage('');
      setAttributeSuccessMessage('');
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  useEffect(() => {
    clearMessagesAfterDelay();
  }, [deviceSuccessMessage, parameterSuccessMessage, attributeSuccessMessage, errorMessage, successMessage]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${baseUrl}/devices/`);
        const data = await response.json();

        if (Array.isArray(data.devices)) {
          setDevices(data.devices);
          // setDeviceSuccessMessage('Devices fetch Successfully.!');
        } else {
          setErrorMessage(`No Devices Available.!`);
        }
      } catch (error) {
        setErrorMessage(`Error fetching devices: ${error}`);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceChange = async (deviceId) => {
    try {
      console.log('Fetching device details for deviceId:', deviceId);
  
      const response = await fetch(`${baseUrl}/devices/${encodeURIComponent(deviceId)}`);
      const data = await response.json();
  
      setOpen(true);
  
      if (data.device && Array.isArray(data.device.parameters)) {
        if (data.device.parameters.length > 0) {
          setParameters(data.device.parameters);
          setSuccessMessage('');
          setErrorMessage('');
        } else {
          setParameters([]);
          setAttributes([]);
          setErrorMessage('No Parameters And Attributes connected to the selected device');
        }
      } else {
        setParameters([]);
        setErrorMessage('Error fetching Parameters and Attributes or no Parameters and Attributes connected to the selected device');
      }
  
      // Set selectedDeviceName and selectedSlaveId based on the selected device
      setSelectedDevice(deviceId);
      if (data.device) {
        setSelectedDeviceName(data.device.name);
        setSelectedSlaveId(data.device.slave_id);
        setAttributes(data.device.attributes); // Set connected attributes
      }
    } catch (error) {
      console.error('Error fetching Device details:', error);
      setErrorMessage('Error fetching Device details. Please try again.');
    }
  };
  
  const handleChange = (event) => {
    const deviceId = event.target.value;
    handleDeviceChange(deviceId);
  }; 
  

  const handleUpdateClick = (parameter) => {
    setSelectedParameter(parameter);
    setUpdatedFunctionCode(parameter.function_code);
    setUpdatedAddress(parameter.address);
    setUpdatedParameterName(parameter.parameter_name);
    setUpdatedDataType(parameter.data_type);
    setOpenUpdateDialog(true);
  };
  

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setUpdatedFunctionCode('');
    setUpdatedAddress('');
    setUpdatedParameterName('');
    setUpdatedDataType('');
  };

  const handleUpdateSubmit = async () => {
    if (!selectedParameter || !selectedParameter.id) {
      setErrorMessage('No Parameter selected for update');
      return;
    }
  
    // Validate that the updated address field contains only integer values
    if (!Number.isInteger(parseInt(updatedAddress, 10))) {
      setErrorMessage('Please Insert Only Integer Values in the Address field!');
      handleUpdateDialogClose();
      return;
    }
  
    const updatedValues = {
      function_code: updatedFunctionCode,
      address: updatedAddress,
      parameter_name: updatedParameterName,
      data_type: updatedDataType,
    };
  
    try {
      const response = await fetch(`${baseUrl}/parameter/devices/${selectedDevice}/parameter/${selectedParameter.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update Parameter: ${response.statusText}`);
      }
  
      handleChange({ target: { value: selectedDevice } });
      clearParameterForm();
      handleUpdateDialogClose();
      setParameterSuccessMessage('Parameter updated successfully!');
    } catch (error) {
      console.error('Error updating Parameter:', error);
      clearParameterForm();
      handleUpdateDialogClose();
      setErrorMessage(`Error updating Parameter. ${error.message}`);
    }
  };
  

  const handleDeleteSubmit = async (parameter) => {
    setIsDeleteConfirmationOpen(false);

    try {
      if (selectedDevice && parameter && parameter.id) {
        const response = await fetch(`${baseUrl}/parameter/devices/${selectedDevice}/parameter/${parameter.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete parameter: ${response.statusText}`);
        }

        setParameterSuccessMessage('Parameter deleted successfully!');
        setErrorMessage('');

        // Update the device list
        const deviceResponse = await fetch(`${baseUrl}/devices/${selectedDevice}`);
        const deviceData = await deviceResponse.json();

        if (deviceData.device && Array.isArray(deviceData.device.parameters)) {
          setParameters(deviceData.device.parameters);
        } else {
          setParameters([]);
        }

        // Fetch devices to update the list
        const devicesResponse = await fetch(`${baseUrl}/devices/`);
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
        const response = await fetch(`${baseUrl}/devices/`, {
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
        const devicesResponse = await fetch(`${baseUrl}/devices/`);
        const devicesData = await devicesResponse.json();

        if (Array.isArray(devicesData.devices)) {
          setDevices(devicesData.devices);
        } else {
          setErrorMessage(`Invalid response format for devices: ${devicesData}`);
          clearDeviceForm();
          setIsAddDeviceFormOpen(false);
        }
      } catch (error) {
        console.error('Error creating device:', error);
        setErrorMessage('Error creating device. Please try again.');
        clearDeviceForm();
        setIsAddDeviceFormOpen(false);
      }
    } else {
      setErrorMessage('Both device name and slave ID are required');
      clearDeviceForm();
      setIsAddDeviceFormOpen(false);
    }
  };

  const handleUpdateDevice = async () => {
    try {
      const updatedDevice = { name: updatedDeviceName, slave_id: updatedSlaveId };
  
      await fetch(`${baseUrl}/devices/${selectedDevice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDevice),
      });
  
      // Fetch the updated list of devices
      const devicesResponse = await fetch(`${baseUrl}/devices/`);
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
      // Send DELETE request to the server
      await fetch(`${baseUrl}/devices/${deviceId}`, {
        method: 'DELETE',
      });
  
      // Fetch the updated list of devices
      const devicesResponse = await fetch(`${baseUrl}/devices/`);
      const devicesData = await devicesResponse.json();
  
      if (Array.isArray(devicesData.devices)) {
        setDevices(devicesData.devices);
        setParameters([]);
        setAttributes([]);
  
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
      // Close the confirmation dialog and any other necessary actions
      setIsDeleteDeviceConfirmationOpen(false);
      setOpenUpdateDialog(false);
      setSelectedParameter(null);
      setSelectedAttribute(null);
    }
  };
  
  const handleOpenUpdateDeviceForm = (deviceId) => {
    const selectedDevice = devices.find((device) => device.id === deviceId);

    setUpdatedDeviceName(selectedDevice.name);
    setUpdatedSlaveId(selectedDevice.slave_id);
    setSelectedDevice(selectedDevice);
    setUpdateDeviceFormOpen(true);
  };

  const handleCloseUpdateDeviceForm = () => {
    setUpdateDeviceFormOpen(false);
  };

  const handleDeleteDeviceClick = (deviceId, deviceName) => {
    setSelectedDevice(deviceId);
    setSelectedDeviceName(deviceName);
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
    setParameterFields([{ function_code: '', address: '', ParameterName: '', data_type: '' }]); // Reset fields
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
    setParameterFields([{ function_code: '', address: '', ParameterName: '', data_type: '' }]);
  };
  
  const handleAddParameterButtonClick = () => {
    console.log('Add Parameter button clicked');
    setParameterFields([...parameterFields, { function_code: '', address: '', ParameterName: '', data_type: '' }]);
    setIsAddParameterFormOpen(true);
  };


  const handleUpdateParameterDialogClose = () => {
    setOpenUpdateDialog(false);
    setUpdatedFunctionCode('');
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
      setIsAddParameterFormOpen(false);
      return;
    }
  
    // Validate the fields for each row
    const invalidFields = parameterFields.some(
      (field) => !field.function_code || !field.address || !field.ParameterName || !field.data_type
    );
  
    if (invalidFields) {
      setErrorMessage('Please fill in all the required fields for each parameter!');
      setIsAddParameterFormOpen(false);
      clearParameterForm();
      return;
    }
  
    // Validate that the address field contains only integer values
    const invalidAddressFields = parameterFields.some(
      (field) => !Number.isInteger(parseInt(field.address, 10))
    );
  
    if (invalidAddressFields) {
      setErrorMessage('Please Enter Only Integer Values in the Address Field!');
      clearParameterForm();
      setIsAddParameterFormOpen(false);
      return;
    }
  
    const parameterPayload = {
      parameters: parameterFields.map((field) => ({
        active: true,
        function_code: field.function_code,
        address: field.address,
        parameter_name: field.ParameterName,
        data_type: field.data_type,
      })),
    };
  
    fetch(`${baseUrl}/parameter/devices/${selectedDevice}/parameter`, {
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
        return response.json();
      })
      .then((responseData) => {
        console.log('API Response Data:', responseData);
  
        // Check if responseData has the expected structure
        if (responseData.created_parameters) {
          // Update the table data with the new parameters
          setParameterTableData([...parameterTableData, ...responseData.created_parameters]);
  
          setParameterSuccessMessage('Parameters created successfully!');
          clearParameterForm();
          setIsAddParameterFormOpen(false);
          handleChange({ target: { value: selectedDevice } });
        } else {
          console.error('Unexpected response format:', responseData);
          setErrorMessage('Error creating Parameters. Please try again.');
          clearParameterForm();
          setIsAddParameterFormOpen(false);
        }
      })
      .catch((error) => {
        console.error('Error creating Parameters:', error);
        setErrorMessage('Error creating Parameters. Please try again.');
        clearParameterForm();
        setIsAddParameterFormOpen(false);
      });
  };
  

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...parameterFields];
    updatedFields[index][field] = value;
    setParameterFields(updatedFields);
  };

  // eslint-disable-next-line
  const addEmptyRow = () => {
    setParameterFields([...parameterFields, { function_code: '', address: '', ParameterName: '', data_type: '' }]);
  };

  const removeRow = (index) => {
    const updatedFields = [...parameterFields];
    updatedFields.splice(index, 1);
    setParameterFields(updatedFields);
  };

  const clearAttributeForm = () => {
    setAttributeFields([{ name: '', value: '' }]);
  };

  const handleAddAttributeFormClose = () => {
    setIsAddAttributeFormOpen(false);
    setAttributeFields([{ name: '', value: '' }]); // Reset fields
    clearAttributeForm();
  };

  const handleAddAttributeButtonClick = () => {
    console.log('Add Attribute button clicked');
    setAttributeFields([...attributeFields, { name: '', value: '' }]);
    setIsAddAttributeFormOpen(true);
  };

  const handleAddAttributeClick = () => {
    setIsAddAttributeFormOpen(true);
  };

  const attributeDevice = () => {
    if (!selectedDevice) {
      setErrorMessage('Please select a device!');
      return;
    }
  
    // Validate the fields for each row
    const invalidFields = attributeFields.some(
      (field) => !field.name || !field.value
    );
  
    if (invalidFields) {
      setErrorMessage('Please fill in all the required fields for each attribute!');
      clearAttributeForm();
      return;
    }
  
    const attributePayload = {
      attributes: attributeFields.map((field) => ({
        name: field.name,
        value: field.value,
      })),
    };
  
    fetch(`${baseUrl}/attribute/devices/${selectedDevice}/attribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributePayload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('One or more attributes failed to create.');
        }
      })
      .then(() => {
        setAttributeSuccessMessage('Attributes created successfully!');
        clearAttributeForm();
        setIsAddAttributeFormOpen(false);
        handleChange({ target: { value: selectedDevice } });
      })
      .catch((error) => {
        console.error('Error creating Attributes:', error);
        setErrorMessage('Error creating Attributes. Please try again.');
        clearAttributeForm();
        setIsAddAttributeFormOpen(false);
      });
  };
  
  const handleAttributeFieldChange = (index, field, value) => {
    const updatedFields = [...attributeFields];
    updatedFields[index][field] = value;
    setAttributeFields(updatedFields);
  };
  
  // eslint-disable-next-line
  const addAttributeEmptyRow = () => {
    setAttributeFields([...attributeFields, { name: '', value: '' }]);
  };
  
  const removeAttributeRow = (index) => {
    const updatedFields = [...attributeFields];
    updatedFields.splice(index, 1);
    setAttributeFields(updatedFields);
  };

  const handleUpdateAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
    setUpdatedName(attribute.name);
    setUpdatedValue(attribute.value);
    setOpenUpdateAttributeDialog(true);
  };
  

  const handleUpdateAttributeDialogClose = () => {
    setOpenUpdateAttributeDialog(false);
    setUpdatedName('');
    setUpdatedValue('');
  };

  const handleUpdateAttributeSubmit = async () => {
    if (!selectedAttribute || !selectedAttribute.id || !selectedDevice) {
      console.error('No Attribute or Device selected for update');
      return;
    }
  
    const updatedValues = {
      name: updatedName,
      value: updatedValue,
    };
  
    try {
      const response = await fetch(`${baseUrl}/attribute/devices/${selectedDevice}/attribute/${selectedAttribute.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update Attribute: ${response.statusText}`);
      }
  
      handleChange({ target: { value: selectedDevice } });
      handleUpdateAttributeDialogClose();
      clearAttributeForm();
      setAttributeSuccessMessage('Attribute updated successfully!');
    } catch (error) {
      console.error('Error updating Attribute:', error);
      setErrorMessage(`Error updating Attribute. ${error.message}`);
      clearAttributeForm();
      handleUpdateAttributeDialogClose();
    }
  };
  
  

  const handleDeleteAttributeSubmit = async (attribute) => {
    setIsDeleteConfirmationOpen(false);

    try {
      if (selectedDevice && attribute && attribute.id) {
        const response = await fetch(`${baseUrl}/attribute/devices/${selectedDevice}/attribute/${attribute.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete Attribute: ${response.statusText}`);
        }

        setAttributeSuccessMessage('Attribute deleted successfully!');
        setErrorMessage('');

        // Update the device list
        const deviceResponse = await fetch(`${baseUrl}/devices/${selectedDevice}`);
        const deviceData = await deviceResponse.json();

        if (deviceData.device && Array.isArray(deviceData.device.attributes)) {
          setAttributes(deviceData.device.attributes);
        } else {
          setAttributes([]);
        }

        // Fetch devices to update the list
        const devicesResponse = await fetch(`${baseUrl}/devices/`);
        const devicesData = await devicesResponse.json();

        if (Array.isArray(devicesData.devices)) {
          setDevices(devicesData.devices);
        } else {
          console.error('Invalid response format for devices:', devicesData);
        }
      }
    } catch (error) {
      console.error('Error deleting Attribute:', error);
      setErrorMessage(`Error deleting Attribute. ${error.message}`);
    } finally {
      setIsDeleteAttributeConfirmationOpen(false);
      setOpenUpdateAttributeDialog(false);
      setSelectedAttribute(null);
    }
  };

  
  const handleDeleteAttributeDialogClose = () => {
    setIsDeleteAttributeConfirmationOpen(false);
    setAttributeToDelete(null);
  };

  const handleDeleteAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
    setIsDeleteAttributeConfirmationOpen(true);
  }; 

  const handleClose = () => {
    setOpen(false);
  };

  // // Define SuccessMessage and ErrorMessage components
  // const SuccessMessage = ({ message, onClose }) => (
  //   <Alert severity="success" onClose={onClose}>
  //     {message}
  //   </Alert>
  // );

  // const ErrorMessage = ({ message, onClose }) => (
  //   <Alert severity="error" onClose={onClose}>
  //     {message}
  //   </Alert>
  // );

  // Define SuccessMessage and ErrorMessage components
  const SuccessMessage = ({ message }) => (
    <Alert severity="success" >
      {message}
    </Alert>
  );

  const ErrorMessage = ({ message }) => (
    <Alert severity="error" >
      {message}
    </Alert>
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          {deviceSuccessMessage && (
            <SuccessMessage message={deviceSuccessMessage} onClose={() => setDeviceSuccessMessage('')}/>
          )}
          {errorMessage && (
            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')}/>
          )}
        </Grid>
        <Grid item xs={2} container justifyContent="flex-end">
          <Button
            onClick={handleAddDeviceClick}
            variant="contained"
            color="secondary"
          >
            Add Device
          </Button>
        </Grid>
    
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              {/* Table Header */}
              <TableHead>
                <TableRow>
                  <TableCell>Device Name</TableCell>
                  <TableCell>Slave ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.slave_id}</TableCell>
                    <TableCell>
                      {/* Show button */}
                      <IconButton
                        onClick={() => handleOpenUpdateDeviceForm(device.id)}
                        variant="contained"
                        style={{ marginRight: '10px' }}
                      >
                        <EditIcon style={{ color: 'gray', fontSize : "medium" }}/>
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteDeviceClick(device.id, device.name)}
                        variant="outlined"
                        style={{ marginRight: '10px' }}
                      >
                        <DeleteIcon style={{ color: 'gray', fontSize : "medium" }} />
                      </IconButton>
                      <Button
                        onClick={() => handleDeviceChange(device.id)}
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '10px' }}
                      >
                        Configuration
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      </div> 

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedDeviceName}
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          color="inherit"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DialogTitle>
              Parameter
            </DialogTitle>
            <Button
              onClick={handleAddParameterClick}
              variant="contained"
              color="secondary"
              style={{ marginBottom: '10px' }}
            >
              Add
            </Button>
          </div>
          {/* Display Parameter Success and Error Messages */}
          {parameterSuccessMessage && (
            <SuccessMessage message={parameterSuccessMessage} onClose={() => setParameterSuccessMessage('')} />
          )}
          {errorMessage && (
            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
          )}
          <TableContainer component={Paper}>
            {/* Parameter Table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Function Code</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Data Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parameters.map((parameter) => (
                  <TableRow key={parameter.id}>
                    <TableCell>{parameter.function_code}</TableCell>
                    <TableCell>{parameter.address}</TableCell>
                    <TableCell>{parameter.parameter_name}</TableCell>
                    <TableCell>{parameter.data_type}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleUpdateClick(parameter)}
                        variant="contained"
                        style={{ marginRight: '10px' }}
                      >
                        <EditIcon style={{ color: 'gray', fontSize : "medium" }}/>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteParameterClick(parameter)}
                        variant="contained"
                      >
                        <DeleteIcon style={{ color: 'gray', fontSize : "medium" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DialogTitle style={{  marginTop: '30px' }} >
              Attribute
            </DialogTitle>
            <Button
              onClick={handleAddAttributeClick}
              variant="contained"
              color="secondary"
              style={{  marginTop: '30px' }}
            >
              Add
            </Button>
          </div>
          {/* Display Attribute Success and Error Messages */}
          {attributeSuccessMessage && (
            <SuccessMessage message={attributeSuccessMessage} onClose={() => setAttributeSuccessMessage('')} />
          )}
          <TableContainer component={Paper} style={{ marginTop: '10px' }}>
            {/* Attribute Table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute Name</TableCell>
                  <TableCell>Attribute Value</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes.map((attribute) => (
                  <TableRow key={attribute.id}>
                    <TableCell>{attribute.name}</TableCell>
                    <TableCell>{attribute.value}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleUpdateAttributeClick(attribute)}
                        variant="contained"
                        style={{ marginRight: '10px' }}
                      >
                        <EditIcon style={{ color: 'gray', fontSize : "medium" }}/>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteAttributeClick(attribute)}
                        variant="contained"
                      >
                        <DeleteIcon style={{ color: 'gray', fontSize : "medium" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      
  
      <Dialog open={openUpdateDialog} onClose={handleUpdateParameterDialogClose}>
      <DialogTitle style={{ color: '#008080' }}>Update Parameter</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
              <InputLabel style={{ marginTop: '10px' }}>Function Code</InputLabel>
                <Select
                  value={updatedFunctionCode}
                  style={{ marginTop: '10px' }}
                  onChange={(e) => setUpdatedFunctionCode(e.target.value)}
                >
                  <MenuItem value="Coil Status">Coil Status</MenuItem>
                  <MenuItem value="Input Status">Input Status</MenuItem>
                  <MenuItem value="Holding Register">Holding Register</MenuItem>
                  <MenuItem value="Input Register">Input Register</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                value={updatedAddress}
                style={{ marginTop: '10px' }}
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

      <Dialog open={openUpdateAttributeDialog} onClose={handleUpdateAttributeDialogClose}>
      <DialogTitle style={{ color: '#008080' }}>Update Attribute</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Value"
                value={updatedValue}
                onChange={(e) => setUpdatedValue(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateAttributeDialogClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={handleUpdateAttributeSubmit} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteAttributeConfirmationOpen} onClose={handleDeleteDeviceDialogClose}>
        <DialogTitle>Delete Attribute</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Attribute?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAttributeDialogClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={() => handleDeleteAttributeSubmit(selectedAttribute)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        
      <Dialog open={updateDeviceFormOpen} onClose={handleCloseUpdateDeviceForm}>
        <DialogTitle>Update Device</DialogTitle>
        <DialogContent>
          {selectedDevice && (
            <>
              <TextField
                label="Device Name"
                value={updatedDeviceName}
                style={{ marginTop: '5px', marginRight: '5px' }}
                onChange={(e) => setUpdatedDeviceName(e.target.value)}
              />
              <TextField
                label="Slave ID"
                value={updatedSlaveId}
                style={{ marginTop: '5px' }}
                onChange={(e) => setUpdatedSlaveId(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDeviceForm} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdateDevice} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={isDeleteDeviceConfirmationOpen} onClose={handleDeleteDeviceConfirmationClose}>
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete "{selectedDeviceName}"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDeviceConfirmationClose} variant="outlined" color="error">
            Cancel
          </Button>
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
            style={{ marginRight: '5px', marginTop: '5px' }}
          />
          <TextField
            label="Slave ID"
            value={slaveId}
            style={{ marginTop: '5px' }}
            onChange={(e) => setSlaveId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDeviceFormClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={createDevice} variant="contained">
            Create Device
          </Button>
        </DialogActions>
      </Dialog>

  
      <Dialog open={isAddParameterFormOpen} onClose={handleAddParameterFormClose}>
        <DialogTitle>Add Parameter</DialogTitle>
        <DialogContent>
          {parameterFields.map((field, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel style={{ minWidth: '120px' , marginTop: '5px' }}>Function Code</InputLabel>
                  <Select
                    value={field.function_code || ''}
                    style={{ marginTop: '10px', minWidth: '150px' }}
                    onChange={(e) => handleFieldChange(index, 'function_code', e.target.value)}
                  >
                    <MenuItem value="Coil Status">Coil Status</MenuItem>
                    <MenuItem value="Input Status">Input Status</MenuItem>
                    <MenuItem value="Holding Register">Holding Register</MenuItem>
                    <MenuItem value="Input Register">Input Register</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Address"
                  value={field.address}
                  style={{ marginLeft: '70px' , marginTop: '10px' }}
                  onChange={(e) => handleFieldChange(index, 'address', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Parameter Name"
                  value={field.ParameterName}
                  style={{ marginTop: '10px' }}
                  onChange={(e) => handleFieldChange(index, 'ParameterName', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel style={{ minWidth: '80px', marginTop: '5px' }}>Data Type</InputLabel>
                  <Select
                    value={field.data_type}
                    style={{ marginTop: '10px', minWidth: '100px' }}
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
              <Grid item xs={2}>
                {index === parameterFields.length - 1 && (
                  <IconButton onClick={handleAddParameterButtonClick}>
                    <AddIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddParameterFormClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={parameterDevice} variant="contained" color="primary">
            Create Parameter
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={isAddAttributeFormOpen} onClose={handleAddAttributeFormClose}>
        <DialogTitle>
          Add Attribute
        </DialogTitle>
        <DialogContent>
          {attributeFields.map((field, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Name"
                  value={field.name}
                  style={{ marginTop: '7px' }}
                  onChange={(e) => handleAttributeFieldChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Value"
                  value={field.value}
                  style={{ marginTop: '7px' }}
                  onChange={(e) => handleAttributeFieldChange(index, 'value', e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                {index !== 0 && (
                  <IconButton onClick={() => removeAttributeRow(index)}>
                    <RemoveIcon style={{ color: 'red' }} />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={1}>
                {index === attributeFields.length - 1 && (
                  <IconButton onClick={handleAddAttributeButtonClick}>
                    <AddIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAttributeFormClose} variant="outlined" color="error">Cancel</Button>
          <Button onClick={attributeDevice} variant="contained">Create Attribute</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeviceParameterTable;