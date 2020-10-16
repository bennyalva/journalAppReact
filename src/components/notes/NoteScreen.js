import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                        type="text"
                        autoComplete="off"
                        placeholder="Some awesome title"
                        className="notes__title-input" />
                
                <textarea 
                        placeholder="What hapeend today ..."
                        className="note__textarea"
                >

                </textarea>
                <div className="note__images">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaOywP-EkwkyoJK77xvvr_AFq-3-rwXU50cQ&usqp=CAU" alt="imagen" />


                </div>
            </div>
        </div>
    )
}
