import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useFormik } from "formik"
import * as Yup from "yup";
import { useEffect } from 'react';
import { toast } from 'react-toastify';



function EditProfileDialog({ profileData }) {
    const { bio, url, profile__bg, imgUrl } = profileData
    const [newImgUrl, setNewImgUrl] = useState(imgUrl)
    // const [imgUrlValue, setimgUrlValue] = useState(null)
    const imageRef = useRef()

    const { setOpenEditProfile, editProfile, stockAvatarImageArray, bg__options } = useAuthContext();
    const editInitialValues = {
        bio: bio,
        url: url,
        profile__bg: profile__bg,

    }
    const setAvatarImage = (image) => {
        setNewImgUrl(image)
    }

    const changetoBase64 = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setNewImgUrl(reader.result)
        }
        reader.onerror = error => {
            toast.error("Image Upload unsuccessfull")
        }
    }


    const editProfileSchema = Yup.object({
        bio: Yup.string().max(256),
        url: Yup.string(),
        profile__bg: Yup.string()
    });
    const formik = useFormik({
        initialValues: editInitialValues,
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            const response = editProfile({ ...values, imgUrl: newImgUrl })
            if (response) {
                formik.resetForm()
                setOpenEditProfile(false)
                setNewImgUrl("")
            }

        },
        onReset: (values) => {
            setNewImgUrl(profileData.imgUrl)
        }
    })


    useEffect(() => {
        formik.resetForm();
        // eslint-disable-next-line
    }, [])




    return (
        <div className="absolute  rounded-lg top-0 left-0 w-full h-full z-10 backdrop-filter backdrop-blur-lg flex items-center justify-center">
            <button onClick={() => setOpenEditProfile(false)} className="absolute right-[2%] top-[3%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="edit__profile__box flex flex-col items-center justify-evenly h-full py-4 w-full ">

                <form
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                    className="flex rounded-lg overflow-y-auto text-xs overflow-x-hidden bg-white/60 px-8 2xl:text-sm py-4 gap-2 lg:py-3 flex-col items-stretch justify-between h-full w-[90%]  backdrop-filter backdrop-blur-md">

                    <div className="header shadow-lg shadow-slate-600 bg-black  rounded-lg ">
                        <h1 className="text-2xl text-white  px-4 py-2">Edit Profile</h1>
                    </div>
                    <div className="form_control justify-between  grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="bio" className="font-semibold">Edit Bio</label>
                        <textarea
                            className="w-full h-[3rem]  caret-pink-500 disabled:bg-#0000003d  bg-transparent border-current border-t-0 border-l-0 border-r-0 border-b col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bio}
                            maxLength={256}
                            type="textarea"
                            name="bio"
                            id="bio" ></textarea>
                        {formik.errors.bio && formik.touched.bio ? <p className="text-red-700 text-xs font-bold">{formik.errors.bio}</p> : null}
                    </div>
                    <div className="form_control justify-between grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="url" className="font-semibold">Link</label>
                        <input
                            className="w-full h-[2.1875rem]  caret-pink-500 disabled:bg-#0000003d bg-transparent border-current border-t-0 border-l-0 border-r-0 border-b  col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.url}
                            type="url"
                            name="url"
                            id="url" />
                        {formik.errors.url && formik.touched.url ? <p className="text-red-700 text-xs font-bold">{formik.errors.url}</p> : null}
                    </div>

                    <div className="form_control justify-between grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="profile__bg" className="font-semibold">Background</label>
                        <select
                            className=" font-sm rounded capitalize active:border-none bg-transparent border-none  caret-pink-500 disabled:bg-#0000003d col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.profile__bg}
                            type="profile__bg"
                            name="profile__bg"
                            id="profile__bg"
                        >
                            <option disabled value="" className="bg-slate-200 text-slate-500 ">Please Choose a Background</option>
                            {bg__options.map((option, index) => {
                                return <option
                                    value={option.name}
                                    className={`text-sm capitalize ${profileData.profile__bg === option.name ? "bg-slate-500/40" : "bg-white/40"}`}
                                    key={index}>
                                    {option.name}
                                    {/* <img src={option.url} alt={option.name} /> */}
                                </option>
                            })}
                        </select>
                        {formik.errors.url && formik.touched.url ? <p className="text-red-700 text-xs font-bold">{formik.errors.url}</p> : null}
                    </div>

                    <div className="form_control justify-between grid grid-cols-1 items-center gap-1">
                        <label htmlFor="imgUrl" className="font-semibold">Update Profile Picture</label>
                        <ul className="imagesContainer__editProfile scroll-smooth scroll-m-5 py-2 relative grid grid-cols-7 overflow-x-scroll justify-start gap-[7.2rem] overflow-y-hidden rounded">
                            <li
                                onClick={() => imageRef.current.click()}
                                className="h-[7rem] text-white  hover:font-bold w-[7rem] cursor-pointer relative border-slate-600 border-dashed border rounded-lg  bg-black/20 px-3 pt-3 pb-5">
                                <img src={newImgUrl}
                                    className="h-full w-full object-cover object-center rounded-lg" alt="newly added" />
                                <p className="text-[0.6rem] bottom-0  left-0 w-full uppercase text-center absolute ">Upload Picture</p>
                            </li>
                            <li className="flex items-center justify-center w-[7rem] snap-end">
                                <p className="w-full text-center font-bold drop-shadow-md">OR</p>
                            </li>
                            {stockAvatarImageArray.map((image, index) => {
                                return (
                                    <li
                                        onClick={() => setAvatarImage(image)}
                                        key={index}
                                        className={`${newImgUrl === image ? "border-teal-500 border-2" : "border-slate-600 border"} 
                                                relative cursor-pointer h-[7rem]  w-[7rem] border-slate-600  border-soild rounded-lg
                                                 ${index % 2 === 0 ? " snap-end" : ""}   bg-black/20 p-3`}>
                                        <img
                                            loading='lazy'
                                            src={image}
                                            className="h-full object-cover object-center rounded-lg"
                                            alt={index} />
                                    </li>)
                            })}
                        </ul>

                        <input onChange={(event) =>
                            changetoBase64(event)}
                            ref={imageRef}
                            accept="image/*"
                            className=" hidden text-[#A0616A] pointer-events-none"
                            type="file"
                            name="imgUrl"
                            id="imgUrl" />
                        {/* {newImgUrl !== imgUrl ? <img src={newImgUrl} className="max-h-8 max-w-8" alt="profile" /> : ""} */}
                    </div>
                    <footer className="profile__edit__footer flex gap-4 mt-4 items-center justify-center">
                        <button
                            type="submit"
                            className=" bg-[#FFB8B8] hover:bg-[#f0afaf] text-xs rounded transition-all text-white font-bold   hover:scale-105 shadow-lg shadow-[#FFB8B8CC] px-3 py-2 w-[8rem]">
                            Save Changes
                        </button>
                        <button
                            className=" bg-red-600 hover:bg-red-700 text-xs rounded transition-all text-white font-bold   hover:scale-105 shadow-lg shadow-red-500 px-3 py-2 w-[8rem]"
                            type="reset">Reset</button>
                        <div className="spacer flex-grow"></div>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default EditProfileDialog