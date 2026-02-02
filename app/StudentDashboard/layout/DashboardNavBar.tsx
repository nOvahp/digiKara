"use client"

import * as React from "react"
import Image from "next/image"
import { Bell, Wallet } from "lucide-react"
import profileImg from "../../../public/DashboardProfile.png"

import { PopUpStudent } from "../features/products/PopUpStudent"

import Notifications from '../features/notifications/Notifications'; // Import the component

export function DashboardNavBar() {
  const [showStudentPopup, setShowStudentPopup] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)

  return (
    <>
      <div className="w-full flex justify-between items-center h-auto mb-8 sticky top-0 z-50 bg-white py-2">
          
          {/* Left Side - Icons */}
          <div className="flex justify-start items-center gap-1">
              {/* Notification Icon (Bell) */}
              <div 
                className=" bg-transparent rounded-xl flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowNotifications(true)}
              >
                  <Bell className="w-6 h-6 text-[#393E46]" />
              </div>
              
              {/* Wallet Icon */}
              <div className=" bg-transparent rounded-xl flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Wallet className="w-6 h-6 text-[#393E46] bd-black" />
              </div>
          </div>

          {/* Right Side - Profile */}
          <div className="flex justify-end items-center gap-3">
              {/* Text Info */}
              <div className="flex flex-col items-end gap-1 max-w-[200px]">
                  <div className="w-full flex justify-end items-center gap-2">
                      {/* Badge */}
                      <div className="shrink-0 h-6 px-3 bg-[#64B327]/10 rounded-2xl flex justify-center items-center border border-[#64B327]/20">
                          <div className="text-center text-[#64B327] text-xs font-num-medium leading-[18px]">
                              حمایت شده
                          </div>
                      </div>
                      {/* Name */}
                      <div 
                          className="text-right text-[#222831] text-sm font-num-medium leading-snug  cursor-default"
                          title="امیرحسین محمدی"
                      >
                          امیرحسین محمدی
                      </div>
                  </div>
                  {/* Role/School */}
                  <div 
                      className="w-full text-right text-[#61656B] text-xs font-num-medium truncate cursor-default"
                      title="طراح سطح 2 گرافیک - مدرسه  البرز"
                  >
                      طراح سطح 2 گرافیک - مدرسه  البرز
                  </div>
                  {/* Powered By Tag */}
                  <div className="w-full flex justify-end mt-1">
                       <div style={{
                            background: 'linear-gradient(0deg, rgba(100, 179, 39, 0.20) 0%, rgba(100, 179, 39, 0.20) 100%), white'
                        }} className="px-2 py-0.5 rounded-2xl flex items-center justify-center">
                            <span className="text-[#64B327] text-[10px] font-medium leading-[18px]">قدرت گرفته از شغل بابام</span>
                        </div>
                  </div>
              </div>

              {/* Avatar */}
              <div 
                  className="relative flex items-end justify-start cursor-pointer"
                  onClick={() => setShowStudentPopup(true)}
              >
                  <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden ">
                      <Image 
                          src={profileImg} 
                          alt="Profile" 
                          fill 
                          className="object-cover"
                      />
                  </div>
                  
              </div>
          </div>

      </div>
      {showStudentPopup && (
         <PopUpStudent onClose={() => setShowStudentPopup(false)} />
      )}
      {showNotifications && (
         <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </>
  )
}
