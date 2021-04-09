import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import authService from '../../services/auth.service'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const Profile = () => {
  const isAuthenticated = authService.isAuthenticated()
  const user = isAuthenticated ? authService.getCurrentUser() : 'UN'
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar>H</Avatar>
    </div>
  );
};
