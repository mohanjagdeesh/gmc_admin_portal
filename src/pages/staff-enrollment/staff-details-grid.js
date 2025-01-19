import React, { useEffect, useState } from 'react';
import { Table} from "flowbite-react";
import { deleteStaff, getStaffDetails } from '../../services/staff-enrollment-services';
import { toast } from 'sonner';
import ConfirmationBanner from '../../components/confirmation-banner';


const StaffDetailsGrid = ({setStaffInfo , setEditStaff , editStaff}) => {
    const [listOfStaffDetails , setListOfStaffDetails] = useState([]);
    const [deleteConfirmation , setDeleteConfirmation] = useState(false);
    const [staffIndex , setStaffIndex] = useState(null);
    useEffect(()=>{
        if(!editStaff && !deleteConfirmation){
            const fetchStaffList = async () => {
                try{
                    const response = await getStaffDetails();
                    setListOfStaffDetails(response.body);
                }catch(error){
                    console.log(error);
                };
            };
            fetchStaffList();
        }
    },[editStaff , deleteConfirmation]);

    const handleEditStaffDetails = (index) => {        
        setStaffInfo({...listOfStaffDetails[index]})
        setEditStaff(true);
    };

    const handleDeleteStaff = (index) => {
        setDeleteConfirmation(true);
        setStaffIndex(index);
    };

    const onDeleteConfirmation = async () => {
        const {id} = listOfStaffDetails[staffIndex];
        try{
            const response = await deleteStaff(id);
            if(response.statusCode === 200){
                setDeleteConfirmation(false);
                toast('Staff Deleted Successfully');
            }else{
                toast('Fail');
            };
        }catch(error){
            console.log(error);
        };
    };
  return (
    <div className="overflow-x-auto">
        <h1 className=' text-2xl font-bold text-center my-5'>Staff Details Grid</h1>
        <Table>
          <Table.Head>
            <Table.HeadCell>S.No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Designation</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          {listOfStaffDetails && listOfStaffDetails.length > 0 && <Table.Body className="divide-y">
            {listOfStaffDetails?.map((each, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{each.name}</Table.Cell>
                <Table.Cell>{each.designation}</Table.Cell>
                <Table.Cell>{each.email}</Table.Cell>
                <Table.Cell>{each.phoneNumber}</Table.Cell>
                <Table.Cell
                  onClick={() => handleEditStaffDetails(index)}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                >
                  Edit
                </Table.Cell>
                <Table.Cell
                  onClick={() => handleDeleteStaff(index)}
                  className="font-medium text-red-500 hover:underline dark:text-cyan-500 cursor-pointer"
                >
                  Delete
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>}
        </Table>
        {listOfStaffDetails && listOfStaffDetails.length === 0 && <h1 className=' text-2xl font-bold text-center text-red-500 mt-5'>No Existing Staff Details Here.</h1>}
        {deleteConfirmation && <ConfirmationBanner title='Are you sure you want to delete this staff member?' confButton='Delete' onCancel={()=>setDeleteConfirmation(false)} onConfirm={onDeleteConfirmation}/>}
      </div>
  )
}

export default StaffDetailsGrid