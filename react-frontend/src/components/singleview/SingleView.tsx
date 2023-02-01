import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import TextField from '@mui/material/TextField';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CommentIcon from '@mui/icons-material/Comment';

// import "../layout/Layout.css";
import "./SingleView.css"

function SingleView() {
    let {id} = useParams();
    let id_next = Number(id) + 1;
    let id_prev = Number(id) - 1;

    // ToDO: 1000 must be replaced my last id
    let id_rnd = Math.floor(Math.random() * 1000);
    let src = null;
    if (typeof id === "string") {
        src = "".concat('https://picsum.photos/id/', id, '/5000/3333');
    }
    const navigate = useNavigate();

    /**
     * First idea for adding comments
     * ! Doesn't keep comments to one meme
     * ! better to store them in the database
     */
    function addComment(text: string | null) {
        const ul = document.getElementById('commentUl');
        const li = document.createElement('commentLi');
        if(ul !== null && text !==null){
            li.appendChild(document.createTextNode(text));
            ul.appendChild(li);
        }
    }

    return (
        <>
            <Card>
                <CardContent>
                    {/*Consider using non-static values like rem*/}
                    <LazyLoadImage
                        alt={"some meme"}
                        className={"singleMeme"}
                        src={src}
                    />
                </CardContent>
                <CardActions>
                    <IconButton aria-label="prev" disabled={id_prev <= 0} size="small" color="primary"
                                onClick={() => navigate(`/meme/${id_prev}`)}>
                        <SkipPreviousIcon/>
                    </IconButton>
                    <IconButton aria-label="next" size="small" color="primary"
                                onClick={() => navigate(`/meme/${id_next}`)}>
                        <SkipNextIcon/>
                    </IconButton>

                    {/*Why navigate on this icon? Or rather do we need this icon? */}
                    <IconButton aria-label="next" size="small" color="primary"
                                onClick={() => navigate(`/meme/${id_next}`)}>
                        <CommentIcon/>
                    </IconButton>

                    <Button size="small" color="primary"
                            onClick={() => navigate(`/meme/${id_rnd}`)}>
                        Random Image
                    </Button>
                </CardActions>

                {/*Text is submitted on enter, better to add comment button? */}
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue="Default Value"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            const value : HTMLDivElement= event.currentTarget;
                            addComment(value.textContent);
                        }
                    }}
                />
                <ul id ={"commentUl"} className={"commentUl"}></ul>
            </Card>
        </>
    );
}

export default SingleView;