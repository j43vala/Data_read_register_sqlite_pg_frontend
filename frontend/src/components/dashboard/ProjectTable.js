// import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
// import user1 from "../../assets/images/users/user1.jpg";
// import user2 from "../../assets/images/users/user2.jpg";
// import user3 from "../../assets/images/users/user3.jpg";
// import user4 from "../../assets/images/users/user4.jpg";
// import user5 from "../../assets/images/users/user5.jpg";

// const tableData = [
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user2,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Lading pro React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user3,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Elite React",
//     status: "holt",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user4,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user5,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Ample React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
// ];

// const ProjectTables = () => {
//   return (
//     <div>
//       <Card>
//         <CardBody>
//           <CardTitle tag="h5">Project Listing</CardTitle>
//           <CardSubtitle className="mb-2 text-muted" tag="h6">
//             Overview of the projects
//           </CardSubtitle>

//           <Table className="no-wrap mt-3 align-middle" responsive borderless>
//             <thead>
//               <tr>
//                 <th>Team Lead</th>
//                 <th>Project</th>

//                 <th>Status</th>

//                 <th>Budget</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((tdata, index) => (
//                 <tr key={index} className="border-top">
//                   <td>
//                     <div className="d-flex align-items-center p-2">
//                       <img
//                         src={tdata.avatar}
//                         className="rounded-circle"
//                         alt="avatar"
//                         width="45"
//                         height="45"
//                       />
//                       <div className="ms-3">
//                         <h6 className="mb-0">{tdata.name}</h6>
//                         <span className="text-muted">{tdata.email}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{tdata.project}</td>
//                   <td>
//                     {tdata.status === "pending" ? (
//                       <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
//                     ) : tdata.status === "holt" ? (
//                       <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
//                     ) : (
//                       <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
//                     )}
//                   </td>

//                   <td>{tdata.budget}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default ProjectTables;

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const generateRandomStockData = () => {
  const rowData = {};
  const headers = [
    "Time",
    "LTP",
    "Change in Direction",
    "Direction of change %",
    "Net PCR",
    "Change in Call OI",
    "Change in Put OI",
    "Difference in OI"
  ];

  headers.forEach(header => {
    if (header === "Change in Direction") {
      const changeValue = ["Up", "Down", "No Change"][Math.floor(Math.random() * 3)];
      const arrow = changeValue === "Up" ? "▲" : changeValue === "Down" ? "▼" : "";
      const color = changeValue === "Up" ? "green" : changeValue === "Down" ? "red" : "";

      rowData[header] = (
        <span style={{ color }}>
          {arrow} {changeValue}
        </span>
      );
    } else if (header === "Direction of change %") {
      rowData[header] = (Math.random() * 10).toFixed(2);
    } else if (header === "Difference in OI") {
      const randomValue = Math.floor(Math.random() * 1000);
      rowData[header] = randomValue;
    } else if (header === "Time") {
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      const seconds = Math.floor(Math.random() * 60);
      const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      rowData[header] = formattedTime;
    } else if (header === "LTP") {
      const randomLTP = (Math.random() * 1000).toFixed(2);
      rowData[header] = randomLTP;
    } else {
      rowData[header] = Math.floor(Math.random() * 1000);
    }
  });

  return rowData;
};

const ProjectTable = () => {
  const [tableData, setTableData] = useState([]);

  const updateTableData = () => {
    const newTableData = [];
    for (let i = 0; i < 9; i++) {
      newTableData.push(generateRandomStockData());
    }
    setTableData(newTableData);
  };

  useEffect(() => {
    updateTableData();

    const intervalId = setInterval(() => {
      updateTableData();
    }, 2000); // Update data every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  const headers = [
    "Time",
    "LTP",
    "Change in Direction",
    "Direction of change %",
    "Net PCR",
    "Change in Call OI",
    "Change in Put OI",
    "Difference in OI"
  ];

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                {headers.map((header, headerIndex) => (
                  <TableCell key={headerIndex}>{item[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;
