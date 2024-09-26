import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogContent, DialogTitle, TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, FormControl, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const initialPatients = [
  { id: 1, name: 'John Doe', gender: 'Male', age: 30, bloodGroup: 'A+', nextAppointment: '2024-10-01' },
  { id: 2, name: 'Jane Smith', gender: 'Female', age: 25, bloodGroup: 'B+', nextAppointment: '2024-09-25' },
  { id: 3, name: 'Alice Johnson', gender: 'Female', age: 40, bloodGroup: 'O-', nextAppointment: '2024-09-30' },
];

const initialPatientDetails = {
  1: {
    medicines: ['Aspirin 100mg', 'Cough Syrup 10ml'],
    prescription: 'Take 1 Aspirin after meals. Cough syrup 10ml at night.',
    visits: [
      { date: '2024-09-01', problem: 'Fever', bill: 500 },
      { date: '2024-09-10', problem: 'Cough', bill: 300 },
    ],
    testReports: [
      { id: 1, date: '2024-09-01', test: 'Blood Test', result: 'Hemoglobin: 13g/dL, WBC: 5.5k/uL' },
      { id: 2, date: '2024-09-05', test: 'X-Ray', result: 'Normal' },
    ],
  },
  2: {
    medicines: ['Paracetamol 500mg'],
    prescription: 'Take 1 tablet for headache.',
    visits: [
      { date: '2024-09-05', problem: 'Headache', bill: 200 },
    ],
    testReports: [
      { id: 1, date: '2024-09-06', test: 'CT Scan', result: 'No Abnormalities' },
    ],
  },
  3: {
    medicines: ['Ibuprofen 200mg'],
    prescription: 'Take 1 tablet twice a day.',
    visits: [
      { date: '2024-09-15', problem: 'Back Pain', bill: 400 },
    ],
    testReports: [],
  },
};

const PatientTable = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [patientDetails, setPatientDetails] = useState(initialPatientDetails);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [testReportOpen, setTestReportOpen] = useState(false);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    gender: '',
    age: '',
    bloodGroup: '',
    nextAppointment: '',
    dob: '',
    phoneNumber: '',
  });

  const [newVisit, setNewVisit] = useState({ date: '', problem: '', bill: '' });
  const [newPrescription, setNewPrescription] = useState({ medicines: '', prescription: '' });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'bloodGroup', headerName: 'Blood Group', flex: 1 },
    { field: 'nextAppointment', headerName: 'Next Appointment', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <Button variant="outlined" onClick={() => handleEditPatient(params.row)}>Edit</Button>
          <Button variant="outlined" onClick={() => handleDeletePatient(params.row.id)} sx={{ ml: 1 }}>Delete</Button>
        </>
      ),
      flex: 1,
    },
  ];

  const handleRowClick = (params) => {
    setSelectedPatient(params.row);
    setDetailsOpen(true);
  };

  const handleClose = () => {
    setDetailsOpen(false);
    setSelectedPatient(null);
  };

  const handleAddPatientOpen = () => setAddPatientOpen(true);
  const handleAddPatientClose = () => setAddPatientOpen(false);

  const handleAddPatient = () => {
    const newPatientId = patients.length + 1;
    const age = calculateAge(newPatient.dob); 
    if (newPatient.phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
    setPatients([
      ...patients,
      { ...newPatient, id: newPatientId, age },
    ]);
    setPatientDetails({
      ...patientDetails,
      [newPatientId]: {
        medicines: [],
        prescription: '',
        visits: [],
        testReports: [],
      },
    });
    setNewPatient({
      name: '',
      gender: '',
      age: '',
      bloodGroup: '',
      nextAppointment: '',
      dob: '',
      phoneNumber: '',
    });
    handleAddPatientClose();
  };

  const handleAddVisit = () => {
    const updatedDetails = {
      ...patientDetails,
      [selectedPatient.id]: {
        ...patientDetails[selectedPatient.id],
        visits: [
          ...patientDetails[selectedPatient.id].visits,
          { ...newVisit },
        ],
      },
    };
    setPatientDetails(updatedDetails);
    setNewVisit({ date: '', problem: '', bill: '' });
  };

  const handleAddPrescription = () => {
    const updatedDetails = {
      ...patientDetails,
      [selectedPatient.id]: {
        ...patientDetails[selectedPatient.id],
        medicines: newPrescription.medicines.split(',').map((medicine) => medicine.trim()),
        prescription: newPrescription.prescription,
      },
    };
    setPatientDetails(updatedDetails);
    setNewPrescription({ medicines: '', prescription: '' });
  };

  const handleTestReportOpen = () => setTestReportOpen(true); // Open test reports dialog
  const handleTestReportClose = () => setTestReportOpen(false); // Close test reports dialog

  const handleEditPatient = (patient) => {
    setNewPatient({ ...patient, dob: '' });
    handleAddPatientOpen();
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
    const updatedDetails = { ...patientDetails };
    delete updatedDetails[id];
    setPatientDetails(updatedDetails);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        bgcolor: '#BFDBFE',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Box sx={{ height: 'auto', width: '80%', bgcolor: '#FFFFFF', p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#0288D1', mb: 3 }}>
          Patient Management
        </Typography>

        {/* Search bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, width: '40%' }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#4CAF50', color: '#FFFFFF' }}
          onClick={handleAddPatientOpen}
        >
          Add Patient
        </Button>

        <DataGrid
  rows={filteredPatients}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5]}
  disableSelectionOnClick
  autoHeight
  onRowClick={handleRowClick}
  sx={{ boxShadow: 2, border: 'none', borderRadius: 2 }}
/>

        {/* Patient Details */}
        <Dialog open={detailsOpen} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>{selectedPatient?.name}'s Details</DialogTitle>
          <DialogContent>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Visits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Problem</TableCell>
                      <TableCell>Bill</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {patientDetails[selectedPatient?.id]?.visits?.map((visit, index) => (
                      <TableRow key={index}>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.problem}</TableCell>
                        <TableCell>{visit.bill}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Prescriptions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>Medicines:</strong> {patientDetails[selectedPatient?.id]?.medicines.join(', ')}</Typography>
                <Typography><strong>Prescription:</strong> {patientDetails[selectedPatient?.id]?.prescription}</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Test Reports</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button variant="contained" color="primary" onClick={handleTestReportOpen}>
                  View Test Reports
                </Button>
              </AccordionDetails>
            </Accordion>

            {/* Add Visit */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Add Visit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Date"
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Problem"
                  value={newVisit.problem}
                  onChange={(e) => setNewVisit({ ...newVisit, problem: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Bill"
                  value={newVisit.bill}
                  onChange={(e) => setNewVisit({ ...newVisit, bill: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddVisit} fullWidth>
                  Add Visit
                </Button>
              </AccordionDetails>
            </Accordion>

            {/* Add Prescription */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Add Prescription</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Medicines (comma separated)"
                  value={newPrescription.medicines}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medicines: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Prescription"
                  value={newPrescription.prescription}
                  onChange={(e) => setNewPrescription({ ...newPrescription, prescription: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddPrescription} fullWidth>
                  Add Prescription
                </Button>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
        </Dialog>

        {/* Add Patient Dialog */}
        <Dialog open={addPatientOpen} onClose={handleAddPatientClose} maxWidth="md" fullWidth>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date of Birth"
              type="date"
              value={newPatient.dob}
              onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone Number"
              value={newPatient.phoneNumber}
              onChange={(e) => setNewPatient({ ...newPatient, phoneNumber: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Blood Group"
              value={newPatient.bloodGroup}
              onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Next Appointment"
              type="date"
              value={newPatient.nextAppointment}
              onChange={(e) => setNewPatient({ ...newPatient, nextAppointment: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleAddPatient} fullWidth>
              Add Patient
            </Button>
          </DialogContent>
        </Dialog>

        {/* Test Reports Dialog */}
        <Dialog open={testReportOpen} onClose={handleTestReportClose} maxWidth="md" fullWidth>
          <DialogTitle>Test Reports for {selectedPatient?.name}</DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Test</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientDetails[selectedPatient?.id]?.testReports?.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.test}</TableCell>
                    <TableCell>{report.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default PatientTable;
