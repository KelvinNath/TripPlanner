import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudget, SelectTravelList } from "@/constants/options";
import { chatSession } from "@/service/AiModel";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [destination, setDestination] = useState(null);
  const [openDialLog, setOpenDialLog] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is signed in on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsUserSignedIn(!!user);
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        register
      );
      setSuccess(response.data.message);
      // Clear form after successful submission
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      // Close signup form after successful registration
      setTimeout(() => {
        setShowSignUp(false);
        setOpenDialLog(true);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

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
        console.log("Google user profile:", resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setIsUserSignedIn(true);
        setOpenDialLog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to get user profile from Google");
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.log("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    },
    flow: "implicit", // Use implicit flow to avoid popup issues
    popup: true,
    ux_mode: "popup",
  });

  const onGenerateTrip = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        setOpenDialLog(true);
        return;
      }

      // Form validation
      if (!formData?.location) {
        toast.error("Please select a destination");
        return;
      }
      
      if (!formData?.noOfDays) {
        toast.error("Please enter number of days");
        return;
      }
      
      if (formData?.noOfDays > 5) {
        toast.error("Trip duration cannot exceed 5 days");
        return;
      }
      
      if (!formData?.noOfPeople) {
        toast.error("Please select who you're traveling with");
        return;
      }
      
      if (!formData?.budget) {
        toast.error("Please select your budget");
        return;
      }

      setLoading(true);
      
      console.log("Generating trip with data:", formData);
      
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData?.location?.label)
        .replace("{noOfDays}", formData?.noOfDays)
        .replace("{noOfPeople}", formData?.noOfPeople)
        .replace("{budget}", formData?.budget)
        .replace("{noOfDays}", formData?.noOfDays);

      console.log("Sending AI prompt:", FINAL_PROMPT);
      
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      console.log("AI Response:", responseText);
      
      try {
        // Test if the response is valid JSON
        const parsedJson = JSON.parse(responseText);
        console.log("Parsed JSON:", parsedJson);
        
        // If we got here, JSON is valid
        SaveAiTrip(responseText);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        toast.error("Couldn't create trip plan. The AI response format was invalid.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in trip generation:", error);
      toast.error("Failed to generate trip. Please try again.");
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        toast.error("User information is missing. Please sign in again.");
        setLoading(false);
        return;
      }
      
      const docId = Date.now().toString();
      const parsedData = JSON.parse(TripData);
      
      console.log("Saving trip to Firestore with ID:", docId);
      
      await setDoc(doc(db, "Aitrips", docId), {
        userSelection: formData,
        tripData: parsedData,
        userEmail: user.email,
        id: docId,
        createdAt: new Date().toISOString()
      });
      
      console.log("Trip saved successfully");
      toast.success("Trip generated successfully!");
      setLoading(false);
      navigate("/viewTrip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
      setLoading(false);
    }
  };

  // Function to handle button click - opens dialog if not signed in
  const handleGenerateClick = () => {
    if (isUserSignedIn) {
      onGenerateTrip();
    } else {
      setOpenDialLog(true);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10 flex flex-col items-center text-center bg-white">
        <h2 className="font-bold text-3xl">
          Tell Your Travel Preferences 🛫🏔️
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          Just provide some basic information about your wishlist
        </p>

        <div className="mt-14 flex flex-col gap-12 w-full bg-white">
          {/* Destination Input */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium">
              What is your choice of destination 🏕️?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: destination,
                onChange: (v) => {
                  setDestination(v);
                  handleInput("location", v);
                },
                placeholder: "Search for a place...",
              }}
            />
          </div>

          {/* Trip Duration Input */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium">
              For how many days are you planning your trip ⌛?
            </h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              max="5"
              className="w-full p-2 border rounded-md"
              onChange={(e) => handleInput("noOfDays", e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Maximum 5 days</p>
          </div>

          {/* Budget Selection */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
              {SelectBudget.map((item, index) => (
                <div
                  onClick={() => handleInput("budget", item.title)}
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg flex flex-col items-center justify-center 
                  text-center transition-all duration-300 cursor-pointer 
                  ${formData?.budget === item.title ? "shadow-lg border-black" : ""}`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Companion Selection */}
          <div className="w-full py-10">
            <h2 className="text-xl my-3 font-medium text-center">
              Who Do You Plan To Go With?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 max-w-6xl mx-auto px-4">
              {SelectTravelList.map((item, index) => (
                <div
                  onClick={() => handleInput("noOfPeople", item.people)}
                  key={index}
                  className={`p-4 border rounded-lg bg-white hover:shadow-lg flex flex-col items-center 
                  justify-center text-center transition-all duration-300 cursor-pointer
                  ${formData?.noOfPeople === item.people ? "shadow-lg border-black" : ""}`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Button container with conditional styling */}
      <div className="bg-white mb-10 w-full flex justify-center py-5">
        <Button
          disabled={loading}
          onClick={handleGenerateClick}
          className={`text-lg px-6 py-2 ${
            !isUserSignedIn ? "bg-gray-400 hover:bg-gray-500" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : isUserSignedIn ? (
            "Generate Trip"
          ) : (
            "Sign In to Generate Trip"
          )}
        </Button>
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
                    Sign in to the app with Google authentication security
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <Button disabled={loading} onClick={login} className="w-full">
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
};

export default CreateTrip;