import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import {Tags} from '../../Components/Tags/tags.component';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

class AddPage extends Component{
    constructor(){
        super();

        this.state = {
            title: '',
            slug: '',
            tags: [],
            ingredients: '',
            steps: '',
            id: '',
            image: null,
            imageFile: null
        }
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSnackbar = () => {
        const snackbar = document.querySelector('.snackbar');
        if (!snackbar) {
            const createSnackbar = document.createElement('div');
            createSnackbar.setAttribute('class', 'snackbar');
            const snackbarContent = document.createTextNode("Adding...")
            createSnackbar.append(snackbarContent);
            document.body.appendChild(createSnackbar);
        }

        setTimeout(() => {
            const snackbar = document.querySelector('.snackbar');
            snackbar.classList.add('open')
        }, 100);
    }

    onAdd = () => {
        const {title, ingredients, steps, tags, imageFile} = this.state;
        const newSlug = title.toLowerCase().replace(/ /g,'-');

        const storage = firebase.storage();

        const uploadTask = storage.ref(`/images/${imageFile.name}`).put(imageFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
        }, (err) => {
        //catches the errors
        console.log(err)
        }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                const db = firebase.firestore();
                db.collection('recipes').doc(newSlug).set({
                    title: title,
                    ingredients: ingredients,
                    slug: newSlug,
                    steps: steps,
                    tags: tags,
                    image: fireBaseUrl
                });
            })
        })

        this.handleSnackbar();

        setTimeout(() => {
            window.location.replace(`/${newSlug}`)
        }, 5000);
    }
    
    handleAddTag = e => {
        e.preventDefault();
        const tagInput = document.querySelector('input[name="tag"]')
        const tag = tagInput.value;
        const allTags = this.state.tags;
        this.setState({
            tags: [...allTags, tag]
        })
        tagInput.value = ''
    }

    handleRemoveTag = event => {
        const tag = event.target.dataset.value;
        const allTags = this.state.tags.filter(item => item !== tag);

        this.setState({
            tags: allTags
        })
    }

    handleIngredientsChange = value => {
        this.setState({
            ingredients: value
        })
    }

    handleStepsChange = value => {
        this.setState({
            steps: value
        })
    }

    handleAddImage = event => {
        const file = event.target.files[0];
        this.setState({
            image: URL.createObjectURL(event.target.files[0]),
            imageFile: file
        })
    }

    render(){
        const {ingredients, steps, tags} = this.state;

        return (
            <>
            <h1>ADD PAGE</h1>
            <TextField
                variant="outlined"
                name="title"
                placeholder="Recipe Title"
                onChange={this.handleTitleChange}
            />
            {
                tags !== undefined &&
                <Tags
                    tags={tags}
                    handleRemove={this.handleRemoveTag}
                />
            }
            <form onSubmit={this.handleAddTag}>
                <TextField
                    variant="outlined"
                    name="tag"
                    placeholder="Tag Name"
                />
            </form>
            <h2>Steps</h2>
            <SimpleMDE onChange={this.handleStepsChange} value={steps} />
            <h2>Ingredients</h2>
            <SimpleMDE onChange={this.handleIngredientsChange} value={ingredients} />
            <h2>Image</h2>
            <TextField 
                type="file"
                onChange={this.handleAddImage}
            />
            <img src={this.state.image} alt={this.state.title}/>
            <Button variant="contained" size="large" color="default" onClick={this.onAdd}>Add Recipe</Button>
            </>
        )
    }
}

export default AddPage;