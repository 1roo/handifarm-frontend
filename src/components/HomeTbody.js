import React from 'react'

const HomeTbody = ({category, title, userName, createDate, views}) => {


  return (
    <>
         <tr>
            <td>[{category}]</td>
            <td>{title}</td>
            <td>{userName}</td>
            <td>{createDate}</td>
            <td>{views}</td>
        </tr>
    </>
  )
}

export default HomeTbody