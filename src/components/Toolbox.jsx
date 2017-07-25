import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import DocumentTitle from 'react-document-title';
import Marks from './Marks.jsx';
import Navigation from './Navigation.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import Resources from './Resources.jsx';
import StatusCard from './StatusCard.jsx';
import Timetable from './Timetable.jsx';

const styleSheet = createStyleSheet('Toolbox', {
  root: {
    minWidth: '430px'
  },
  container: {
    margin: '25px auto',
    padding: '0 25px',
    maxWidth: '972px',
    '@media (max-width: 500px)': {
      margin: '20px 5px 0 5px',
      padding: 0
    }
  },
  statusCards: {
    display: 'flex',
    '@media (max-width: 500px)': {
      flexDirection: 'column'
    }
  }
});

class Toolbox extends React.Component {
  static pages = ['/marks', '/timetable', '/resources'];
  static pageNames = ['Marks', 'Timetable', 'Resources'];

  selectedPage = -1;

  handlePageSelect = (index) => {
    if (this.selectedPage !== index) {
      this.props.history.push(Toolbox.pages[index]);
    }
  }

  render() {
    // If page not found redirect to "/marks"
    const pathname = this.props.location.pathname;
    if (pathname === '/' || !Toolbox.pages.includes(pathname)) {
      return <Redirect to="/marks" />;
    }

    // Set selected navigation tab according to the current page
    const pageNumber = Toolbox.pages.indexOf(this.props.location.pathname);
    this.selectedPage = pageNumber !== -1 ? pageNumber : 0;

    const classes = this.props.classes;

    return (
      <DocumentTitle title={Toolbox.pageNames[this.selectedPage]}>
        <div className={classes.root}>
          <Navigation
            selectedPage={this.selectedPage}
            handlePageSelect={index => this.handlePageSelect(index)}
          />

          <div className={classes.container}>
            <div className={classes.statusCards}>
              <StatusCard />
              <StatusCard />
              <StatusCard />
            </div>

            <Switch>
              <Route path="/marks" component={Marks} />
              <Route path="/timetable" component={Timetable} />
              <Route epath="/resources" component={Resources} />
            </Switch>
          </div>
          <button onClick={() => this.props.handleLogout()} hidden>Login</button>
        </div>
      </DocumentTitle>
    );
  }
}

Toolbox.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    statusCards: PropTypes.string.isRequired
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styleSheet)(withRouter(Toolbox));