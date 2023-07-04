import React from 'react';

import './AdminDashboard.css'

import img1 from '../../Images/avatar1.png';
import img2 from '../../Images/profile.svg';
import img3 from '../../Images/gift.svg';
import img4 from '../../Images/logout.svg';
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";


function SearchBar() {
  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search logic here
  };

  return (
    <form className='search-form' onSubmit={handleSearch}>
      <input type='text' placeholder='Search...' />
    </form>
  );
}

function generateRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

function generateRandomParticipants() {
  return Math.floor(Math.random() * 20) + 1;
}

function generateRandomStatus() {
  return Math.random() < 0.5 ? 'Active' : 'Inactive';
}

function generateRandomAction() {
  return Math.random() < 0.5 ? 'Leadboard' : 'Leadboard';
}

function AdminDashboard() {
  const tableData = [
    { id: 1, name: 'John Doe', code: generateRandomCode(), participants: generateRandomParticipants(), status: generateRandomStatus(), action: generateRandomAction() },
    { id: 2, name: 'Jane Smith', code: generateRandomCode(), participants: generateRandomParticipants(), status: generateRandomStatus(), action: generateRandomAction() },
    { id: 3, name: 'Alice Johnson', code: generateRandomCode(), participants: generateRandomParticipants(), status: generateRandomStatus(), action: generateRandomAction() },
    { id: 4, name: 'Bob Anderson', code: generateRandomCode(), participants: generateRandomParticipants(), status: generateRandomStatus(), action: generateRandomAction() },
    { id: 5, name: 'Sarah Williams', code: generateRandomCode(), participants: generateRandomParticipants(), status: generateRandomStatus(), action: generateRandomAction() }
  ];

  return (
    <div className='main-div'>
      <div className='div2'>
        <img src={img1} className='avatar' alt='Avatar 1' />
        <img src={img2} className='avatar2' alt='Avatar 2' />
        <img src={img3} className='avatar3' alt='Avatar 3' />
        <img src={img4} className='avatar4' alt='Avatar 4' />
      </div>
      <div className='div3'>
        <h3 className='h3'>Lucky Draw</h3>
        <div className='button-wrapper'>
          <SearchBar />
          <button className='create-button'><AiOutlinePlus className='plus-icon' color='white'/>Create Lucky Draw</button>
        </div>
        <table className='data-table' cellSpacing={0}>
          <thead>
            <tr>
              <th className='thh'>#</th>
              <th className='thh empty-4'>Name</th>
              <th className='thh empty-3'>Code</th>
              <th className='thh empty-2'>Participants</th>
              <th className='thh empty'>Status</th>
              <th className='thh'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr className='elements' key={row.id}>
                <td>{row.id}</td>
                <td className='empty-4'>{row.name}</td>
                <td className='empty-3'>{row.code}</td>
                <td className='empty-2'>{row.participants}</td>
                <td className='empty'>
                  <button className={row.status === 'Active' ? 'status-active' : 'status-inactive'}>
                    {row.status}
                  </button>
                </td>

                <td className='leadparent'><p className='leadbord'>{row.action}</p>
                  <AiOutlineDelete className='delete' />
                  <AiFillEdit className='delete' />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;