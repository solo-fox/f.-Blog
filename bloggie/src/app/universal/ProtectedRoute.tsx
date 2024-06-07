'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Notice from '@/universal/Notice';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ children
}: { children: React.ReactNode}) {
	const router = useRouter();
	const [message, setMessage] = useState("Verify Your Email to Gain Full Access! Click To resend.");
	const { user, sendVerificationEmail} = useAuth();

	useEffect(() => {
	  if(user.finishedValidating){
		  if (user.uid == null) {
			  router.push("/login");
		  } 
	  }
	}, [user]);
	
	const handleEmailVerification = async () => {
	  try {
	    await sendVerificationEmail();
	    setMessage("Sended successfully!")
	    
	  } catch (error) {
	    console.log(error)
	    setMessage("Sending verification failed! Please try later.")
	  }
	}
	return(
	  <>
	    {!user.emailVerified && (<Notice message={message} handleEmailVerification={handleEmailVerification}/>)}
	    {user ? children : null}
	  </>
	);
};