import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { isValidElement, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Inserte un correo válido'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es requerido'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuth = useMemo(() => {
    status === 'checking'
  }, [status])

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) {
      return
    }

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Crear cuenta'>

      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>

        <Grid2 container>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 1 }}>
            <TextField
              label="Nombre completo"
              type='text'
              placeholder="Nombre completo"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 1 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 1 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              onChange={onInputChange}
              fullWidth
            />
          </Grid2>

          <Grid2 container spacing={2} sx={{ mb: 2, mt: 1 }} size={{ xs: 12 }}>

            <Grid2
              display={!!errorMessage ? '' : 'none'}
              size={{ xs: 12 }}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" fullWidth type='submit' disabled={isCheckingAuth}>
                Crear cuenta
              </Button>
            </Grid2>

          </Grid2>

          <Grid2 container direction='row'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid2>

        </Grid2>

      </form>
    </AuthLayout>
  )
}
