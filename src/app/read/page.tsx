"use client"

import { useEffect, useState } from "react"

type Notice = {
  _id: string
  title: string
  description: string
}


export default function Read(){
    const [notice , setNotice] = useState<Notice[]>([])

    // get data
    useEffect(()=>{
        fetch('/api/notices')
        .then((res)=>res.json())
        .then((data)=>setNotice(data))
    },[])

    return(
        <div>
            <div>
                {notice.map((not)=>(
                    <div key={not._id}>
                        <h2>Title</h2>
                        <p>{not.title}</p>
                        <h2>Description</h2>
                        <p>{not.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}