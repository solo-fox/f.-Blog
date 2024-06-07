import styled from "styled-components";
import { useAuth } from '@/context/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { simplePrompt, SimpleDialogContainer } from 'react-simple-dialogs';
import { deleteUserDocument } from "@/db/account";

export default function SettingsAuth() {
  const { user, changeEmail , logOut, sendResetPassword, deleteAccount } = useAuth();
  const [email, setEmail] = useState(user.email);
  const router = useRouter();
  
  const handleChangeEmail = async () => {
    if (!user.emailVerified) {
      toast("Please verify your Email first!", { type: 'error' });
      return;
    }
    try {
      const result = await changeEmail(email);
      toast("Email sended! Check Spam Folder, too!", { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Cannot change Users Email", { type: 'error' });
    }
  }
  
  const handleChangePassword = async () => {
    if (!user.emailVerified) {
      toast("Please verify your Email first!", { type: 'error' });
      return;
    }
    try {
      await sendResetPassword();
      toast("Email sended! Check Spam Folder, too!", { type: "success" });
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast("Cannot reset Password!", { type: 'error' });
    }
  }
  
  const handleDeleteData = async () => {
    try {
      const name = await simplePrompt('Please inform your request by typing: "delete my account"');
      if (name !== "delete my account") {
        toast("Incorrect request!", { type: "error" });
        return;
      }
      await deleteUserDocument(user.uid);
      await deleteAccount();
      toast("User deleted!", { type: "success" });
      await logOut();
      router.push("/register");
    } catch (error) {
      console.log(error);
      toast("Cannot perform bulk Delete!", { type: 'error' });
    }
  }
  
  return (
    <Section>
      <ToastContainer />
      <SimpleDialogContainer primaryColor={"red"} />
      <h2>Change Email</h2>
      <InputGroup>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        {user.emailVerified ? (<p>Verified</p>) : (<p>Unverified</p>)}
      </InputGroup>
      <button
        type="submit" 
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px]"
        onClick={handleChangeEmail}
      >Change Email</button>
      <h2>Reset Password</h2>
      <button
        type="submit" 
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px]"
        onClick={handleChangePassword}
      >Reset Password</button>
      <h2>Wipe Data</h2>
      <button
        type="submit" 
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[150px]"
        onClick={handleDeleteData}
      >!!Delete All Data!!</button>
    </Section>
  );
}

const Section = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  input {
    background: transparent;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px lightgray solid;
    width: 50%;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; 
`;
