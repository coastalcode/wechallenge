import React, { Component } from 'react';
import { connect } from 'react-redux';

// Type one user is a basic user
function RequiresTypeOne (ComposedComponent) {
  console.log('inside requires Type One');
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!(this.props.userType >= 1)) {
        this.context.router.push('/signup');
      }
    }

    componentWillUpdate(nextProps) {
      if (!(this.props.userType >= 1)) {
        this.context.router.push('/signup');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { userType: state.auth.userType };
  }

  return connect(mapStateToProps)(Authentication);
}

// Type two user is a super user
function RequiresTypeTwo (ComposedComponent) {
  console.log('inside requires Type Two');
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!(this.props.userType >= 2)) {
        this.context.router.push('/needSuperUser');
      }
    }

    componentWillUpdate(nextProps) {
      if (!(this.props.userType >= 2)) {
        this.context.router.push('/needSuperUser');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { userType: state.auth.userType };
  }

  return connect(mapStateToProps)(Authentication);
}

// Type two user is a super user
function RequiresTypeThree (ComposedComponent) {
  console.log('inside requires Type Two');
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!(this.props.userType >= 3)) {
        this.context.router.push('/needAdminUser');
      }
    }

    componentWillUpdate(nextProps) {
      if (!(this.props.userType >= 3)) {
        this.context.router.push('/needAdminUser');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { userType: state.auth.userType };
  }

  return connect(mapStateToProps)(Authentication);
}

export {RequiresTypeOne, RequiresTypeTwo, RequiresTypeThree};