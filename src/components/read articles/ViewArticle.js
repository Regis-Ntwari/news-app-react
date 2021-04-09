import { Grid, Typography } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import React from 'react'

export const ViewArticle = (props) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item container xs={12} sm={8}>
                    <Typography>
                        {props.article.title}
                    </Typography>
                    {props.article.image}
                    <Grid>
                        {ReactHtmlParser(props.article.content)}
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
        </div>
    )
}
