import React from 'react'
import '../styles/create-article.css'
import ArticleCreateForm from '../components/createarticleform/create-article-form';


const CreateArticle = () => {
    return (
        <section className='create-article-page-section'>
            <div className='create-article-grid'>
           <ArticleCreateForm/>
            </div>
        </section>
    )
}

export default CreateArticle