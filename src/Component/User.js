import React, { useState } from 'react';
import { DeleteButton, EditButton, ErrorText, Form, Label, Table, Td, Th, Title, Tr } from '../StyledComponents/WebBrainsMedia.Styled';

const User = () => {
    const [userActions, setUserActions] = useState({
        isLoading: false,
        subjects: [{ id: 1, subjectName: '', topic: '', note: '', }],

        error: null
    })
    // console.log(userActions.subjects[0])
    const [updateSubject, setUpdateSubject] = useState({
        updateSubjectName: '',
        updatedTopic: '',
        updatedNote: ''
    })
    console.log(updateSubject.updatedTopic);

    const [edit, setEdit] = useState(false)
    const handleUpdate = (id, e) => {
        // const { updateSubjectName, updatedTopic, updatedNote } = updateSubject;
        e.preventDefault()
        const subject = e.target.subjectName.value;
        userActions.subjects[1] = subject
        userActions.subjects[2] = updateSubject.updatedTopic
        console.log('line 24', userActions.subjects)
        setEdit(true)


    }

    //handle delete
    const handleDelete = (id) => {
        const newSubjectContainer = userActions.subjects.filter(sub => sub.id !== id)
        setUserActions({ ...userActions, subjects: newSubjectContainer })
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
    return (
        <section>
            <Title>Student actions</Title>

            <Form onSubmit={handleCreateBook}>

                <div>
                    <Label htmlFor="createBook">--Create book--</Label>
                    <input type="text" name='book' onFocus={() => setUserActions({ ...userActions, error: '' })} />
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
                                        <form onSubmit={(e) => handleUpdate(subject.id, e)}>

                                            <div style={{ paddingLeft: '20px' }}>
                                                <li >
                                                    <input placeholder={subject.subjectName} name='subjectName' style={{ border: 'none', fontWeight: 'bold', fontSize: '16px', }} />
                                                </li>

                                                <p>
                                                    <input name='topic' onChange={(e) => setUpdateSubject({ ...updateSubject, updatedTopic: e.target.value })} style={{ marginTop: '10px', width: '20%' }} type="text" placeholder='topic' /> <span>{subject.topic}</span>
                                                </p>

                                                <textarea name='note' onChange={(e) => setUpdateSubject({ ...updateSubject, updatedNote: e.target.value })} placeholder='note' id="" cols="10" style={{ display: 'block', width: '30%', resize: 'none', marginTop: '2px' }}></textarea>

                                                <button style={{ display: 'block', width: '20%', margin: 'auto' }}>Update All</button>
                                            </div>
                                        </form>
                                    </Td>
                                    <Td style={{ textAlign: 'center' }}>
                                        {edit && <EditButton>Edit</EditButton>}
                                        <DeleteButton onClick={() => handleDelete(subject.id)}>Delete</DeleteButton>
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