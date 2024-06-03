import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'tmr © '}
      <Link color="inherit" href="https://github.com/TamarVilner">
        tamar Vilner GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {

  const dis = useDispatch();
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors, dirtyFields, isValid }, getValues } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    const newUser = {
      tz: data.identityCard,
      name: data.name,
      password: data.password,
      telephone: data.telephone
    }

    dis(addUser(newUser)).unwrap().then(() => {
      nav('/Products');
    }).catch((error) => {
      console.error('Failed to add user:', error);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00FF66' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  {...register("name", { required: "זהו שדה חובה" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                {dirtyFields.name && <p>השם שונה</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="identityCard"
                  label="Identity Card"
                  name="identityCard"
                  autoComplete="identity-card"
                  {...register("identityCard", { 
                    required: "זהו שדה חובה", 
                    pattern: {
                      value: /^\d{9}$/,
                      message: "תעודת זהות חייבת להכיל בדיוק 9 ספרות"
                    }
                  })}
                />
                {errors.identityCard && <p>{errors.identityCard.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  {...register("password", { required: "זהו שדה חובה" })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telephone"
                  label="Telephone"
                  type="tel"
                  id="telephone"
                  autoComplete="new-phone"
                  {...register("telephone", {
                    required: "זהו שדה חובה",
                    minLength: {
                      value: 9,
                      message: "מספר טלפון חייב להיות באורך של לפחות 9 ספרות"
                    },
                    maxLength: {
                      value: 10,
                      message: "מספר טלפון חייב להיות באורך של עד 10 ספרות"
                    }
                  })}
                />
                {errors.telephone && <p>{errors.telephone.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: '#00FF66'}}
              disabled={!isValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
