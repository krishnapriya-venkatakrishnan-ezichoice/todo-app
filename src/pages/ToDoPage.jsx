import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ToDoPage = () => {
  const { supabase, session, signOut } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setAdding(true);
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        task_name: newTitle,
        is_complete: false,
        user_id: profile.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error.message);
    } else {
      setTasks(prev => [...prev, data]);
      setShowDialog(false);
      setNewTitle('');
    }
    setAdding(false);
  };

  const handleChange = async (event, id) => {
    setStatusUpdating(id);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, is_complete: event.target.value === 'complete' }
          : task
      )
    );
    const isComplete = event.target.value === 'complete';
    const { error } = await supabase
      .from('tasks')
      .update({ is_complete: isComplete })
      .eq('id', id);
    if (error) {
      console.error('Error updating task status:', error.message);
    }
    setStatusUpdating(null);
  };

  const handleDeleteTask = async (id) => {
    setDeleting(id);
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
    setDeleting(null);
  };

  useEffect(()=> {
    if (!session) return;
    const fetchProfile = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
      } else {
        setProfile(profileData);
      }
    };
    fetchProfile();

    const fetchTasks = async () => {
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id);

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError.message);
      } else {
        setTasks(tasksData);
      }
    }
    fetchTasks();
  }, [session, supabase]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch(error) {
      console.error('Sign out failed:', error.message);
    }
  };

  if (!profile) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 4}}>
        <CircularProgress />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Loading tasks...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Hi, {profile?.username}
        </Typography>
        <Tooltip title="Sign Out">
          <IconButton color="error" onClick={handleSignOut}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#43a047',
            '&:hover': { backgroundColor: '#2e7031' }
          }}
          onClick={() => setShowDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      {/* Add Task Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Task</DialogTitle>
        <form onSubmit={handleAddTask}>
          <DialogContent>
            <TextField
              label="Task"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              fullWidth
              required
              autoFocus
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={adding}
              sx={{
                backgroundColor: '#43a047',
                '&:hover': { backgroundColor: '#2e7031' }
              }}
            >
              {adding ? "Adding..." : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Grid container spacing={3}>
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: task.is_complete ? '#43a047' : 'grey.300',
                  backgroundColor: task.is_complete ? '#e8f5e9' : 'background.paper',
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: task.is_complete ? 'line-through' : 'none',
                      color: task.is_complete ? '#43a047' : 'text.primary'
                    }}
                  >
                    {task.task_name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id={`status-label-${task.id}`}>Status</InputLabel>
                    <Select
                      labelId={`status-label-${task.id}`}
                      value={task.is_complete ? "complete" : "pending"}
                      label="Status"
                      onChange={event => handleChange(event, task.id)}
                      disabled={statusUpdating === task.id}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="complete">Complete</MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title="Delete Task">
                    <span>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deleting === task.id}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No tasks yet. Click "Add Task" to create your first to-do!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ToDoPage;