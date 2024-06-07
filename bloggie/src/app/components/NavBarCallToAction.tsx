import { useRouter } from "next/navigation";
import Link from "next/link";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { CiPen, CiSettings } from "react-icons/ci";

export default function NavBarCallToAction({ photo, logOutFn }) {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const logOutUser = await logOutFn();
      router.push("/login");
    } catch (error) {
      toast("Cannot log User out!", { type: "error" });
    }
  };

  return (
    <CallToAction>
      <ToastContainer />
      <DropdownMenu.Root className="z-10">
        <DropdownMenu.Trigger asChild>
          <PrfoileScetion>
            <button className="overflow-hidden rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-[#cd5334ff] bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black" aria-label="Customise options">
              {photo && (<img src={`${photo}`} />) }
              {!photo && (<CgProfile />)}
            </button>
          </PrfoileScetion>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" sideOffset={5}>
            <DropdownMenu.Item className="group gap-[0.5rem] text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-[#cd5334ff] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#cd5334ff] data-[highlighted]:text-violet1">
              <CiPen />
              <Link href="/blog/create">New Blog</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group gap-[0.5rem] text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-[#cd5334ff] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#cd5334ff] data-[highlighted]:text-violet1">
              <CgProfile />
              <Link href="/dashboard">Profile</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group gap-[0.5rem] text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-[#cd5334ff] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#cd5334ff] data-[highlighted]:text-violet1">
              <CiSettings />
              <Link href="/settings">Settings</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[1px] bg-[#cd5334ff] m-[5px]" />
            <DropdownMenu.Item className="group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <button onClick={handleLogOut} className="bg-red-800 text-white p-[0.5rem] rounded">Sign Out</button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </CallToAction>
  );
}

const PrfoileScetion = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
`;

const CallToAction = styled.div`
  flex-grow:1;
  display:flex;
  justify-content:flex-end;
  z-index:4;
`;