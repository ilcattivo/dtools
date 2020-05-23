import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const CatalogMenu = ({ list }) => {
  const classes = useStyles();
  const [openTurning, setOpenTurning] = useState(true);
  const [openMilling, setOpenMilling] = useState(false);
  const [openDrilling, setOpenDrilling] = useState(false);
  const [openThreading, setOpenThreading] = useState(false);

  const [toolTypes, operationTypes] = list;

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='h2' style={{ fontSize: '1.8rem' }}>
          Каталог товаров
        </ListSubheader>
      }
      className={classes.root}>
      {toolTypes.map(({ name, _id, shortname: toolTypeShortName }) => (
        <div key={name}>
          <ListItem button onClick={() => setOpenTurning(!openTurning)}>
            <ListItemText primary={name} />
            {openTurning ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTurning} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {operationTypes
                .filter(opType => opType.toolTypeId === _id)
                .map(({ name, shortname }) => (
                  <ListItem key={name} button className={classes.nested}>
                    <ListItemLink
                      to={`/products/${toolTypeShortName}/${shortname}`}
                      primary={name}
                    />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default CatalogMenu;

// <List
//   component='nav'
//   aria-labelledby='nested-list-subheader'
//   subheader={
//     <ListSubheader component='h2' style={{ fontSize: '1.8rem' }}>
//       Каталог товаров
//     </ListSubheader>
//   }
//   className={classes.root}>
//   <ListItem button onClick={() => setOpenTurning(!openTurning)}>
//     <ListItemText primary='Токарный инструмент' />
//     {openTurning ? <ExpandLess /> : <ExpandMore />}
//   </ListItem>
//   <Collapse in={openTurning} timeout='auto' unmountOnExit>
//     <List component='div' disablePadding>
//       <ListItem button className={classes.nested}>
//         <ListItemLink to='/trash' primary='Резцы отрезные' />
//       </ListItem>
//       <ListItem button className={classes.nested}>
//         <ListItemLink to='/trash' primary='Резцы проходные изогнутые' />
//       </ListItem>
//       <ListItem button className={classes.nested}>
//         <ListItemLink to='/trash' primary='Резцы проходные прямые' />
//       </ListItem>
//     </List>
//   </Collapse>
//   <ListItem button onClick={() => setOpenMilling(!openMilling)}>
//     <ListItemText primary='Фрезерный инструмент' />
//     {openMilling ? <ExpandLess /> : <ExpandMore />}
//   </ListItem>
//   <Collapse in={openMilling} timeout='auto' unmountOnExit>
//     <List component='div' disablePadding>
//       <ListItem button className={classes.nested}>
//         <ListItemText primary='Starred' />
//       </ListItem>
//     </List>
//   </Collapse>
//   <ListItem button onClick={() => setOpenDrilling(!openDrilling)}>
//     <ListItemText primary='Сверлильный инструмент' />
//     {openDrilling ? <ExpandLess /> : <ExpandMore />}
//   </ListItem>
//   <Collapse in={openDrilling} timeout='auto' unmountOnExit>
//     <List component='div' disablePadding>
//       <ListItem button className={classes.nested}>
//         <ListItemText primary='Starred' />
//       </ListItem>
//     </List>
//   </Collapse>
//   <ListItem button onClick={() => setOpenThreading(!openThreading)}>
//     <ListItemText primary='Резьбонарезной инструмент' />
//     {openThreading ? <ExpandLess /> : <ExpandMore />}
//   </ListItem>
//   <Collapse in={openThreading} timeout='auto' unmountOnExit>
//     <List component='div' disablePadding>
//       <ListItem button className={classes.nested}>
//         <ListItemText primary='Starred' />
//       </ListItem>
//     </List>
//   </Collapse>
// </List>
