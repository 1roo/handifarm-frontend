import './Board.scss';

import { React, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FormControl, Grid, Container, TextField, Button, Select, MenuItem , Stack, Pagination } from '@mui/material';
import { margin } from '@mui/system';






function BoardList() {

    const dataFromDatabase = [
        { id: 1, topic: '공지', title: '쯔쯔가무시병', writer: '관리자', regDate: '2023-07-07', watched: '3' },
        { id: 2, topic: '자유', title: '집인데도 집이가고싶여요', writer: '홍길동', regDate: '2023-07-07', watched: '2' },
        // DB에서 가져온 데이터 예시
      ];



    const [selectedTopic, setSelectedTopic] = useState('all'); // 기본값으로 'all'을 선택
    const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    };

    const [selectedCondition, setSelectedCondition] = useState('all'); // 기본값으로 'all'을 선택
    const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    };
    

    return (
        
        <>
            <p className='menu-title'>게시판</p>
            <Container maxWidth="ml">
                <Grid container spacing={0} 
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Grid>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                            id="topic"
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            >
                            <MenuItem value={'all'}>
                                <em>말머리</em>
                            </MenuItem>
                            <MenuItem value={'notice'}>공지</MenuItem>
                            <MenuItem value={'information'}>정보</MenuItem>
                            <MenuItem value={'free'}>자유</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                            id="condition"
                            value={selectedCondition}
                            onChange={handleConditionChange}
                            >
                            <MenuItem value={'all'}>
                                <em>검색조건</em>
                            </MenuItem>
                            <MenuItem value={'title'}>제목</MenuItem>
                            <MenuItem value={'content'}>내용</MenuItem>
                            <MenuItem value={'writer'}>작성자</MenuItem>
                            <MenuItem value={'titleContent'}>글+내용</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <TextField variant="outlined" />
                        <Button className='searchBtn' variant="contained">검색</Button>
                    </Grid>
                </Grid>   
                <br/><hr/>
                <Grid maxWidth="1200px" margin="0 auto">
                    <Table bordered size='xl'>
                        <thead>
                            <tr>
                                <th>말머리</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFromDatabase.map((row) => (
                            <tr key={row.id}>
                                <td style={{
                                    backgroundColor: row.topic === '공지' ? '#EBEBEB' : 'none',
                                    color: row.topic === '공지' ? 'red' : 'black',
                                    fontWeight: row.topic === '공지' ? 'bold' : 'normal'
                                }}>
                                    <div className='notice-box' style={{display : row.topic !== '공지' ? 'none' : 'block'}}>{row.topic}</div>
                                    <div style={{display : row.topic === '공지' ? 'none' : 'block'}}>{row.topic}</div>
                                </td>
                                <td className="td-title" style={{
                                    backgroundColor: row.topic === '공지' ? '#EBEBEB' : 'none',
                                    color: row.topic === '공지' ? 'red' : 'black',
                                    fontWeight: row.topic === '공지' ? 'bold' : 'normal'
                                }}>
                                    {row.title}
                                </td>
                                <td style={{ backgroundColor: row.topic === '공지' ? '#EBEBEB' : 'none',
                                    fontWeight: row.topic === '공지' ? 'bold' : 'normal' }}>
                                    {row.writer}
                                </td>
                                <td style={{ backgroundColor: row.topic === '공지' ? '#EBEBEB' : 'none',
                                    fontWeight: row.topic === '공지' ? 'bold' : 'normal' }}>
                                    {row.regDate}
                                </td>
                                <td style={{ backgroundColor: row.topic === '공지' ? '#EBEBEB' : 'none',
                                    fontWeight: row.topic === '공지' ? 'bold' : 'normal' }}>
                                    {row.watched}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Grid>
                <Grid>
                    <Stack spacing={2}>
                        <Pagination count={10} color="primary"/>
                    </Stack>  
                </Grid> 
            </Container>     
        </>    

        

    );
  }
  
  export default BoardList;
  