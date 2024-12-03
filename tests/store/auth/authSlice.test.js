import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('debe regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState)
    });

    test('debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null

        })
    });

    test('debe realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual(notAuthenticatedState)
    })

    test('debe realizar el logout y mostrar mensaje de error', () => {
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: 'las credenciales no son correctas'}));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'las credenciales no son correctas'
        })
    });

    test('debe cambiar el estado a "checking"', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')
        
        
    })
})