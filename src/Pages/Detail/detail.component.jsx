import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { Steps } from '../../Components/Steps/steps.component';
import { Ingredients } from '../../Components/Ingredients/ingredients.component';

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
            {
                data.data.steps !== undefined &&
                <Steps 
                    steps={data.data.steps}
                />
            }
            {
                data.data.ingredients !== undefined &&
                <Ingredients 
                    ingredients={data.data.ingredients}
                />
            }
            </>
        )
    }
}

export default DetailPage;