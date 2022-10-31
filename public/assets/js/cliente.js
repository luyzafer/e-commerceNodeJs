const socket= io("http://localhost:8081")

const productForm = document.getElementById('product-form')
const producsContainer = document.getElementById('products')


const chatForm = document.getElementById('chat')
const chatsContainer = document.getElementById('chats')

productForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const formData = new FormData(productForm)
    const formValues = Object.fromEntries(formData)
    productForm.reset()
    socket.emit("new product", formValues)
    console.log("form values " + formValues)
})

socket.on("all products", allProduct => {
    console.log("entrando al socket en cliente")
    renderProducts(allProduct)
})

const renderProducts = async (products) => {
    console.log("entrando a render products")
    const response = await fetch('/assets/templates/products.template.handlebars')
    console.log(response)
    const template = await response.text()
    const compiledTemplated = Handlebars.compile(template);
    const html = compiledTemplated({products})
    console.log(html)
    producsContainer.innerHTML = html
}


chatForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const formData = new FormData(chatForm)
    const formValues = Object.fromEntries(formData)
    chatForm.reset()
    socket.emit("new message", formValues)
})

socket.on("all messages", allMessages => {
    renderMessages(allMessages)
})

const renderMessages = async (messages) => {
    console.log("entrando a render products")
    const response = await fetch('/assets/templates/chat.template.handlebars')
    const template = await response.text()
    const compiledTemplated = Handlebars.compile(template);
    const html = compiledTemplated({messages})
    chatsContainer.innerHTML = html
}