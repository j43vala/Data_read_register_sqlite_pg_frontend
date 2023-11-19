import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const NodeParameterTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/node-parameter/');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.node_parameters.map((param) => (
              <React.Fragment key={param.name}>
                <TableRow>
                  <TableCell>{param.name}</TableCell>
                  <TableCell>{JSON.stringify(param.value)}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display edge_node_id and group_id values below the table */}
      <div style={{ marginTop: '20px' }}>
        <strong>edge_node_id:</strong> {data.node_parameters.find(param => param.name === 'spb_parameter')?.value.edge_node_id}
      </div>
      <div>
        <strong>group_id:</strong> {data.node_parameters.find(param => param.name === 'spb_parameter')?.value.group_id}
      </div>

      {/* Display node_attributes values below the table */}
      <div style={{ marginTop: '20px' }}>
        {data.node_parameters.find(param => param.name === 'node_attributes')?.value.map(attr => (
          <div key={attr.name}>
            <Typography variant="subtitle1" color="textPrimary">
              {attr.name}:
            </Typography>
            <Typography variant="body1">{attr.value}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeParameterTable;
