import React,{useState , useRef , useEffect} from 'react'
import { Button, FileInput, Label, TextInput , Dropdown } from "flowbite-react";
import { ADMINISTRATION_DEPARTMENT_DESIGNATIONS, DEPARTMENTS_LIST } from '../../mock-data/departments-list';
import { formatValueWithHyphens } from '../../utils/constants';
import { enrollNewStaff, updateStaffDetails } from '../../services/staff-enrollment-services';
import { toast } from 'sonner';
import StaffDetailsGrid from './staff-details-grid';

const StaffEnrollment = () => {
  const [staffInfo , setStaffInfo] = useState({});
  const [gender, setGender] = useState(staffInfo?.gender || "");
  const [section, setSection] = useState(staffInfo?.department || "");
  const [designation, setDesignation] = useState(staffInfo?.designation || "");
  const [aadhar, setAadhar] = useState("");
  const [editStaff , setEditStaff] = useState(false);
  const formRef = useRef(null);
  

  const resetFormState = () => {
    setGender("");
    setSection("");
    setDesignation("");
    setAadhar("");
    setStaffInfo({});
  };

  const handleStaffEnrollment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("gender", gender);
    formData.set("section", section);
    formData.set("designation", designation);
    formData.set("aadhar", aadhar);
    try{
      if(editStaff){
        formData.set('id',staffInfo.id);
        const response = await updateStaffDetails(formData);
        if(response.statusCode === 200){
          formRef.current.reset();
          resetFormState();
          setEditStaff(false);
          toast('Staff Details Modified Successfully');
        }else{
          toast('Fail') 
        };
      }else{
        const staffId = generateStaffId(formData.get('phoneNumber') , formData.get('aadhar'));
        formData.set('id',staffId);
        const response = await enrollNewStaff(formData);
        if(response.statusCode === 200){
          formRef.current.reset();
          resetFormState();
          toast('Staff Enrolled Successfully');
        }else{
          toast('Fail') 
        };
      };
    }catch(error){
      console.log(error);
    }
  };

  function generateStaffId(mobileNumber , aadhar) {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const staffId = `${mobileNumber}-${timestamp}-${randomString}-${aadhar}`;
    return btoa(staffId);
  }

  const handleAadharChange = (event) => {
    const formattedAadhar = formatValueWithHyphens(event.target.value);
    setAadhar(formattedAadhar);
  };

  useEffect(() => {
    setGender(staffInfo?.gender || "");
    setSection(staffInfo?.section || "");
    setDesignation(staffInfo?.designation || "");
    setAadhar(staffInfo?.aadhar || "");
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [staffInfo]);
  return (
    <div className=' w-full my-5'>
      <h1 className=' text-3xl font-bold text-center'>Manage Staff</h1>
      <form ref={formRef} onSubmit={handleStaffEnrollment} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
              <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Staff name"
              required
              defaultValue={staffInfo?.name || ""}
            />
          </div>
          <div className='flex items-center gap-5'>
            <div>
              <Label htmlFor="gender" value="Gender" />
              <div>
                <Dropdown
                  id="gender"
                  label={gender || "Select Gender"}
                  name="gender"
                >
                  <Dropdown.Item onClick={() => setGender("Male")}>
                    Male
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setGender("Female")}>
                    Female
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div>
              <Label htmlFor="section" value="Section" />
              <div>
                <Dropdown
                  id="section"
                  label={section || "Select Section"}
                  name="section"
                >
                  {
                    DEPARTMENTS_LIST.map((eachDept,index)=> <Dropdown.Item key={index} onClick={() => setSection(eachDept)}>
                    {eachDept}
                  </Dropdown.Item>)
                  }
                </Dropdown>
              </div>
            </div>
            <div>
              <Label htmlFor="designation" value="Designation" />
              <div>
                <Dropdown
                  id="designation"
                  label={designation || "Select Designation"}
                  name="designation"
                >
                  {
                    ADMINISTRATION_DEPARTMENT_DESIGNATIONS.map((eachDesignation , index)=> <Dropdown.Item key={index} onClick={() => setDesignation(eachDesignation)}>
                    {eachDesignation}
                  </Dropdown.Item>)
                  }
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
              <Label htmlFor="phone" value="Phone" />
            <TextInput
              id="phone"
              name="phoneNumber"
              type="mobile"
              placeholder="Phone Number"
              required
              defaultValue={staffInfo?.phoneNumber || ""}
            />
          </div>
          <div>
              <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              defaultValue={staffInfo?.email || ""}
            />
          </div>
          <div>
              <Label htmlFor="caste" value="Caste" />
            <TextInput
              id="caste"
              name="caste"
              type='text'
              placeholder="Caste"
              required
              defaultValue={staffInfo?.caste || ""}
            />
          </div>
          <div>
            <Label htmlFor="aadhar" value="Aadhar" />
            <TextInput
              id="aadhar"
              name="aadhar"
              type='text'
              placeholder="1234-5678-9012"
              required
              pattern="\d{4}-\d{4}-\d{4}"
              value={aadhar}
              onInvalid={(e) => e.target.setCustomValidity("Please enter Aadhaar in the format 1234-5678-9012")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={handleAadharChange}
            />
          </div>
          <div>
              <Label htmlFor="dob" value="DOB" />
            <TextInput
              id="dob"
              name="dob"
              type='date'
              required
              defaultValue={staffInfo?.dob || ""}
            />
          </div>
          <div>
              <Label htmlFor="doj" value="DOJ" />
            <TextInput
              id="doj"
              name="doj"
              type='date'
              required
              defaultValue={staffInfo?.doj || ""}
            />
          </div>
          {/* <div>
              <Label htmlFor="image" value="Upload file" />
            <FileInput id="image" name="image" />
          </div> */}
          <Button className=' self-end' type="submit">{editStaff ? 'Update Staff Info' : 'Add Staff Info'}</Button>
        </div>
      </form>
      <StaffDetailsGrid setStaffInfo={setStaffInfo} setEditStaff={setEditStaff} editStaff={editStaff} />
    </div>
  )
}

export default StaffEnrollment