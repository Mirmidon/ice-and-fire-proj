import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {StartPage, CharacterPage, HousesPage, BooksPage, BooksItem} from '../pages/';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        const randomChar = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        // const btnStyle = {
            // padding: '5px',
            // borderRadius: '8px'
        // }
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        {/* <Row> */}
                            {/* <Col lg={{size: 5, offset: 0}}> */}
                                {/* <button onClick={() => this.toggleRandomChar()} style={btnStyle}>click me!</button> */}
                                {randomChar}
                            {/* </Col> */}
                        {/* </Row> */}
                        <Route path='/' exact component={StartPage} />
                        <Route path='/characters/' component={CharacterPage} />
                        <Route path='/houses/' component={HousesPage} />
                        <Route path='/books/' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id} />
                            }
                        } />

                    </Container>
                </div>
            </Router>
        );
    }
};