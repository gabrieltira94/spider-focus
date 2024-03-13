import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { number, object, ref, string } from "yup";
import { Form, Formik, FormikHelpers } from "formik";

import { useTasksContext } from "@/app/hooks/TasksContext";
import { Task } from "@/app/dto/task.dto";
import { StyledCreateTaskContainer } from "@/app/styling/tasks/StyledCreateTaskContainer";
import NumberInputArrows from "@/app/components/NumberInputArrows";
import { uniqueId } from "@/app/utils/listHelper";
import { useTimerContext } from "@/app/hooks/TimerContext";

interface Props {
  task?: Task;
  onAction: () => void;
}

interface DefaultValues {
  title: string;
  pomodoros: number;
  pomodorosDone: number;
}

const validationSchema = object({
  title: string().required('You need to provide a title').min(1).max(50),
  pomodoros: number().typeError('This has to be a number').required().positive().integer().min(1).max(99, 'Let\'s be honest, 99 is more than enough'),
  pomodorosDone: number().typeError('This has to be a number').max(ref('pomodoros'), 'Should be lower than Total Pomodoros')
});

const defaultValues: DefaultValues = {
  title: '',
  pomodoros: 1,
  pomodorosDone: 0,
};

export default function CreateTask(props: Props) {
  const { onAction, task } = props;
  const { isActive, setIsActive } = useTimerContext();
  const { createTask, updateTask, handleRemoveTask, tasks } = useTasksContext();
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (task)
      setInitialValues(task);

    removeShortcut();

    return () => { addShortcut(); };
  }, []);

  const removeShortcut = () => {
    window.document.body.onkeyup = function (e) {
      if (e.key == " " || e.code == "Space")
        return;
    };

    window.document.body.onkeydown = function (e) {
      if (e.key == " " || e.code == "Space")
        return;
    };
  };

  const addShortcut = () => {
    window.document.body.onkeyup = function (e) {
      if (e.key == " " || e.code == "Space")
        setIsActive(!isActive);
    };

    window.document.body.onkeydown = function (e) {
      if (e.key == " " || e.code == "Space")
        e.preventDefault();
    };
  };

  const handleSubmit = (values: DefaultValues, helpers: FormikHelpers<DefaultValues>) => {
    const { title } = values;
    const pomodoros = Number(values.pomodoros);
    const pomodorosDone = Number(values.pomodorosDone);

    if (task) {
      updateTask(task.id, { title, pomodoros, pomodorosDone });
    }
    else {
      const id = `${uniqueId()}-${title}`;
      const position = tasks.length;
      const newTask: Task = { id, title, pomodoros, isDone: false, pomodorosDone: 0, position, isHidden: false };

      createTask(newTask);
    }

    onAction();
  };

  return (
    <StyledCreateTaskContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) =>
          <Form>
            <Grid container p={2}>
              <Grid item xs={12} display='flex' justifyContent='center'>
                <TextField
                  name='title'
                  label='Title'
                  InputLabelProps={{ sx: { fontSize: 20 } }}
                  placeholder="What are you working on?"
                  value={values.title}
                  required
                  sx={{ width: '80%' }}
                  error={Boolean(touched && errors.title)}
                  helperText={touched.title && errors.title}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>

              {task &&
                <Grid item xs={12} display='flex' alignItems='center' justifyContent='center' my={2}>
                  <TextField
                    name='pomodorosDone'
                    label='Done Pomo'
                    InputLabelProps={{ sx: { fontSize: 20 } }}
                    value={values.pomodorosDone}
                    required
                    error={Boolean(touched.pomodorosDone && errors.pomodorosDone)}
                    helperText={touched.pomodorosDone && errors.pomodorosDone}
                    variant="filled"
                    onChange={handleChange}
                  />
                  <NumberInputArrows
                    value={values.pomodorosDone}
                    field="pomodorosDone"
                    setFieldValue={setFieldValue}
                  />
                </Grid>
              }

              <Grid item xs={12} display='flex' alignItems='center' my={1} justifyContent='center'>
                <TextField
                  name='pomodoros'
                  label='Total Pomo'
                  InputLabelProps={{ sx: { fontSize: 20 } }}
                  value={values.pomodoros}
                  required
                  error={Boolean(touched.pomodoros && errors.pomodoros)}
                  helperText={touched.pomodoros && errors.pomodoros}
                  variant="filled"
                  onChange={handleChange}
                />
                <NumberInputArrows
                  value={values.pomodoros}
                  field="pomodoros"
                  setFieldValue={setFieldValue}
                />
              </Grid>

              <Grid item xs={12} display='flex' justifyContent='flex-end' mt={0.5}>
                <Button sx={{ m: 0.3 }} size="small" color="warning" onClick={() => onAction()}>
                  Cancel
                </Button>
                {task &&
                  <Button sx={{ m: 0.3 }} size="small" color="error" onClick={() => handleRemoveTask(task.id)}>
                    Delete
                  </Button>
                }
                <Button sx={{ m: 0.3 }} variant="contained" size="small" color="success" type="submit">
                  {task ? 'Update' : 'Create'}
                </Button>

              </Grid>
            </Grid>
          </Form>
        }
      </Formik>
    </StyledCreateTaskContainer >
  );
}