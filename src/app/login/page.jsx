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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({email, password}),
}

    await fetch("/api/login", options)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error.message));

  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" size="lg" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleLogin} variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link href="/login"
              className="ml-1 font-bold text-blue-600"
            >
              Sign up
            </Link>
          </Typography>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}