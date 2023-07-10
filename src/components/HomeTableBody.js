import React from 'react'
import cn from 'classnames'

const HomeTableBody = (board) => {

  const {category, title, userName, createDate, views} = board.board;

  return (
    <>
         <tr className={ cn('', {notice: category == '공지'}) }>
            <td>[{category}]</td>
            <td>{title}</td>
            <td>{userName}</td>
            <td>{createDate}</td>
            <td>{views}</td>
        </tr>
    </>
  )
}

export default HomeTableBody