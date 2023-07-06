import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useFormik } from "formik"
import * as Yup from "yup";
import { useEffect } from 'react';



function EditProfileDialog({ profileData }) {
    const { bio, url, profile__bg } = profileData
    // const [imgUrlValue, setimgUrlValue] = useState(null)

    const { setOpenEditProfile, editProfile } = useAuthContext();
    const editInitialValues = {
        bio: bio,
        url: url,
        profile__bg: profile__bg
    }


    const editProfileSchema = Yup.object({
        bio: Yup.string(),
        url: Yup.string(),
        profile__bg: Yup.string()
    });
    const formik = useFormik({
        initialValues: editInitialValues,
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            const response = editProfile(values)
            if (response) {
                formik.resetForm()
                setOpenEditProfile(false)
            }
        }
    })


    useEffect(() => {
        formik.resetForm();
        // eslint-disable-next-line
    }, [])

    const bg__options = ["wave", "blob", "poly"]



    return (
        <div className="absolute  rounded-lg top-0 left-0 w-full h-full z-10 backdrop-filter backdrop-blur-lg flex items-center justify-center">
            <button onClick={() => setOpenEditProfile(false)} className="absolute right-[2%] top-[3%]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            <div className="edit__profile__box flex flex-col gap-4 items-center justify-evenly h-full py-6">
                <div className="header">
                    <h1 className="text-4xl text-white bg-black/20 px-4 py-2 rounded-lg">Edit Profile</h1>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                    className="flex rounded-lg overflow-y-auto overflow-x-hidden bg-white/40 px-8 text-sm py-6 gap-2 flex-col items-stretch justify-evenly h-full w-full backdrop-filter backdrop-blur-md">

                    <div className="form_control justify-between  grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="bio">Edit Bio</label>
                        <textarea
                            className="w-full h-[5rem]  caret-pink-500 disabled:bg-#0000003d border-black border-2 col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bio}
                            maxLength={150}
                            type="textarea"
                            name="bio"
                            id="bio" ></textarea>
                        {formik.errors.bio && formik.touched.bio ? <p className="text-red-700 text-xs font-bold">{formik.errors.bio}</p> : null}
                    </div>
                    <div className="form_control justify-between grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="url">Link</label>
                        <input
                            className="w-full h-[2.1875rem]  caret-pink-500 disabled:bg-#0000003d border-black border-2 col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.url}
                            type="url"
                            name="url"
                            id="url" />
                        {formik.errors.url && formik.touched.url ? <p className="text-red-700 text-xs font-bold">{formik.errors.url}</p> : null}
                    </div>

                    <div className="form_control justify-between grid grid-cols-4 items-center gap-4 ">
                        <label htmlFor="profile__bg">Profile Background</label>
                        <select
                            className="w-full  font-sm rounded capitalize  caret-pink-500 disabled:bg-#0000003d border-black border-2 col-span-3 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.profile__bg}
                            type="profile__bg"
                            name="profile__bg"
                            id="profile__bg"
                        >
                            <option disabled className="bg-slate-200 text-slate-300 tex-sm">Please Choose a Background</option>
                            {bg__options.map((option, index) => {
                                return <option value={option} className={` px-4 py-2 text-sm capitalize ${profileData.profile__bg === option ? "bg-slate-500/40" : "bg-white/40"}`} key={index}>{option}</option>
                            })}
                        </select>
                        {formik.errors.url && formik.touched.url ? <p className="text-red-700 text-xs font-bold">{formik.errors.url}</p> : null}
                    </div>

                    {/* <div className="form_control justify-between grid grid-cols-4 items-center ">
                        <label htmlFor="imgUrl">Add Image</label>
                        <input onChange={(event) => {
                            setimgUrlValue("file", event.currentTarget.files[0]);
                            formik.setFieldValue({
                                imgUrl: event.currentTarget.files[0],
                            })
                        }} onBlur={formik.handleBlur} value={formik.values.imgUrl} accept="image/*" className="col-span-3" type="file" name="imgUrl" id="imgUrl" />
                    </div> */}
                    <footer className="profile__edit__footer flex gap-4 items-center justify-center">
                        <button
                            type="submit"
                            className=" bg-[#FFB8B8] text-xs transition-transform text-white font-bold   hover:scale-105 shadow-[0px_10px_12px_-6px_#6c63FF] px-3 py-2 w-[8rem]">
                            Save Changes
                        </button>
                        <button
                            className=" bg-red-600 hover:bg-red-900 text-xs transition-transform text-white font-bold   hover:scale-105 shadow-[0px_10px_12px_-6px_#6c63FF] px-3 py-2 w-[8rem]"
                            type="reset">Reset</button>
                        <div className="spacer flex-grow"></div>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default EditProfileDialog