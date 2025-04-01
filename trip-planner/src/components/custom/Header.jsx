import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"; 

function Header() {
  const [openDialLog, setOpenDialLog] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, register);
      setSuccess(response.data.message);
      // Clear form after successful submission
      setRegister({
        name: '',
        email: '',
        password: '',
      });
      // Close signup form after successful registration
      setTimeout(() => {
        setShowSignUp(false);
        setOpenDialLog(true);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
    flow: "implicit",
    popup: true,
    ux_mode: "popup",
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialLog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-3">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/contact-me"> 
              <Button variant="outline" className="rounded-full">
                Contact Me
              </Button>
            </a>
            <a href="/create-trip"> 
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips"> 
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User"
                />
              </PopoverTrigger>

              <PopoverContent>
                <h2
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href='/';
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button onClick={() => setOpenDialLog(true)}>Sign In</Button>
            <Button variant="outline" onClick={() => setShowSignUp(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      
      {/* Sign In Dialog */}
      <Dialog open={openDialLog} onOpenChange={setOpenDialLog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex items-center justify-center">
                  <img src="/logo.svg" className="w-32 h-15" alt="App Logo" />
                </div>

                <div className="text-center mt-4">
                  <div className="font-bold text-lg">Sign In With Google</div>
                  <div className="text-sm text-muted-foreground">
                    Sign in to the app with Google authentication security.
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <Button onClick={login} className="w-full">
              <FcGoogle className="mr-2" />
              Sign In with Google
            </Button>
            <div className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <span 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setOpenDialLog(false);
                  setShowSignUp(true);
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Create a new account to get started
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username:</label>
              <input
                type="text"
                name="name"
                value={register.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={register.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password:</label>
              <input
                type="password"
                name="password"
                value={register.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-white"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setShowSignUp(false);
                  setOpenDialLog(true);
                }}
              >
                Sign In
              </span>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;