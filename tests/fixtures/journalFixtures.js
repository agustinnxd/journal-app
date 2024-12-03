export const initialState = {
    isSaving: false,
    savedMessage: '',
    notes: [],
    active: null,
};

export const demoEmptyNote = {
    title: '',
    body: '',
    date: '12345',
    id: 'ABC123'
};

export const demoNote = {
    title: 'Hola mundo',
    body: 'este es un body',
    date: '12345',
    id: 'ABC123'
}

export const demoNotes = [
    {
        title: 'Hola mundo',
        body: 'este es un body',
        date: '12345',
        id: 'ABC123'
    },
    {
        title: 'Hello World',
        body: 'this is a body',
        date: '123456',
        id: 'ABCD1234'
    }
]

export const demoState = {
    isSaving: true,
    savedMessage: 'Hola mundo',
    notes: demoNotes,
    active: demoNote
}
