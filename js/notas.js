function isLogged(){
    const logged = localStorage.getItem('currentUser')

    if(!logged){
        window.location.href = 'index.html'
    }


}

const btnExit = document.querySelector('#exit')

btnExit.addEventListener('click', ()=>{
    localStorage.removeItem('currentUser')
    window.location.reload()
})

document.addEventListener('DOMContentLoaded', ()=>{
    renderNotes()
})

async function renderNotes(){
    const notesTable = document.querySelector('#notes-table')

    const userNotes = []

    await getNotes().then(res => {
        res.forEach(item =>{
            userNotes.push(item)
        })
    })
    
    userNotes.forEach(note => {
        const tr = document.createElement('tr');

        const tdTitle = document.createElement('td')
        tdTitle.classList.add('td-center')
        tdTitle.innerText = note.titulo

        const tdDescription = document.createElement('td')
        tdDescription.classList.add('td-description')
        tdDescription.innerText = note.descricao

        const tdEdit = document.createElement('td')
        const tdBtnEdit = document.createElement('button')
        tdBtnEdit.value = 'Editar'
        tdBtnEdit.innerText = 'Editar'

        const tdDelete = document.createElement('td')
        const tdBtnDelete = document.createElement('button')
        tdBtnDelete.value = 'Excluir'
        tdBtnDelete.innerText = 'Excluir'

        tdEdit.appendChild(tdBtnEdit)
        tdDelete.appendChild(tdBtnDelete)

        tr.appendChild(tdTitle)
        tr.appendChild(tdDescription)
        tr.appendChild(tdEdit)
        tr.appendChild(tdDelete)

        notesTable.appendChild(tr)

    })
}

async function getNotes(){
    try{
        const response = await api.get('/listar-meus-recados')

        return response.data.Data
    } catch(error){
        alert(error.response.data.Message);
    }

}

isLogged()