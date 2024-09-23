import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogContent, DialogTitle, TextField, Menu, MenuItem, InputAdornment } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import SearchIcon from '@mui/icons-material/Search';

const initialMedicines = [
  { id: 1, name: 'Aspirin', price: 500, status: 'Available', inStock: 30, measure: 'mg' },
  { id: 2, name: 'Paracetamol', price: 700, status: 'Out of Stock', inStock: 0, measure: 'mg' },
  { id: 3, name: 'Ibuprofen', price: 450, status: 'Available', inStock: 50, measure: 'mg' },
  { id: 4, name: 'Cough Syrup', price: 1200, status: 'Available', inStock: 20, measure: 'ml' },
  { id: 5, name: 'Amoxicillin', price: 950, status: 'Out of Stock', inStock: 0, measure: 'mg' },
];

const InventoryTable = () => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ id: '', name: '', price: '', status: 'Available', inStock: '', measure: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price (INR)', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.value === 'Available' ? 'green' : 'red' }}>{params.value}</span>
      ),
    },
    { field: 'inStock', headerName: 'In Stock', flex: 1 },
    { field: 'measure', headerName: 'Measure', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={(event) => handleMenuOpen(event, params.row.id)}>
            Options
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl && selectedRowId === params.row.id)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleEdit(params.row)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text('Medicine Inventory', 10, 10);
    doc.autoTable({
      head: [['Name', 'Price (INR)', 'Status', 'In Stock', 'Measure']],
      body: medicines.map((med) => [med.name, med.price, med.status, med.inStock, med.measure]),
    });
    doc.save('inventory.pdf');
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { ...newMedicine, id: medicines.length + 1 }]);
    resetMedicine();
    handleClose();
  };

  const handleEdit = (row) => {
    setNewMedicine({ ...row });
    setEditOpen(true);
    handleMenuClose();
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
    handleMenuClose();
  };

  const handleEditClose = () => setEditOpen(false);

  const handleUpdateMedicine = () => {
    setMedicines(medicines.map((med) => (med.id === newMedicine.id ? { ...newMedicine } : med)));
    resetMedicine();
    handleEditClose();
  };

  const resetMedicine = () => {
    setNewMedicine({ id: '', name: '', price: '', status: 'Available', inStock: '', measure: '' });
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        bgcolor: "#BFDBFE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        color: "blue",
      }}
    >
      <Box
        sx={{
          height: "500",
          width: "70%",
          bgcolor: "#FFFFFF",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#0288D1", mb: 3 }}>
          Medicine Inventory
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            sx={{ mb: 2, mr: 2, backgroundColor: "#4FC3F7", color: "#FFFFFF" }}
            onClick={handleExport}
          >
            Export
          </Button>
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
            sx={{ mb: 2, width: "40%" }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ mb: 2, backgroundColor: "#4CAF50", color: "#FFFFFF" }}
          onClick={handleOpen}
        >
          ADD Drug
        </Button>

        <DataGrid
          rows={filteredMedicines}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            height: "80%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#0288D1",
              color: "black",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "#FFFFFF",
              color: "#0288D1",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#0288D1",
              color: "#FFFFFF",
            },
            border: "1px solid #0288D1",
            borderRadius: 2,
          }}
        />

        {/* Dialog for adding a new drug */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Drug</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={newMedicine.name}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={newMedicine.price}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, price: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="In Stock"
              type="number"
              fullWidth
              variant="standard"
              value={newMedicine.inStock}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, inStock: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Measure"
              type="text"
              fullWidth
              variant="standard"
              value={newMedicine.measure}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, measure: e.target.value })
              }
            />
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                onClick={handleAddMedicine}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Dialog for editing an existing drug */}
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Drug</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={newMedicine.name}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={newMedicine.price}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, price: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="In Stock"
              type="number"
              fullWidth
              variant="standard"
              value={newMedicine.inStock}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, inStock: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Measure"
              type="text"
              fullWidth
              variant="standard"
              value={newMedicine.measure}
              onChange={(e) =>
                setNewMedicine({ ...newMedicine, measure: e.target.value })
              }
            />
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button onClick={handleEditClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateMedicine}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryTable;
