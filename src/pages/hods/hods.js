import React, { useState } from 'react';
import { Button, FileInput, Label, TextInput, Table } from "flowbite-react";
import { LIST_OF_HODS_MOCK_DATA } from '../../mock-data/hods-mock-data';

const Hods = () => {
  const [listOfHods, setListOfHods] = useState(LIST_OF_HODS_MOCK_DATA);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  console.log(editData);
  

  const handleEdit = (index) => {
    setEditData({ ...listOfHods[index], index });
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const updatedList = listOfHods.filter((_, i) => i !== index);
    setListOfHods(updatedList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      image: formData.get("image"), // Handle file if necessary
    };

    console.log(data);
    

    if (isEditing) {
      const updatedList = [...listOfHods];
      updatedList[editData.index] = data;
      setListOfHods(updatedList);
      setIsEditing(false);
      setEditData(null);
    } else {
      setListOfHods([...listOfHods, data]);
    }
  };

  return (
    <div className="w-full">
      <h1 className=' text-3xl font-bold text-center'>Municipal Commission Head Of The Departments</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
              <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Your name"
              required
              defaultValue={editData?.name || ""}
            />
          </div>
          <div>
              <Label htmlFor="mobile" value="Mobile" />
            <TextInput
              id="mobile"
              name="mobile"
              type="mobile"
              required
              defaultValue={editData?.mobile || ""}
            />
          </div>
          <div>
              <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              defaultValue={editData?.email || ""}
            />
          </div>
          <div>
              <Label htmlFor="image" value="Upload file" />
            <FileInput id="image" name="image" />
          </div>
        </div>
        <Button type="submit">{isEditing ? "Update" : "Submit"}</Button>
      </form>
      <div className="overflow-x-auto">
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
          <Table.Body className="divide-y">
            {listOfHods.map((each, index) => (
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
                <Table.Cell>{each.mobile}</Table.Cell>
                <Table.Cell
                  onClick={() => handleEdit(index)}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                >
                  Edit
                </Table.Cell>
                <Table.Cell
                  onClick={() => handleDelete(index)}
                  className="font-medium text-red-500 hover:underline dark:text-cyan-500 cursor-pointer"
                >
                  Delete
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Hods;
