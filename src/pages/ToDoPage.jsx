import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

const temp = [
  {
    id: "1",
    title: 'Sample Task 1',
    description: 'This is a sample task description.',
    is_completed: false,
  },
  {
    id: "2",
    title: 'Sample Task 2',
    description: 'This is another sample task description.',
    is_completed: true,
  }
];

const ToDoPage = ({ handlePageChange }) => {

  const [data, setData] = React.useState(temp);

  const handleChange = (event, id) => {
    setData(prevData => {
      return prevData.map(task => {
        if (task.id === id) {
          return { ...task, is_completed: event.target.value === 'completed' };
        }
        return task;
      })
    });
  };

  return (
    <main>
      <div className='w-full flex items-end justify-between '>
        <div>

        </div>
        <div className='pr-4 pt-4'>
          <Button variant="contained"
          sx={{
            backgroundColor: '#43a047',
            '&:hover': { backgroundColor: '#2e7031' }
          }}
          onClick={() => handlePageChange('landing')}
          >Sign Out</Button>
        </div>
      </div>
      <section className='flex flex-col gap-8 px-4 py-8 max-w-3xl mx-auto'>
        {
          data.map(task => (
            <div key={task.id} className="flex border-b w-full justify-between">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className='flex  gap-2 w-[250px]'>
                <div className='flex-1'>
                  <Box sx={{ minWidth: 120}}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">Status</InputLabel>
                      <Select
                        labelId="select-label"
                        value={task.is_completed ? "completed" : "pending"}
                        label="Status"
                        onChange={(event) => handleChange(event, task.id)} // Pass task.id here
                        sx={{ maxHeight: 30 }}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <p>Delete</p>
              </div>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default ToDoPage