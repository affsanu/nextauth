'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name, email, password }),
    }

    await fetch("/api/register", options)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((error) => console.log(error.message));

  }

  return (
    <div className="flex justify-center pt-24 lg:pt-48 pb-6 lg:pb-24">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Create Account
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} label="Email" size="lg" />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" size="lg" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleLogin} variant="gradient" fullWidth>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link href="/login"
              className="ml-1 font-bold text-blue-600"
            >
              Sign in
            </Link>
          </Typography>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}