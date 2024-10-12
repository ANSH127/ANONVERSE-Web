import React from "react";
import { useSelector } from "react-redux";


export default function Footer() {
    const mode = useSelector(state => state.user.theme)

  return (
    <footer className={`${mode ? ' text-white' : 'text-black'} py-4`}>
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Designed by{" "}
          <a href="https://anshdev.vercel.app/" 
          className="hover:underline text-blue-500

          ">
             Ansh
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
