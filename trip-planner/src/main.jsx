import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './input.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from './viewTrip/[TripId]'
import MyTrips from './my-trips'
import ContactME from './contact-me/contact'



const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/viewTrip/:TripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  },
  {
    path:'/contact-me',
    element:<ContactME/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/> 
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>
)

