"use client"
import React, { useEffect,useState } from 'react'

const todoListPage = () => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => { 
    const fetchData = async () =>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`)
      const data = await  response.json();
      setTodos(data);
      console.log(data);
    }
    fetchData();
  },[]);
//완료(true) -> 취소(false) 
//취소(false) -> 완료(true)
  const compleBtn = async (todo) => {

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`,{
      method:"PATCH",
      body: JSON.stringify({
        isCompleted: !todo.isCompleted,
      }),
    });
    setTodos((prev) => {
      return prev.map(function(x) {
        if(x.id === todo.id){
          return{  
            ...x, 
            isCompleted: !x.isCompleted,
          };
        }
        else{
          return x;
        }
      });
    });
  }
  catch(error){
    console.log("수정 오류"+error);
  }
  };

  const deleteBtn = async (todoId) => {
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,{
        method:"DELETE",
      });

      setTodos(function(prev){
        return prev.filter((x) => {
          return x.id !== todoId;
        })
      })
    }
    catch(error){
      console.log("삭제 오류"+error);
    }
  };
  return (
    <div>
      <h1>하는 일 목록</h1>
      {todos.map((todo)=>{
        return(
        <div key={todo.id} className='flex gap-2'>
          {todo.title}
          <button className='border' 
          onClick={() => compleBtn(todo) }
          > 
            {todo.isCompleted === true ? "완": "완취"}
          </button>
          <button className='border' 
          onClick={() => deleteBtn(todo.id) }
          >
            삭제
          </button>
        </div>
        )
      })}
    </div>
  )
}

export default todoListPage