/* eslint-disable  */
import React from "react";

class MyErrorBoundary extends React.Component {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: any, info: any) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  // A fake logging service.
  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return <p>An Error Happend Try Again</p>;
    }
    return this.props.children;
  }
}

export default MyErrorBoundary;
