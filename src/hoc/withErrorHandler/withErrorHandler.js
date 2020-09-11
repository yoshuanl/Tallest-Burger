import React, { Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    // anonymous class
    return class extends Component {
        state = {
            error: null
        }
        // componentDidMount run after all child components are rendered
        // TODO: use constructor to replace componentWillMount
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req; // so the request can continue
            })
            // error is an object that contains error message
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            })
        }

        // execute after a component isn't required anymore
        // remove unused interceptors 
        // to prevent memory leak when this error handler is used to wrap more and more components
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render () {
            return (
                <Fragment>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
                </Fragment>
            )
        }
    }
};
    
export default withErrorHandler;