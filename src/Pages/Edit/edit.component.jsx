import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import {Link} from 'react-router-dom';
import {Tags} from '../../Components/Tags/tags.component';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

class EditPage extends Component{
    constructor(){
        super();

        this.state = {
            title: '',
            slug: '',
            tags: [],
            ingredients: '',
            steps: '',
            id: ''
        }
    }

    fetchData = () => {
        const db = firebase.firestore();
        const slug = this.props.location.pathname.replace('/','').replace('edit','');
        const docRef = db.collection('recipes').doc(slug);
        docRef.get().then(doc => {
            const data = doc.data();
            this.setState({
                title: data.title,
                slug: data.slug,
                tags: data.tags,
                ingredients: data.ingredients,
                steps: data.steps,
                id: doc.id,
                image: data.image
            })
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSnackbar = () => {
        const snackbar = document.querySelector('.snackbar');
        if (!snackbar) {
            const createSnackbar = document.createElement('div');
            createSnackbar.setAttribute('class', 'snackbar');
            const snackbarContent = document.createTextNode("Updated!")
            createSnackbar.append(snackbarContent);
            document.body.appendChild(createSnackbar);
        }

        setTimeout(() => {
            const snackbar = document.querySelector('.snackbar');
            snackbar.classList.add('open')
        }, 1000);

        setTimeout(() => {
            const snackbar = document.querySelector('.snackbar');
            snackbar.classList.remove('open')
        }, 3000);
    }

    onUpdate = () => {
        const {title, ingredients, slug, steps, tags, id, imageFile} = this.state;

        const db = firebase.firestore();
        db.collection('recipes').doc(id).set({
            title, ingredients, slug, steps, tags
        });

        const storage = firebase.storage();

        const uploadTask = storage.ref(`/images/${imageFile.name}`).put(imageFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
        console.log(snapShot)
        }, (err) => {
        console.log(err)
        }, () => {
        storage.ref('images').child(imageFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                const db = firebase.firestore();
                db.collection('recipes').doc(id).set({
                    title: title,
                    ingredients: ingredients,
                    steps: steps,
                    tags: tags,
                    image: fireBaseUrl
                });
            })
        })

        setTimeout(() => {
            this.handleSnackbar();
        }, 500);
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
        const {title, ingredients, slug, steps, tags} = this.state;

        return (
            <>
            <h1>EDIT PAGE</h1>
            <TextField
                variant="outlined"
                name="title"
                value={title}
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
            <TextField 
                type="file"
                onChange={this.handleAddImage}
            />
            <img src={this.state.image} alt={this.state.title}/>
            <Button variant="contained" size="medium" color="default" onClick={this.onUpdate}>Update</Button>
            <Link to={`/${slug}`}>View Recipe</Link>
            </>
        )
    }
}

export default EditPage;