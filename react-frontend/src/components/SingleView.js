import React, { useState } from 'react';
import { Route, useParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Card, CardContent, Typography} from "@mui/material";
import { Button,CardActions,CardActionArea } from '@mui/material';

import "./Layout.css";

function SingleView(navigation) {
  let { id } = useParams();
  let id_next = Number(id) +1 
  let id_prev = Number(id) -1 

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
                                        <Button disabled={id_prev <= 0} size="small" color="primary"  
                                                onClick={() => {
                                                  navigate(`/meme/${id_prev}`)
                                                  }} >
                                        Prev
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => {
                                                  navigate(`/meme/${id_next}`)
                                                }}>
                                        Next
                                        </Button>
                                    </CardActions>
 
                              </Card>
                          </></>
  );
}

export default SingleView;