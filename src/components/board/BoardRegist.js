import './Board.scss';

import { React, useState } from 'react';

function BoardRegist() {

    return (
        <>
            <p className='menu-title'>게시글 작성</p>
            <div className='topic-wrap'>
                <select name='topicCondition' className='topicContidion' id='topicCondition'>
                    <option value='' className='topic'>말머리</option>
                    <option value='notice' className='notice'>공지</option>
                    <option value='information' className='information'>정보</option>
                    <option value='free' className='free'>자유</option>
                </select>
            </div>
            <input type='text' name='title' className='title' id='title' placeholder='제목' />
            <br/><hr/>

            <textarea class="form-control" rows="7" name="content" id="content" type='text'	maxlength='300' />

            <button type="submit" className="registBtn" id="registBtn">등록</button>
            <button type="text" className="exitBtn" id="exitBtn">취소</button>
        </>


    );

    }
  
    export default BoardRegist;
    