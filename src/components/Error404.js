import React from 'react'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const Error404 = () => {
  return (
    <>  
        <hr></hr>
        <h1>404 NOT FOUND :/</h1>
        <p style={{margin:"30px 0 0 80px"}}>존재하지 않는 주소입니다. 어쩌다 오셨어요......? 😐 <br />
            얼른 원래 주소로 돌아가요!! 
            <br /><br /><br />&nbsp;&nbsp;v<br />&nbsp;&nbsp;v<br />&nbsp;&nbsp;v<br /><br /><br />
            
            <Link to='/'>
                <Button
                className="center"
                type="button"
                variant="contained"
                style={{backgroundColor: "green", fontFamily: 'SUITE-Regular', height: 'fit-content'}}>
                    홈으로 돌아가기
                </Button>
            </Link>
        </p>
        
    </>
  )
}

export default Error404