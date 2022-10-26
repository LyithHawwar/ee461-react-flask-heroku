import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { redirect, useNavigate } from "react-router-dom";
import { useState } from 'react';
import ProjectsPage from './projectsPage';

function CreateData(name, setID, totalCapacity, usedCapacity, inQ, outQ) {
  const capacity = (totalCapacity - usedCapacity) + "/" + totalCapacity
  const [inQty, setIn] = useState(inQ);
  const [outQty, setOut] = useState(outQ);
  return { name, setID, capacity, inQty, outQty, setOut, setIn };
}



export default function HardwareSetsTable() {
  
  const rows = [
  CreateData('HWset1', '0001', 300, 50, "", ""),
  CreateData('HWset2', '0023', 1000, 500, "", ""),
  CreateData('HWsetOmega', '0025', 450, 0, "", ""),
  ];
  const handleClick = event => {
    event.preventDevault();
  };
  const handleOutValChange = (e, row) => {
    row.setOut(e.target.value);
    // console.log(row.outQty);
    redirect('/projects');
  }
  
  const handleInValChange = (e, row) => {
    row.setIn(e.target.value);
    // console.log(row.outQty);
    redirect('/projects');
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const HandleCheckOut = (baseURL, qty) => {
    // console.log('checkOut'.concat(baseURL.concat(qty)));
    fetch('projects/checkOut'.concat(baseURL.concat(qty)), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('message'),
    }).then(
      response => response.json()).then(
        text => { alert(text.concat(' hardware checked out'));
          // console.log(text);
         }
      );    
  }
  const HandleCheckIn = (baseURL, qty) => {
    // console.log('checkOut'.concat(baseURL.concat(qty)));
    fetch('projects/checkIn'.concat(baseURL.concat(qty)), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('message'),
    }).then(
      response => response.json()).then(
        text => { alert(text.concat(' hardware checked in'));
          // console.log(text);
         }
      );    
  }
    // console.log(message);
    // alert(message);
  //   const [data, setData] = useState();
  //   React.useEffect(() => {
  //   let url = baseURL.concat(qty);
  //   console.log(url);
  //   fetch(url).then(
  //     data => {
  //       setData(data)
  //       alert(data)
  //       console.log(data)
  //     }
  //   )
  //  })
  
  let navigate = useNavigate();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={"name"} align={"center"} style={{ minWidth: 170 }}>
                  Name
              </TableCell>
              <TableCell key={"setID"} align={"center"} style={{ minWidth: 170 }}>
                  Set ID
              </TableCell>
              <TableCell key={"capacity"} align={"center"} style={{ minWidth: 100 }}>
                  Available Capacity
              </TableCell>
              <TableCell key={"checkIn"} align={"center"} style={{ minWidth: 170 }}>
                  Check In
              </TableCell>
              <TableCell key={"checkOut"} align={"center"} style={{ minWidth: 170 }}>
                  Check Out
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.setID}>
                    <TableCell key={"name"} align={"center"} style={{ minWidth: 170 }}>
                      {row["name"]}
                    </TableCell>
                    <TableCell key={"setID"} align={"center"} style={{ minWidth: 170 }}>
                      {row["setID"]}
                    </TableCell>
                    <TableCell key={"capacity"} align={"center"} style={{ minWidth: 170 }}>
                      {row["capacity"]}
                    </TableCell>
                    <TableCell key={"checkIn"} align={"center"} style={{ minWidth: 170 }}>
                      <TextField
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          label="Enter Qty"
                          id="outlined-size-small"
                          size="small"
                          type="number"
                          value={row.inQty}
                          onChange={(e) => handleInValChange(e, row)}
                        />
                      <Button size="small" sx={{mt:0.5}}
                      onClick = {() => {HandleCheckIn('/1234/', row.inQty)}}
                      >Check In</Button>

                    </TableCell>
                    <TableCell key={"checkOut"} align={"center"} style={{ minWidth: 170 }}>
                      <TextField
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          label="Enter Qty"
                          id="outlined-size-small"
                          size="small"
                          type="number"
                          value={row.outQty}
                          onChange={(e) => handleOutValChange(e, row)}
                          
                          // onChange= {() => console.log(row.inQty)}
                        >
                        
                      </TextField>
                      <Button 
                      onClick = {() => {HandleCheckOut('/1234/', row.outQty)}}
                      size="small" sx={{mt:0.5}}
                      >Check Out</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
