import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiInbox, HiShoppingBag, HiTable } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { GiOrganigram } from "react-icons/gi";

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example"
    className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/staff-enrollment" icon={FaUserFriends}>
            Staff Enrollment
          </Sidebar.Item>
          <Sidebar.Item href="/mc-corner" icon={HiInbox}>
            MC-Corner
          </Sidebar.Item>
          <Sidebar.Item href="/gmc-body" icon={GiOrganigram}>
            GMC-Body
          </Sidebar.Item>
          <Sidebar.Item href="/hods" icon={HiShoppingBag}>
            GMC-HODs
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SideBar;