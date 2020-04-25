import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import 'antd/dist/antd.css';
import Base from './views/base/index';
import Routes from './routes/routes';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
}));

export default function App(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Base />      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes/>
      </main>      
    </div>
  );
}

