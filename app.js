const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const multer = require('multer')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
var name = []

app.get('/', (req, res) => {
        res.render('index', { name })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        var mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        if(file.mimetype === mime)
            cb(null, "file.xlsx")
    }
  })
  
const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
    if(req.file){
            name.push(req.file.originalname) 
            res.render('index', { name })
    }else{
        res.redirect('/')
    }
})

app.listen(port, ()=> {
    console.log('Online...')
})