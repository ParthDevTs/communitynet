import React, { useEffect, useRef, useState } from 'react'
import { usePostContext } from '../context/postContext'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from "yup";
import EmojiPicker from 'emoji-picker-react';

function AddNewPost() {

    const { setShowNewPost, addNewPost, editPost, postforEditing, setPostForEditing, addNewPostMode,
        setAddNewPostMode } = usePostContext();

    const imageRef = useRef()
    const closRef = useRef()
    const imageClickHandler = () => {
        imageRef.current.click()
    }
    const [newImgUrl, setNewImgUrl] = useState()
    const [showEmoji, setShowEmoji] = useState(false);

    const changetoBase64 = (e) => {

        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setNewImgUrl(reader.result)
            }
            reader.onerror = error => {
                toast.error(`Image Upload unsuccessfull: ${error}`)
            }
        }
    }

    const newPostInitialSchema = Yup.object({
        content: Yup.string().required("Caption is Mandatory"),

    });
    const newPostInitialValues = {
        content: ""
    }

    const editPostInitilValues = {
        content: postforEditing?.content
    }

    const formik = useFormik({
        initialValues: addNewPostMode === "EDIT__POST" ? editPostInitilValues : newPostInitialValues,
        validationSchema: newPostInitialSchema,
        onSubmit: (values) => {
            let postValues = {};
            let response = null
            newImgUrl ? postValues = { ...values, image: newImgUrl } : postValues = { ...values };
            if (addNewPostMode === "EDIT__POST") {
                response = editPost(postValues, postforEditing._id)
            } else if (addNewPostMode === "NEW__POST") {
                response = addNewPost(postValues)
            }

            if (response) {
                formik.resetForm()
                setShowNewPost(false)
                setNewImgUrl()
                setAddNewPostMode("NEW__POST")
                setPostForEditing()
            }

        },
        onReset: (values) => {
            if (addNewPostMode === "EDIT__POST") {
                setNewImgUrl(postforEditing?.image)
            } else if (addNewPostMode === "NEW__POST") {
                setNewImgUrl()
            }
        }
    })

    const handleClose = (event) => {
        event.stopPropagation()
        setShowNewPost(false)
        setNewImgUrl()
        setAddNewPostMode("EDIT__POST")
        setPostForEditing()
        formik.resetForm()
    }

    const onEmojiClick = (EmojiObject, event) => {
        formik.setValues({ content: formik.values.content + EmojiObject.emoji })
        setShowEmoji(false)
    }
    useEffect(() => {
        if (addNewPostMode === "EDIT__POST") {
            setNewImgUrl(postforEditing?.image)
        } else {
            setNewImgUrl(null)
        }
        // eslint-disable-next-lin
    }
        // eslint-disable-next-line
        , [])

    const handlerParentCLick = (event) => {
        closRef.current.click()
        event.stopPropagation()
    }
    return (
        <div onClick={handlerParentCLick} className="z-10 absolute  rounded-lg top-0 overflow-hidden left-0 w-full h-full backdrop-filter backdrop-blur-lg flex items-start py-[2rem] justify-center">
            <button ref={closRef} onClick={handleClose} className="absolute right-[2%] top-[3%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <form onClick={(e) => e.stopPropagation()} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="add__new__post__box w-[50rem] max-h-[80%] shadow-lg  bg-white flex flex-col items-center justify-center gap-[0.69rem] px-[1.44rem] py-[1.06rem]">

                    <textarea
                        type="textarea"
                        name="content"
                        id="content"
                        placeholder="Whats On Your Mind?"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                        maxLength={150}
                        className="whats__on__your__mind h-[5.125rem] w-[46.875rem] bg-[#f1f1f1] border-[transparent]" >

                    </textarea>
                    {formik.errors.content && formik.touched.content ? <p className="text-red-400 text-xs text-left  w-full">{formik.errors.content}</p> : null}

                    {newImgUrl &&
                        <img
                            className=" object-center object-contain lg:h-[20rem]  2xl:max-h-[540px] rounded-lg"
                            src={newImgUrl}
                            alt='new Post' />
                    }


                    <footer className="new__post__footer flex relative  items-center w-full gap-2" >
                        <div className="iconLIst rounded-[5px] bg-[#f1f1f1] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] h-[1.875rem] w-[5.0625rem] grid grid-cols-2 place-content-center">
                            <button
                                type="button"
                                onClick={imageClickHandler}
                                className="text-center grid place-content-center text-[#6C63FF] hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button onClick={() => setShowEmoji((prev) => !prev)} type="button" className="text-center grid place-content-center text-[#6C63FF] hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                </svg>
                            </button>
                            <input className="hidden" onChange={(event) => changetoBase64(event)} ref={imageRef} accept="image/*" type="file" name="" id="" />
                        </div>
                        {showEmoji && <div className="emoji__container absolute left-[50px] top-[70%]">
                            <EmojiPicker
                                searchDisabled={true}
                                skinTonesDisabled={true}
                                lazyLoadEmojis={true} onEmojiClick={onEmojiClick} height={250} width={300} />

                        </div>}
                        <div className="spacer flex-grow "></div>
                        <button
                            disabled={!formik.isValid}
                            type="submit"
                            className="button disabled:bg-slate-200 disabled:text-slate-300 disabled:shadow-none disabled:transition-none transition-all text-white capitalize text-cenbutton py-2  w-[8.4375rem]  shadow-md shadow-[#6C63FF] bg-[#6C63FF] hover:bg-[#514bc5]">
                            {addNewPostMode !== "EDIT__POST" ? "Post It!" : "Save Changes"}
                        </button>
                        <button
                            type="reset"
                            className="button transition-all text-white text-cenbutton py-2 w-[8.4375rem] bg-red-500 shadow-md shadow-red-400 hover:bg-red-600">
                            Reset
                        </button>
                    </footer>
                </div>
            </form>
        </div>
    )
}

export default AddNewPost