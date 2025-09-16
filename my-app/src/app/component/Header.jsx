import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='felx gap-5 border justify-between'>
      <Link href={"/"}>Home</Link>
      <nav className='felx '>
        <Link href={"/todolist"}>todolist</Link>
        <Link href={"/newTodo"}>newTodo</Link>
        
      </nav>
    </div>
  )
}

export default Header