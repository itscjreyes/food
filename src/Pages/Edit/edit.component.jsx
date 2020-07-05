import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { Steps } from '../../Components/Steps/steps.component';
import { Ingredients } from '../../Components/Ingredients/ingredients.component';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditPage extends Component{
    constructor(){
        super();

        this.state = {
            data: []
        }
    }

    fetchData = () => {
        const db = firebase.firestore();
        const slug = this.props.location.pathname.replace('/','').replace('edit','');
        const docRef = db.collection('recipes').doc(slug);
        docRef.get().then(doc => {
            const data = doc.data();
            this.setState({
                data: data,
                id: doc.id
            })
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    handleChange = (event) => {
        const { data } = this.state;
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }

    onUpdate = () => {
        const {title, ingredients, slug, steps, tags} = this.state.data;

        const db = firebase.firestore();
        db.collection('recipes').doc(this.state.id).set({
            title, ingredients, slug, steps, tags
        });
    }

    render(){
        const data = this.state;

        return (
            <>
            <h1>EDIT PAGE</h1>
            <TextField
                variant="outlined"
                name="title"
                value={data.data.title}
                onChange={this.handleChange}
            />
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
            <Button variant="contained" size="medium" color="default" onClick={this.onUpdate}>Update</Button>
            </>
        )
    }
}

export default EditPage;