import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ hasError: true });
    }
    render() {
        if (this.state.hasError) {
            return <h1>An error has occured!</h1>;
        }
        return this.props.children;
    }
}
