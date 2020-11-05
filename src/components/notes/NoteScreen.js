import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
    const { active: note} = useSelector(state => state.notes);
    const [formValues, handlerInputChanges, reset] = useForm( note );
    const { body, title, id} = formValues;

    const dispatch = useDispatch();

    const activeId = useRef( note.id)
    useEffect(() => {
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
       dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handlerDelete = () => {
        dispatch(startDeleting( id))
    }
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                        type="text"
                        autoComplete="off"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        value={ title }
                        name="title"
                        onChange={ handlerInputChanges } />
                
                <textarea 
                        placeholder="What hapeend today ..."
                        className="note__textarea"
                        value={ body }
                        name="body"
                        onChange={ handlerInputChanges }
                >

                </textarea>
                {
                    (note.url)&& <div className="note__images">
                    <img src={note.url} alt="imagen" />
                </div>
                }
            </div>
            <button className="btn btn-danger"
                    onClick={ handlerDelete}>
                Delete
            </button>
        </div>
    )
}
