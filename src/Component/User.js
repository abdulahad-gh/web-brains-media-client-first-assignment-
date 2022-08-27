import React, { useState } from 'react';
import { ErrorText, Form, Label, Title } from '../StyledComponents/WebBrainsMedia.Styled';

const User = () => {
    const [userActions, setUserActions] = useState({
        isLoading: false,
        subjects: [],
        topics: [],
        notes: [],
        error: null
    })

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
        const exists = userActions.subjects.find(sub => sub === subject)
        if (exists) {
            setUserActions({
                ...userActions,
                error: `your ${exists} book is already exists!`
            })
            return
        }

        setUserActions({
            ...userActions,
            subjects: [...userActions.subjects, subject],
            error: null


        })


    }
    // console.log(userActions.subjects)
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


        </section>
    );
};

export default User;