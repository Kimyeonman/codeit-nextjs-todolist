"use client"

import { sub } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const newTodoPage = () => {

  const router = useRouter();
  const [title,setTitle] = useState("");

  const submit = async (x)=> {
    x.preventDefault();
    try  {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`,{
        method: "POST",
        body: JSON.stringify({
          title,
          isCompleted: false,
          cretaeAt: new Date().toISOString(),
        }),
      });
      router.push("/todolist");
    }
    catch(error){
      console.log("생성 오류"+ error)
    }
  };
  const change = (e) =>{{
    setTitle(e.target.value);
  }}

  return (
    <div>
      <h1>할 일 생성</h1>
      <form onSubmit={submit}>
        <input className='border' value={title} onChange={change}></input>
        <button className='border' type='submit'
        >
          생성
        </button>
      </form>
    </div>
  )
}

export default newTodoPage