import React, { useState } from 'react';
import { DeleteButton, EditButton, ErrorText, Form, Label, Table, Td, Th, Title, Tr } from '../StyledComponents/WebBrainsMedia.Styled';

const User = () => {
    const [userActions, setUserActions] = useState({
        isLoading: false,
        subjects: [{ id: 0, subjectName: '', topic: '', note: '', }],

        error: null
    })
    const [updateSubject, setUpdateSubject] = useState({
        updateSubjectName: '',
        updatedTopic: '',
        updatedNote: ''
    })
    const [edit, setEdit] = useState(false)
    const handleUpdate = (id) => {
        console.log(id)
    }

    const handleCreateBook = (e) => {
        e.preventDefault()
        const subject = e.target.book.value
        if (!subject) {
            setUserActions({
                ...userActions,
                error: 'please type book name!'
            })
            return
        }
        const exists = userActions.subjects.find(sub => sub.subjectName === subject)

        if (exists) {
            setUserActions({
                ...userActions,
                error: `your ${exists.subjectName} book is already exists!`
            })
            return
        }

        setUserActions({
            ...userActions,
            subjects: [...userActions.subjects, { id: userActions.subjects.length + 1, subjectName: subject, topic: 'topic', note: 'note' }],
            error: null


        })


    }
    console.log(userActions.subjects)
    return (
        <section>
            <Title>Student actions</Title>

            <Form onSubmit={handleCreateBook}>

                <div>
                    <Label htmlFor="createBook">Create book--</Label>
                    <input type="text" name='book' />
                    <button>Add book</button>
                    <ErrorText>{userActions.error}</ErrorText>

                </div>
            </Form>
            <Table>
                <thead>
                    <Tr>
                        <Th>
                            Subjects
                        </Th>
                        <Th>
                            {edit ? 'Actions' : 'Action'}
                        </Th>
                    </Tr>
                </thead>
                <tbody>
                    {
                        userActions.subjects.map((subject, index) => {
                            if (subject.subjectName) {
                                return <Tr key={index}>
                                    <Td>
                                        <div style={{ paddingLeft: '20px' }}>
                                            <li >
                                                <input style={{ border: 'none', fontWeight: 'bold', fontSize: '16px', }} onChange={(e) => setUpdateSubject({ ...updateSubject, updateSubjectName: e.target.text })} placeholder={subject.subjectName} />
                                            </li>
                                            <input name='topic' onChange={(e) => setUpdateSubject({ ...updateSubject, updatedTopic: e.target.value })} style={{ display: 'block', marginTop: '10px', width: '20%' }} type="text" placeholder='topic' />
                                            <textarea name='note' onChange={(e) => setUpdateSubject({ ...updateSubject, updatedNote: e.target.value })} placeholder='note' id="" cols="10" style={{ display: 'block', width: '30%', resize: 'none', marginTop: '2px' }}></textarea>
                                            <button onClick={() => handleUpdate(subject.id)} style={{ display: 'block', width: '20%', margin: 'auto' }}>Update All</button>
                                        </div>
                                    </Td>
                                    <Td style={{ textAlign: 'center' }}>
                                        {edit && <EditButton>Edit</EditButton>}
                                        <DeleteButton>Delete</DeleteButton>
                                    </Td>
                                </Tr>
                            }


                        })
                    }
                </tbody>
            </Table>


        </section>
    );
};

export default User;