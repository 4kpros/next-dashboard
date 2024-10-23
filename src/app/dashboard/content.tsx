"use client";

import React from 'react'
import { theme } from "antd";

export default function PageContent() {
    const {
      token: { colorBgContainer, borderRadius },
    } = theme.useToken();

  return (
    <div className='w-full flex flex-col xl:flex-row items-start justify-between gap-[10px]'>
        <div className='w-full xl:w-4/6 flex flex-col gap-[10px]'>
            <div className='w-full flex items-start justify-between gap-[10px]'>
                <div style={{width:"200px", height:"90px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} >
                    <h1 className='text-xl font-bold'>50%</h1>
                    <p>
                    Percentage of success
                    </p>
                </div>
                <div style={{width:"200px", height:"90px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} >
                    <h1 className='text-xl font-bold'>50%</h1>
                    <p>
                    Percentage of success
                    </p>
                </div>
                <div style={{width:"200px", height:"90px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} >
                    <h1 className='text-xl font-bold'>50%</h1>
                    <p>
                    Percentage of success
                    </p>
                </div>
                <div style={{width:"200px", height:"90px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} >
                    <h1 className='text-xl font-bold'>50%</h1>
                    <p>
                    Percentage of success
                    </p>
                </div>
                <div style={{width:"200px", height:"90px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} >
                    <h1 className='text-xl font-bold'>50%</h1>
                    <p>
                    Percentage of success
                    </p>
                </div>
            </div>
            <div style={{ width:"100%", height:"400px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} />
            <div style={{ width:"100%", height:"400px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} />
        </div>
        <div className='w-full flex flex-col gap-[10px]'>
            <div style={{ width:"100%", height:"600px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} />
            <div style={{ width:"100%", height:"300px", padding:"16px", background:colorBgContainer, borderRadius:borderRadius}} />
        </div>
    </div>
  )
}
