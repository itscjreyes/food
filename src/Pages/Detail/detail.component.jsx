import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';

class DetailPage extends Component{
    constructor(){
        super();

        this.state = {
            data: []
        }
    }

    fetchData = () => {
        const db = firebase.firestore();
        const slug = this.props.location.pathname.replace('/','');
        const docRef = db.collection('recipes').doc(slug);
        docRef.get().then(doc => {
            const data = doc.data();
            this.setState({
                data: data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        const data = this.state;

        return (
            <>
            <h1>{data.data.title}</h1>
            <img src={data.data.image} alt={data.data.title}/>
            <ReactMarkdown
                source={data.data.steps}
            />
            <ReactMarkdown
                source={data.data.ingredients}
            />
            <Link to={`${this.props.location.pathname}/edit`}>Edit this recipe</Link>
            </>
        )
    }
}

export default DetailPage;