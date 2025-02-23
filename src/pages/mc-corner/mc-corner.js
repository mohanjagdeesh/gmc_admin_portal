import React, { useState } from 'react';
import { Button, FileInput , Label , TextInput} from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { addNewEvent } from '../../services/municipal-corporation-events';

const McCorner = () => {

  const [uploadedImages , setUploadedImages] = useState([]);

  const handleUploadedImages = (event) => {
    const images = Array.from(event.target.files);
    setUploadedImages(images);
  };

  const handleAddOrEditEvent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try{
      const response = await addNewEvent(formData,true);
      console.log(response);
    }catch(error){
      console.log(error);
    };
  };

  return (
    <div className='w-full'>
      <h1 className='text-center text-3xl font-bold my-5'>Municipal Commissioner Corner</h1>
      <form onSubmit={handleAddOrEditEvent}>
        <div className='grid grid-cols-2 items-center gap-5'>
        <div>
            <Label htmlFor="dateOfVisit" value="Date of Visit" />
            <TextInput
              id="dateOfVisit"
              name="dateOfVisit"
              type="date"
              placeholder="Date of Visit"
              required
            />
          </div>
          <div>
            <Label htmlFor="eventName" value="Event Name" />
            <TextInput
              id="eventName"
              name="eventName"
              type="text"
              placeholder="Event Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <TextInput
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              required
            />
          </div>
          <div className=' self-end'>
            <FileInput onChange={handleUploadedImages} id="images" name="eventImages" multiple />
          </div>
          <Button type="submit">Add Event</Button>
        </div>
      </form>
      <div className="mt-5">
        {uploadedImages && uploadedImages.length > 0 ? (
          <div className="flex items-center gap-4">
            {uploadedImages?.map((each, index) => {
              const deleteUploadedImages = (img) => {
                setUploadedImages(uploadedImages.filter((eachImg)=> eachImg.name !== img.name));
              }
              return(
                <div key={index} className="flex flex-col items-center relative">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(each)}
                    alt={each.name}
                    className="w-32 h-32 object-cover border rounded shadow"
                  />
                  <FaTrash onClick={()=>deleteUploadedImages(each)} className="absolute bottom-1 right-1 text-red-600 cursor-pointer bg-white rounded-full p-1" />
                </div>
                <p className="mt-2 text-center text-sm">{each.name}</p>
              </div>
              )           
            })}
          </div>
        ) : (
          <h1 className='text-center text-3xl font-bold text-red-300'>No Existing Images Here</h1>
        )}
      </div>
    </div>
  );
};

export default McCorner;
