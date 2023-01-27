// Source: https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/
import React, { useReducer, useRef, useState } from 'react';
import SingleView from "../SingleView";
import { useNavigate, useLocation } from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import { Button,CardActions,CardActionArea } from '@mui/material';

import { useFetch, useInfiniteScroll, useLazyLoading } from '../../customHooks'
// import '../index.css';
import {LazyLoadImage} from "react-lazy-load-image-component";


function Overview(navigation) {

    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState(null);


    const imgReducer = (state, action) => {
        switch (action.type) {
            case 'STACK_IMAGES':
                return { ...state, images: state.images.concat(action.images) }
            case 'FETCHING_IMAGES':
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

    let bottomBoundaryRef = useRef(null);
    useFetch(pager, imgDispatch);
    useLazyLoading('.card-img-top', imgData.images)
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    return (
        <div className="">
            {/* ... */}
            <div id='images' className="container">
                <div className="row">
                    {imgData.images.map((image, index) => {
                        const { author, download_url } = image
                        return (
                            <div key={index} className="card">

                                <><>
                                    <Card>
                                        <CardActionArea onClick={() => navigate(`/meme/${index}`)}>

                                            <CardContent>
                                                <Typography variant="h5">{author}</Typography>
                                                <LazyLoadImage
                                                    alt={"some meme"}
                                                    height={384}
                                                    src={download_url}
                                                    width={512} />

                                            </CardContent>

                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary"
                                                    onClick={() => {
                                                        /* 1. Navigate to the Details route with params */
                                                        navigation.navigate('/meme/${index}', {
                                                            itemId: 86,
                                                            otherParam: 'anything you want here',
                                                        });
                                                    }} >
                                                Upvote
                                            </Button>
                                            <Button size="small" color="primary">
                                                Downvote
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </></>

                            </div>
                        )
                    })}

                </div>
            </div>

            {/* ... */}
            <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
            {imgUrl && <SingleView imgData={imgData} />}
        </div>
    );
}
export default Overview;