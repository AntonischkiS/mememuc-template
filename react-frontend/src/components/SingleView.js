import React, { useState } from 'react';
import { Route, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Card, CardContent, Typography} from "@mui/material";
import { Button,CardActions,CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import TextField from '@mui/material/TextField';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CommentIcon from '@mui/icons-material/Comment';

import "./Layout.css";

function SingleView(navigation) {
  let { id } = useParams();
  let id_next = Number(id) +1 
  let id_prev = Number(id) -1 

  // ToDO: 1000 must be replaced my last id
  let id_rnd = Math.floor(Math.random()*1000);
  let src = "".concat('https://picsum.photos/id/', id, '/5000/3333')
  const navigate = useNavigate();

  return (
                        <><>
                              <Card>

                                  <CardContent>
                                      <LazyLoadImage
                                          alt={"some meme"}
                                          height={768}
                                          src={src}
                                          width={1024} />

                                  </CardContent>
                                  <CardActions>
                                        <IconButton aria-label="prev" disabled={id_prev <= 0} size="small" color="primary"  
                                                onClick={() => {
                                                  navigate(`/meme/${id_prev}`)
                                                  }} >
                                        <SkipPreviousIcon/>
                                        </IconButton>
                                        <IconButton aria-label="next" size="small" color="primary" onClick={() => {
                                                  navigate(`/meme/${id_next}`)
                                                }}>
                                        <SkipNextIcon />
                                        </IconButton>

                                        <IconButton aria-label="next" size="small" color="primary" onClick={() => {
                                                  navigate(`/meme/${id_next}`)
                                                }}>
                                        <CommentIcon />
                                        </IconButton>

                                        <Button size="small" color="primary" onClick={() => {
                                                  navigate(`/meme/${id_rnd}`)
                                                }}>
                                        Random Image
                                        </Button>
                                        
                                    </CardActions>
                                    <TextField
                                  
                                        id="outlined-multiline-static"
                                        label="Multiline"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        defaultValue="Default Value"
                                      />
                              </Card>
                          </></>
  );
}

export default SingleView;