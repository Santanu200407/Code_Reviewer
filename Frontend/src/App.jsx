import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"  
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import './App.css'
import { useEffect } from 'react'


function App() {
  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}`)
const [review,setReview]=useState("")
useEffect(()=>{
  Prism.highlightAll()
})
async function reviewCode(){
  setReview("")
 const response=await axios.post(import.meta.env.VITE_BACKEND_URL+"ai/get-review",{code})
 console.log(response)
 setReview(response.data)
}


  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code)=>setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code","Fira Mono",monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              overflow: auto,
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div onClick={reviewCode}className="review">Review</div>
      </div>
      <div className="right">{(review)?<Markdown>{review}</Markdown>:"Please Wailt AI generating"}</div>
    </main>
  )
}

export default App
