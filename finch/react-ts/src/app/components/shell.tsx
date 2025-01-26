import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/*
    App Shell

    Scope:
    - load/cache static UI frame
    - load/cache initial data for rest of internal ui components
*/
interface ShellProps { children: object }

const Shell = (props: ShellProps) => (
  <Layout>
    <NavBar />
    { props.children }
  </Layout>
);

interface LayoutProps { children: object }

const Layout = (props: LayoutProps) => (
  <div style={{ width: '100%', height: '100%' }}>
    { props.children }
  </div>
);

const NavBar = () => (
  <AppBar>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={ev => console.log(ev)}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

// const NavPanel = () => (
//   <nav>
//     <Hidden smUp implementation="css">
//       <Drawer
//          container={this.props.container}
//          variant="temporary"
//          anchor={'right'}
//         //  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//          open={this.state.mobileOpen}
//          onClose={this.handleDrawerToggle}
//          classes={{
//            paper: classes.drawerPaper,
//          }}
//       >
//         {drawer}
//       </Drawer>
//    </Hidden>
//      <Hidden xsDown implementation="css">
//        <Drawer
//          classes={{
//            paper: classes.drawerPaper,
//          }}
//          variant="permanent"
//          open
//        >
//          {drawer}
//        </Drawer>
//     </Hidden>
//   </nav>
// );

export { Shell }
