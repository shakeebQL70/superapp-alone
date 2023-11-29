import React, { Component, ReactNode } from "react";
import { Typography } from "@mui/material";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography variant="h3" component='h1' fontWeight='bold'>Something went wrong :(</Typography>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
