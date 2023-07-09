import './Board.scss';

import { React, useState } from 'react';
import { MenuItem, Grid, FormControl, Select, Container, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function BoardRegist() {

    const [selectedTopic, setSelectedTopic] = useState('all'); // 기본값으로 'all'을 선택
    const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    };

    return (
        <>
            <p className='menu-title'>게시글 작성</p>
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
                        <TextField placeholder='제목' variant="outlined" />
                    </Grid>
                </Grid> 
                <br/><hr/>

                <Grid container spacing={0} 
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Grid>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <textarea maxRows={13} placeholder="내용을 입력하세요" />
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>     
        </>


    );

    }
  
    export default BoardRegist;
    