import multer from "multer";
import fs from 'fs';

const defaultPath = 'public'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const childDirectory = `${file.mimetype.split('/')[0]}`
   
        const isDirectoryExist = fs.existsSync(`${defaultPath}/${childDirectory}`) // 'public/images' OR 'public/document' dsb
    
        if(isDirectoryExist === false) fs.mkdirSync(`${defaultPath}/${childDirectory}`, {recursive: true})
        
        cb(null, `${defaultPath}/${childDirectory}`)
    },
    filename: function (req, file, cb) {
        let originalNameSplit = file.originalname.split('.')
        let formatFile = originalNameSplit[originalNameSplit.length-1]
   
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${formatFile}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const fileFilter = (req: any, file: any, cb: any) => {
    const formatAccepted = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'pdf', 'xlsx', 'docx', 'pptx']
    let originalNameSplit = file.originalname.split('.')
    
    if(formatAccepted.includes(originalNameSplit[originalNameSplit.length-1])){
        cb(null, true)
    }else{
        cb(new Error('File Format Not Accepted!'))
    }
  }
  
  export const upload = multer({ storage: storage, fileFilter: fileFilter })