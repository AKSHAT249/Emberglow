import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {preview} from "../assets";
import {getRandomPrompt} from "../utils";
import {FormField, Loader} from "../components";
import axios from "axios";

const CreatePost = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name:'',
        prompt:'',
        photo:''
    });

    const [generatingImg, setGeneratingImg] = useState(false);

    const [loading, setLoading] = useState(false);

    const generateImage = async () => {


        if(form.prompt && form.name && form.photo ){
            try{
                setGeneratingImg(true);
                const response = await axios.post("http://localhost:8080/api/v1/post", form);
                // console.log("response", response);
                navigate("/");

            }catch(error){
                alert(error)

            }finally{
                setGeneratingImg(false);
            }
        }else{
            alert("Fill form fields.")
        }

    }

    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
        console.log(form)

    }

    const handleSupriseMe = (e) => {
        console.log('ved')
        e.preventDefault();
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt:randomPrompt});


    }
    console.log(form);


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => 
        {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log("file",file)
        const base64 = await convertToBase64(file);
        // console.log(base64);
        setForm({...form, photo:base64});
    };


    const clearImage = () => {
        setForm({
            name:'',
            prompt:'',
            photo:''
        })
    }


    


  return (
    <section className="max-w-7xl mx-auto">
        <div>
            <h1 className="font-extrabold   text-[#222328] text-[32px]">Create</h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">Store imaginative
            and visually stunning images , memories and share them with the loved ones. </p>
        </div>

        <form className="mt-16 max-w-3xl" >
            <div className="flex flex-col gap-5">
                <FormField 
                    labelName="Your name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    handleChange={handleChange}

                />

                <FormField 
                    labelName="Prompt"
                    type="text"
                    name="prompt"
                    placeholder="Unexpected Snow Day"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSupriseMe
                    handleSupriseMe={handleSupriseMe}
                    
                />

                <label htmlFor='photo' id="photo">Upoad</label>
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                    
                    {
                        form.photo ? (
                            <img 
                                id="photo"
                                src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain "
                            />
                        ): (
                            
                            
                            <input 
                                id="photo" 
                                label="Image"
                                name="photo"
                                className="absolute ml-20 flex  justify-center items-center"
                                accept=".jpeg, .png, .jpg"
                                type="file"
                                value={form.photo}
                                onChange={(e) => handleUpload(e)}  
                                variant="outlined" 
                            /> 

                            

                           

                            

                        )
                    }

                    {
                        generatingImg && (
                            <div className="absolute flex justify-center items-center inset-0 z-0 bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )
                    }
                    
                </div>



            </div>
            <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        // onClick={(e) => handleUpload(e)} 
                        className="text-white  bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {
                            generatingImg ? 'Uploading...' :' Share with the community'  
                        }
                    </button>

                    <button
                        type="button"
                        onClick={clearImage}
                        className="text-white bg-red-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Clear
                    </button>

                    

            </div>

            <div className="mt-10">
                <p className="mt-2 text-[#666e75] text-[14px] text-sm "> Once you have submit the memory it will add in the community which reminds of your best memories so far
                </p>
                <p className="mt-2 text-[#666e75] text-[14px] text-sm ">  ©  AKSHAT SAXENA  ️ ♥️ </p>
                

            </div>

            

        </form>
        

    </section>
  )
}

export default CreatePost