import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup, Button } from 'react-bootstrap';



function BoardList() {

    

    return (
        
        <>
            <Form.Select className='topic'>
                <option>말머리</option>
                <option value="notice">공지</option>
                <option value="information">정보</option>
                <option value="free">자유</option>
            </Form.Select>
            <Form.Select className='condition'>
                <option>검색조건</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
                <option value="titleAndContent">제목+내용</option>
            </Form.Select>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="검색어를 입력하세요"
                />
                <Button variant="outline-secondary" id="searchBtn">
                검색
                </Button>
            </InputGroup>
        
        </>    

        

    );
  }
  
  export default BoardList;
  