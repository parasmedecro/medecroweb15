import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogContent, DialogTitle, TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
  },
  2: {
    medicines: ['Paracetamol 500mg'],
    prescription: 'Take 1 tablet for headache.',
    visits: [
      { date: '2024-09-05', problem: 'Headache', bill: 200 },
    ],
  },
  3: {
    medicines: ['Ibuprofen 200mg'],
    prescription: 'Take 1 tablet twice a day.',
    visits: [
      { date: '2024-09-15', problem: 'Back Pain', bill: 400 },
    ],
  },
};

const PatientTable = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [patientDetails, setPatientDetails] = useState(initialPatientDetails);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    gender: '',
    age: '',
    bloodGroup: '',
    nextAppointment: '',
  });

  const [newVisit, setNewVisit] = useState({ date: '', problem: '', bill: '' });
  const [newPrescription, setNewPrescription] = useState({ medicines: '', prescription: '' });

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'bloodGroup', headerName: 'Blood Group', flex: 1 },
    { field: 'nextAppointment', headerName: 'Next Appointment', flex: 1 },
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
    setPatients([
      ...patients,
      { ...newPatient, id: newPatientId },
    ]);
    // Initialize empty details for new patient
    setPatientDetails({
      ...patientDetails,
      [newPatientId]: {
        medicines: [],
        prescription: '',
        visits: [],
      },
    });
    setNewPatient({
      name: '',
      gender: '',
      age: '',
      bloodGroup: '',
      nextAppointment: '',
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

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: '100%',
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
          Patient Appointment Management
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
          onRowClick={handleRowClick}
          sx={{
            height: '80%',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#0288D1',
              color: '#FFFFFF',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: '#1976D2',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: '#FFFFFF',
              color: '#0288D1',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#0288D1',
              color: '#FFFFFF',
            },
            border: '1px solid #0288D1',
            borderRadius: 2,
          }}
        />

        {/* Dialog for displaying patient details */}
        <Dialog open={detailsOpen} onClose={handleClose} maxWidth="md" fullWidth>
          {selectedPatient && (
            <>
              <DialogTitle>{selectedPatient.name}'s Details</DialogTitle>
              <DialogContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Medicines Prescribed
                </Typography>
                <Typography>
                  {patientDetails[selectedPatient.id].medicines.length > 0
                    ? patientDetails[selectedPatient.id].medicines.join(', ')
                    : 'No medicines prescribed.'}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Prescription
                </Typography>
                <Typography>{patientDetails[selectedPatient.id].prescription || 'No prescription.'}</Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Visit History
                </Typography>
                {patientDetails[selectedPatient.id].visits.length > 0 ? (
                  patientDetails[selectedPatient.id].visits.map((visit, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{`Visit on ${visit.date}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography><strong>Problem:</strong> {visit.problem}</Typography>
                        <Typography><strong>Bill Paid:</strong> {visit.bill} Tsh</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <Typography>No visit history available.</Typography>
                )}

                <Typography variant="h6" sx={{ mt: 3 }}>
                  Next Appointment: {selectedPatient.nextAppointment}
                </Typography>

                {/* Add new visit */}
                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Add New Visit
                </Typography>
                <TextField
                  margin="dense"
                  label="Visit Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="Problem"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newVisit.problem}
                  onChange={(e) => setNewVisit({ ...newVisit, problem: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="Bill"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={newVisit.bill}
                  onChange={(e) => setNewVisit({ ...newVisit, bill: e.target.value })}
                />
                <Button onClick={handleAddVisit} sx={{ mt: 2, backgroundColor: '#4CAF50', color: '#FFFFFF' }}>
                  Add Visit
                </Button>

                {/* Add new prescription */}
                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Add New Prescription
                </Typography>
                <TextField
                  margin="dense"
                  label="Medicines (comma-separated)"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newPrescription.medicines}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medicines: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="Prescription"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newPrescription.prescription}
                  onChange={(e) => setNewPrescription({ ...newPrescription, prescription: e.target.value })}
                />
                <Button onClick={handleAddPrescription} sx={{ mt: 2, backgroundColor: '#4CAF50', color: '#FFFFFF' }}>
                  Add Prescription
                </Button>
              </DialogContent>
            </>
          )}
        </Dialog>

        {/* Dialog for adding a new patient */}
        <Dialog open={addPatientOpen} onClose={handleAddPatientClose}>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Patient Name"
              type="text"
              fullWidth
              variant="standard"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Gender"
              type="text"
              fullWidth
              variant="standard"
              value={newPatient.gender}
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Blood Group"
              type="text"
              fullWidth
              variant="standard"
              value={newPatient.bloodGroup}
              onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Next Appointment"
              type="text"
              fullWidth
              variant="standard"
              value={newPatient.nextAppointment}
              onChange={(e) => setNewPatient({ ...newPatient, nextAppointment: e.target.value })}
            />
          </DialogContent>
          <Button onClick={handleAddPatient} sx={{ color: 'blue', marginBottom: 2 }}>
            Add Patient
          </Button>
        </Dialog>
      </Box>
    </Box>
  );
};

export default PatientTable;
