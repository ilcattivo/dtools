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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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

const CatalogMenu = ({ list: [toolTypes, operationTypes] }) => {
  const classes = useStyles();

  const submenuState = Object.fromEntries(
    toolTypes.map((el) => [el.shortname, false])
  );
  const [openedSumbenus, setOpenedSubmenus] = useState(submenuState);

  const handleWrap = (submenu) => {
    setOpenedSubmenus({
      ...openedSumbenus,
      [submenu]: !openedSumbenus[submenu],
    });
  };

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
      {toolTypes.map(({ name, _id, shortname: toolTypeShortName }) => {
        const isOpen = openedSumbenus[toolTypeShortName];

        return (
          <div key={name}>
            <ListItem button onClick={() => handleWrap(toolTypeShortName)}>
              <ListItemText primary={name} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {operationTypes
                  .filter((opType) => opType.toolTypeId === _id)
                  .map(({ name, shortname: opTypeShortname }) => (
                    <ListItem key={name} button className={classes.nested}>
                      <ListItemLink
                        to={`/products/${toolTypeShortName}/${opTypeShortname}`}
                        primary={name}
                      />
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default CatalogMenu;
