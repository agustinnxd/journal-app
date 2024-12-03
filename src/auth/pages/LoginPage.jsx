import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(formData);

  const isChecking = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn())

    console.log('onGoogleSignIn');

  }

  return (
    <AuthLayout title='Login'>
      <form  aria-label='submit-form' onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>

        <Grid2 container>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 1 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              name='email'
              value={email}
              onChange={onInputChange}
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 1 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid2>

          <Grid2
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}
          >
            <Grid2

              size={{ xs: 12 }}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2} sx={{ mb: 2, mt: 1 }} size={{ xs: 12 }}>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                disabled={isChecking}
                type='submit'
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                disabled={isChecking}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                aria-label='google-btn'
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid2>

          </Grid2>

          <Grid2 container direction='row'>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid2>

        </Grid2>

      </form>
    </AuthLayout>
  )
}
