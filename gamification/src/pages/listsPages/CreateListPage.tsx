import { ListCreateForm } from '../../components/listcreateform/list-create-form'
import '../../styles/create-list-page.css'


const CreateListPage = () => {
    return (
        <section className='create-list-page'>
            <div className="create-list-grid-container">
                <div className="user-settings-banner">
                    <ListCreateForm />
                </div>
            </div>
        </section>
    )
}

export default CreateListPage