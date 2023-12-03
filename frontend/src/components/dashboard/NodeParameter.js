import React, { useState, useEffect } from 'react';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import config from './config';

// import { Replay as ReplayIcon, Stop as StopIcon } from '@mui/icons-material';  


const baseUrl = process.env.REACT_APP_BASEURL;

const NodeParameterTable = () => {
  const [data, setData] = useState(null);
  const [updateSpbParameterFormOpen, setUpdateSpbParameterFormOpen] = useState(false);
  const [updateNodeAttributeFormOpen, setUpdateNodeAttributeFormOpen] = useState(false);
  const [updatedAttributes, setUpdatedAttributes] = useState([]); // Add this line
  const [updateMqttFormOpen, setUpdateMqttFormOpen] = useState(false);
  // eslint-disable-next-line
  const [newAttributeName, setNewAttributeName] = useState('');
  // eslint-disable-next-line
  const [newAttributeValue, setNewAttributeValue] = useState('');
  const [addNodeAttributeFormOpen, setAddNodeAttributeFormOpen] = useState(false);
  const [attributeRows, setAttributeRows] = useState([{ name: '', value: '' }]);
  const [formDataList, setFormDataList] = useState([]);
  const [selectedModbus, setSelectedModbus] = useState({
    port: '',
    method: '',
    parity: '',
    baudrate: '',
    stopbits: '',
    wordLength: '',
  });

  const [updatedEdgeNodeId, setUpdatedEdgeNodeId] = useState('');
  const [updatedGroupId, setUpdatedGroupId] = useState('');
  const [updatedBrokerHost, setUpdatedBrokerHost] = useState('');
  const [updatedBrokerPort, setUpdatedBrokerPort] = useState('');
  const [isRestarting, setIsRestarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [restartButtonClicked] = useState(false);
  const [ModbusSuccessMessage, setModbusSuccessMessage] = useState('');
  const [SPBSuccessMessage, setSPBSuccessMessage] = useState('');
  const [NodeAttributeSuccessMessage, setNodeAttributeSuccessMessage] = useState('');
  const [MqttSuccessMessage, setMqttSuccessMessage] = useState('');
  const [ServiceStartSuccessMessage, setServiceStartSuccessMessage] = useState('');
  const [ServiceStopSuccessMessage, setServiceStopSuccessMessage] = useState('');
  const [RetentionParameterSuccessMessage, setRetentionParameterSuccessMessage] = useState('');
  const [TimeDelaySuccessMessage, setTimeDelaySuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [retentionParameters, setRetentionParameters] = useState({
    checkFrequency: { days: '', hours: '', minutes: '', seconds: '' },
    successRetention: { days: '', hours: '', minutes: '', seconds: '' },
    failureRetention: { days: '', hours: '', minutes: '', seconds: '' },
  });
  const [timeDelayParameters, setTimeDelayParameters] = useState({
    minutes: '',
    seconds: '',
  });
  
  

  const clearMessagesAfterDelay = () => {
    setTimeout(() => {
      setModbusSuccessMessage('');
      setSPBSuccessMessage('');
      setNodeAttributeSuccessMessage('');
      setMqttSuccessMessage('');
      setServiceStartSuccessMessage('');
      setServiceStopSuccessMessage('');
      setRetentionParameterSuccessMessage('');
      setTimeDelaySuccessMessage('');
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  useEffect(() => {
    clearMessagesAfterDelay();
  }, [ModbusSuccessMessage, SPBSuccessMessage, NodeAttributeSuccessMessage, MqttSuccessMessage, ServiceStartSuccessMessage, ServiceStopSuccessMessage, RetentionParameterSuccessMessage, TimeDelaySuccessMessage, errorMessage, successMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/node-parameter`);
        const responseData = await response.json();
        setData(responseData);
  
        // Initialize selectedModbus state with modbus values
        if (responseData.node_parameters) {
          const modbusValues = responseData.node_parameters.find(param => param.name === 'modbus')?.value;
          
          if (modbusValues) {
            setSelectedModbus(modbusValues);
          }
  
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

  const spbParameter = data.node_parameters.find(param => param.name === 'spb_parameter')?.value;
  const nodeAttributes = data.node_parameters.find(param => param.name === 'node_attributes')?.value;
  const mqtt = data.node_parameters.find(param => param.name === 'mqtt')?.value;
  

  const baudrateList = data.node_parameters.find(param => param.name === 'modbus')?.value.baudrate_options;
  const wordLengthList = data.node_parameters.find(param => param.name === 'modbus')?.value.wordlength_options;
  const parityList = data.node_parameters.find(param => param.name === 'modbus')?.value.parity_options;
  const stopbitsList = data.node_parameters.find(param => param.name === 'modbus')?.value.stopbits_options;
  const portList = data.node_parameters.find(param => param.name === 'modbus')?.value.port_options;
  const methodList = data.node_parameters.find(param => param.name === 'modbus')?.value.method_options;

  const uniqueBaudrateList = [...new Set(baudrateList)];
  const uniqueWordLengthList = [...new Set(wordLengthList)];
  const uniqueParityList = [...new Set(parityList)];
  const uniqueStopbitsList = [...new Set(stopbitsList)];
  const uniquePortList = [...new Set(portList)];
  const uniqueMethodList = [...new Set(methodList)];

  const handleUpdateSpbParameterFormOpen = () =>  {
    setUpdatedEdgeNodeId(spbParameter?.edge_node_id || '');
    setUpdatedGroupId(spbParameter?.group_id || '');
    setUpdateSpbParameterFormOpen(true);
  } 

  const handleAddNodeAttributeFormOpen = () => {
    // Reset the input values when opening the form
    setFormDataList([{ name: '', value: '' }]); // Set initial row
    setAddNodeAttributeFormOpen(true);
  };

  const handleUpdateNodeAttributeFormOpen = () => {
    // Initialize updatedAttributes with existing attributes
    const initialUpdatedAttributes = nodeAttributes?.map(attr => ({ name: attr.name, value: attr.value })) || [];
    setUpdatedAttributes(initialUpdatedAttributes);
    setUpdateNodeAttributeFormOpen(true);
  };
  

  const handleUpdateMqttFormOpen = () =>  {
    setUpdatedBrokerHost(mqtt?.broker_host || '');
    setUpdatedBrokerPort(mqtt?.broker_port || '');
    setUpdateMqttFormOpen(true);
  } 

  const handleUpdateFormClose = () => {
    setUpdateSpbParameterFormOpen(false);
    setAddNodeAttributeFormOpen(false);
    setUpdateNodeAttributeFormOpen(false);
    setUpdateMqttFormOpen(false);
  };

  const handleUpdateSpbParameterSubmit = async () => {
    const updatedData = {
      spb_parameter: {
        edge_node_id: updatedEdgeNodeId,
        group_id: updatedGroupId,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/node-parameter/3`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setSPBSuccessMessage('SPB Parameter updated successfully.');
        setData((prevData) => ({
          ...prevData,
          node_parameters: prevData.node_parameters.map((param) => (
            param.name === 'spb_parameter' ?
              { ...param, value: { edge_node_id: updatedEdgeNodeId, group_id: updatedGroupId } }
              : param
          )),
        }));
      } else {
        setErrorMessage(`Failed to update SPB Parameter: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating SPB Parameter: ${error}`);
    }

    handleUpdateFormClose();
  };

  // Add this function to handle the change in form data
  const handleFormDataChange = (index, key, value) => {
    const updatedFormDataList = [...formDataList];
    updatedFormDataList[index][key] = value;
    setFormDataList(updatedFormDataList);
  };

  // eslint-disable-next-line
  const handleAddRow = () => {
    setAttributeRows([...attributeRows, { name: '', value: '' }]);
  };

  // Add this function to handle the "Add" button click
  const handleAddFormData = () => {
    setFormDataList([...formDataList, { name: '', value: '' }]);
  };

  // eslint-disable-next-line
  const handleAttributeChange = (index, key, value) => {
    const updatedRows = [...attributeRows];
    updatedRows[index][key] = value;
    setAttributeRows(updatedRows);
  };

  const handleRemoveFormData = (indexToRemove) => {
    setFormDataList((prevFormDataList) => {
      return prevFormDataList.filter((_, index) => index !== indexToRemove);
    });
  };

  // eslint-disable-next-line
  const getUpdatedValue = (attributeName) => {
    // Assuming you have a state variable for updated attributes, e.g., updatedAttributes
    const updatedAttribute = updatedAttributes.find(attr => attr.name === attributeName);
    return updatedAttribute ? updatedAttribute.value : "";
  };
  
  const handleUpdateInputChange = (index, updatedAttribute) => {
    setUpdatedAttributes(prevAttributes => {
      const updatedAttributesCopy = [...prevAttributes];
      updatedAttributesCopy[index] = updatedAttribute;
      return updatedAttributesCopy;
    });
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributesCopy = [...updatedAttributes];
    updatedAttributesCopy.splice(index, 1);
    setUpdatedAttributes(updatedAttributesCopy);
  };
  

  const handleAddNodeAttributeSubmit = async () => {
    try {
      const newAttributes = formDataList.map(formData => ({ name: formData.name, value: formData.value }));
      const response = await fetch(`${baseUrl}/node-parameter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'node_attributes',
          value: newAttributes,
        }),
      });

      if (response.ok) {
        setNodeAttributeSuccessMessage('Node Attributes added successfully.');
        setData((prevData) => ({
          ...prevData,
          node_parameters: prevData.node_parameters.map((param) => (
            param.name === 'node_attributes' ?
              { ...param, value: [...(param.value || []), ...newAttributes] }
              : param
          )),
        }));
        setFormDataList([]);
      } else {
        setErrorMessage(`Failed to add Node Attributes: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error adding Node Attributes: ${error}`);
    }

    handleUpdateFormClose();
  };


  const handleUpdateNodeAttributeSubmit = async () => {
    // Update local state with the new values
    setData((prevData) => {
      const updatedNodeParameters = prevData.node_parameters.map((param) => {
        if (param.name === 'node_attributes') {
          return {
            ...param,
            value: updatedAttributes.map(attr => ({ name: attr.name, value: attr.value })),
          };
        }
        return param;
      });
  
      return {
        ...prevData,
        node_parameters: updatedNodeParameters,
      };
    });
  
    const updatedData = {
      node_attributes: updatedAttributes.map(attr => ({ name: attr.name, value: attr.value })),
    };
  
    try {
      const response = await fetch(`${baseUrl}/node-parameter/4`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        setNodeAttributeSuccessMessage('Node Attribute updated successfully.');
      } else {
        setErrorMessage(`Failed to update Node Attribute: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating Node Attribute:  ${error}`);
    }
  
    handleUpdateFormClose();
  };
  
  
  const handleUpdateMqttSubmit = async () => {
    const updatedData = {
      mqtt: {
        broker_host: updatedBrokerHost,
        broker_port: updatedBrokerPort,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/node-parameter/2`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setMqttSuccessMessage('Mqtt updated successfully.');
        setData((prevData) => ({
          ...prevData,
          node_parameters: prevData.node_parameters.map((param) => (
            param.name === 'mqtt' ?
              { ...param, value: { broker_host: updatedBrokerHost, broker_port: updatedBrokerPort } }
              : param
          )),
        }));
      } else {
        setErrorMessage(`Failed to update Mqtt: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating Mqtt: ${error}`);
    }

    handleUpdateFormClose();
  };

  const handleModbusChange = async (paramName, value) => {
    try {
      const response = await fetch(`${baseUrl}/node-parameter/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modbus: { ...selectedModbus, [paramName]: value },
        }),
      });

      if (response.ok) {
        setModbusSuccessMessage('Modbus updated successfully.');
        setSelectedModbus((prevState) => ({
          ...prevState,
          [paramName]: value,
        }));
      } else {
        setErrorMessage(`Failed to update Modbus: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating Modbus: ${error}`);
    }
  };

  
  const handleRestart = () => {
    // Add logic for restarting here
    setIsRestarting(true);
  
    // Perform your restart actions, then set isRestarting to false
    // For example, you can make a fetch request to a restart endpoint
    fetch(`${baseUrl}/service/restart-services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setServiceStartSuccessMessage('Service is restarting.');
          // Add any additional logic if needed
        } else {
          setErrorMessage(`Failed to restart service: ${response.statusText}`);
        }
      })
      .catch((error) => {
        setErrorMessage(`Error restarting service: ${error}`);
      })
      .finally(() => {
        setIsRestarting(false);
      });
  };


  const handleStop = () => {
    // Add logic for stopping here
    setIsStopping(true);
  
    fetch(`${baseUrl}/service/stop-services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setServiceStopSuccessMessage('Service is stopped.');
          // Add any additional logic if needed
        } else {
          setErrorMessage(`Failed to stop service: ${response.statusText}`);
        }
      })
      .catch((error) => {
        setErrorMessage(`Error stopping service: ${error}`);
      })
      .finally(() => {
        setIsStopping(false);
      });
  };

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
    // You may add an else statement here to handle invalid input if needed
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
  
      if (response.ok) {
        setRetentionParameterSuccessMessage('Retention Parameters updated successfully.');
      } else {
        setErrorMessage(`Failed to update Retention Parameters: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error updating Retention Parameters: ${error}`);
    }
  };

  const handleTimeDelayChange = (unit, value) => {
    // Parse the input value as an integer
    const integerValue = parseInt(value, 10);
  
    // Check if the parsed value is a valid integer
    if (!isNaN(integerValue)) {
      setTimeDelayParameters((prevParameters) => ({
        ...prevParameters,
        [unit]: integerValue,
      }));
    }
    // You may add an else statement here to handle invalid input if needed
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
      <Grid item xs={6}>
      {ServiceStartSuccessMessage && (
        <SuccessMessage message={ServiceStartSuccessMessage} onClose={() => setServiceStartSuccessMessage('')}/>
      )}
      {ServiceStopSuccessMessage && (
        <SuccessMessage message={ServiceStopSuccessMessage} onClose={() => setServiceStopSuccessMessage('')}/>
      )}
      {NodeAttributeSuccessMessage && (
        <SuccessMessage message={NodeAttributeSuccessMessage} onClose={() => setNodeAttributeSuccessMessage('')}/>
      )}
      {SPBSuccessMessage && (
        <SuccessMessage message={SPBSuccessMessage} onClose={() => setSPBSuccessMessage('')}/>  
      )}
      {MqttSuccessMessage && (
        <SuccessMessage message={MqttSuccessMessage} onClose={() => setMqttSuccessMessage('')}/>
      )}
      {ModbusSuccessMessage && (
        <SuccessMessage message={ModbusSuccessMessage} onClose={() => setModbusSuccessMessage('')}/>
      )}
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
      <Grid item xs={6}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button onClick={handleRestart} disabled={isRestarting || restartButtonClicked} variant="contained" color="primary">
            Restart
          </Button>
          <Button onClick={handleStop} disabled={isStopping} style={{ marginLeft: '10px'}} variant="contained" color="error">
            Stop
          </Button>
        </div>
      </Grid>

      <Grid item xs={4}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" >Node Attributes</Typography>
            <div style={{ display: 'flex', gap: '0px' }}>
              <IconButton
                variant="outlined"
                style={{ marginRight: '0px' }}
                onClick={handleUpdateNodeAttributeFormOpen}
              >
                <EditIcon style={{ fontSize : "medium" }}/>
              </IconButton>
              <IconButton
                variant="outlined"
                style={{ marginLeft: '5px' }}
                onClick={handleAddNodeAttributeFormOpen}
              >
                <AddIcon style={{ color: 'green', fontSize : "medium" }} />
              </IconButton>
            </div>
          </div>
          <div style={{ marginTop: '3px' }}>
            {nodeAttributes && nodeAttributes.map(attr => (
              <div key={attr.name}>
                <Typography variant="body1">
                  <strong>{attr.name}:</strong> {attr.value}
                </Typography>
              </div>
            ))}
          </div>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">SPB Parameter</Typography>
            <IconButton
              variant="outlined"
              style={{ marginLeft: '10px' }}
              onClick={handleUpdateSpbParameterFormOpen}
            >
              <EditIcon style={{ fontSize : "medium" }}/>
            </IconButton>
          </div>
          <div>
            <strong>Edge Node Id:</strong> {spbParameter?.edge_node_id}
          </div>
          <div>
            <strong>Group Id:</strong> {spbParameter?.group_id}
          </div>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">MQTT</Typography>
            <IconButton
              variant="outlined"
              style={{ marginLeft: '10px' }}
              onClick={handleUpdateMqttFormOpen}
            >
              <EditIcon style={{ fontSize : "medium" }}/>
            </IconButton>
          </div>
          <div>
            <strong>Broker Host:</strong> {mqtt?.broker_host}
          </div>
          <div>
            <strong>Broker Port:</strong> {mqtt?.broker_port}
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">Modbus Parameters</Typography>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            {['Port', 'Method', 'Parity', 'Baudrate', 'Stopbits', 'WordLength'].map((label, index) => (
              <div key={index} style={{ marginRight: '20px', width: label === 'Method' ? '150px' : '120px' }}>
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={selectedModbus[label.toLowerCase()]}
                    onChange={(e) => handleModbusChange(label.toLowerCase(), e.target.value)}
                  >
                    {label === 'Baudrate' && uniqueBaudrateList.map(baudrate => (
                      <MenuItem key={baudrate} value={baudrate}>
                        {baudrate}
                      </MenuItem>
                    ))}
                    {label === 'WordLength' && uniqueWordLengthList.map(wordLength => (
                      <MenuItem key={wordLength} value={wordLength}>
                        {wordLength}
                      </MenuItem>
                    ))}
                    {label === 'Parity' && uniqueParityList.map(parity => (
                      <MenuItem key={parity} value={parity}>
                        {parity}
                      </MenuItem>
                    ))}
                    {label === 'Stopbits' && uniqueStopbitsList.map(stopbits => (
                      <MenuItem key={stopbits} value={stopbits}>
                        {stopbits}
                      </MenuItem>
                    ))}
                    {label === 'Port' && uniquePortList.map(port => (
                      <MenuItem key={port} value={port}>
                        {port}
                      </MenuItem>
                    ))}
                    {label === 'Method' && uniqueMethodList.map(method => (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}
          </div>
        </Paper>
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
                    />
                  ))}
                </div>
              </div>
            ))}
            <Button onClick={handleRetentionParameterSubmit} color="primary">
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">Time Delay Parameters</Typography>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            <TextField
              label="Minutes"
              type="number"
              value={timeDelayParameters.minutes}
              onChange={(e) => setTimeDelayParameters(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
              fullWidth
              style={{ marginRight: '20px' }}
            />
            <TextField
              label="Seconds"
              type="number"
              value={timeDelayParameters.seconds}
              onChange={(e) => setTimeDelayParameters(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
              fullWidth
            />
          </div>
          <Button onClick={handleTimeDelayParameterSubmit} color="primary">
            Submit
          </Button>
        </Paper>
      </Grid>

      {/* Update form for SPB Parameter */}
      <Dialog open={updateSpbParameterFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Update SPB Parameter</DialogTitle>
        <DialogContent>
          <TextField
            label="Edge Node ID"
            value={updatedEdgeNodeId}
            onChange={(e) => setUpdatedEdgeNodeId(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px', marginTop: '5px' }} // Adjust values based on your preference
          />
          <TextField
            label="Group ID"
            value={updatedGroupId}
            onChange={(e) => setUpdatedGroupId(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleUpdateSpbParameterSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit form for Node Attribute */}
      <Dialog open={updateNodeAttributeFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Edit Node Attribute</DialogTitle>
        <DialogContent>
          {updatedAttributes.map((attr, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <TextField
                label="Attribute Name"
                value={attr.name}
                onChange={(e) => handleUpdateInputChange(index, { ...attr, name: e.target.value })}
                style={{ marginRight: '10px', marginTop: '5px' }}
              />
              <TextField
                label="Attribute Value"
                value={attr.value}
                onChange={(e) => handleUpdateInputChange(index, { ...attr, value: e.target.value })}
                style={{ marginTop: '5px' }}
              />
              <IconButton onClick={() => handleRemoveAttribute(index)}>
                <DeleteIcon style={{ color: 'black', fontSize : "medium" }} />
              </IconButton>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleUpdateNodeAttributeSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      
      {/* Create form for Add Node Attribute */}
      <Dialog open={addNodeAttributeFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Add Node Attribute</DialogTitle>
        <DialogContent>
          {formDataList.map((formData, index) => (
            <Grid container spacing={2} key={index} alignItems="center" style={{ marginBottom: '8px' }}>
              <Grid item xs={4}>
                <TextField
                  label="Attribute Name"
                  value={formData.name}
                  style={{ marginTop: '5px' }}
                  onChange={(e) => handleFormDataChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Attribute Value"
                  value={formData.value}
                  style={{ marginTop: '5px' }}
                  onChange={(e) => handleFormDataChange(index, 'value', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                {index > 0 && (
                  <IconButton onClick={() => handleRemoveFormData(index)}>
                    <RemoveIcon style={{ color: 'red' }} />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={2}>
                {index === formDataList.length - 1 && (
                  <IconButton onClick={handleAddFormData}>
                    <AddIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleAddNodeAttributeSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


      {/* Update form for Mqtt */}
      <Dialog open={updateMqttFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Update Mqtt</DialogTitle>
        <DialogContent>
          <TextField
            label="Broker Host"
            value={updatedBrokerHost}
            onChange={(e) => setUpdatedBrokerHost(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px', marginTop: '5px' }}
          />
          <TextField
            label="Broker Port"
            value={updatedBrokerPort}
            onChange={(e) => setUpdatedBrokerPort(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleUpdateMqttSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default NodeParameterTable;