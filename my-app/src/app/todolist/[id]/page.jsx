"use client"
import { useParams } from 'next/navigation';
import React from 'react'

const todoPage = async ({params}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${params.id}`);
  const data = await response.json();
  return (
    <div> 
      <h1>상세 페이지: {data.id} </h1>
      <p>할일: {data.title}</p>
      <p>진행사항: {data.isCompleted ? "다함" : "못함"}</p>
    </div>
  )
}

export default todoPage