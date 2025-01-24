"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onCreateAccount = () => {
    if (!username || !email || !password) {
      console.error('All fields are required!');
      return;
    }

    GlobalApi.registerUser(username, email, password)
      .then((resp) => {
        console.log('User:', resp.data.user);
        console.log('JWT:', resp.data.jwt);
        localStorage.setItem("user", JSON.stringify(resp.data.user)); // Save user info in localStorage
        localStorage.setItem("jwt", resp.data.jwt); // Save JWT in localStorage
        toast('Account created successfully');
        router.push('/');
      }, (e) => {
        toast("Account exists");
      })
      .catch((error) => {
        console.error('Error creating account:', error);
      });
  };

  return (
    <div className="flex items-baseline justify-center">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" width={100} height={100} alt="pic" />
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!username || !email || !password}
            onClick={onCreateAccount}
          >
            Create
          </Button>
          <p>
            Already have an account?{' '}
            <Link className="text-blue-500" href={'/sign-in'}>
              Click Here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
