const Formulario=document.getElementById("formulario")
const Npreguntas=document.getElementById("NP")
const SC=document.getElementById("SC")
const SD=document.getElementById("SD")
const ST=document.getElementById("ST")
const Section=document.getElementById("baseF")
const Raiz="https://opentdb.com/api.php?"
let arreglo=[]
let cadena
let Dificult
let category
let Type
let pregunta=0
let preguntasV=0
let preguntasF=0
const res=document.createElement("div")
res.classList.add("div")
res.classList.add("seccionRespuestas");

//funcion para generar URL api
const construcciondeURL=()=>{
    
    
    let PreguntasN="amount="+Npreguntas.value;
    
    
    if(SC.value==="any"){
        category=""
    }else{
        category="&category="+SC.value
    }
     
     
     if(SD.value==="any"){
         Dificult=""
     }else{
         Dificult="&difficulty="+SD.value
     }
     
     if(ST.value==="any"){
         Type=""
     }else{
         Type="&type="+ST.value
     }

 
 cadena=Raiz+PreguntasN+category+Dificult+Type
     console.log(cadena);
 
 
 }
 //!fin de funcion URL
 function mostrarPreguntas(arg){
     if(pregunta<arreglo.length){
    Section.innerHTML=""
   console.log(arreglo)
   const Npregunta=document.createElement("p")
   Npregunta.classList.add("Npregunta")
   const  pr=arg+1
   Npregunta.innerText="pregunta " + pr
   Section.appendChild(Npregunta)
   ////////////
   const cat=document.createElement("p")
   cat.classList.add("cat")
   cat.innerText=arreglo[arg].category
   Section.appendChild(cat)
   ////
   const preguntaa=document.createElement("p")
   preguntaa.classList.add("pregunta")
   preguntaa.innerText=arreglo[arg].question
   Section.appendChild(preguntaa)
   ///
   if(pregunta%2===0){
       arreglo[arg].incorrect_answers.push(arreglo[arg].correct_answer)
       
   }
   else{
       arreglo[arg].incorrect_answers.unshift(arreglo[arg].correct_answer)

   }
   //////
   Section.appendChild(res)
   for(let i=0;i<arreglo[arg].incorrect_answers.length;i++){
    const BTNres=document.createElement("button")
    BTNres.setAttribute("value",arreglo[arg].incorrect_answers[i])
    BTNres.setAttribute("id",i)
    BTNres.classList.add("button")
    BTNres.addEventListener('click',()=>{
        const selector=i
        resultado(selector)})


    BTNres.innerText=arreglo[arg].incorrect_answers[i]
    res.appendChild(BTNres)
    
}
     }
     else{
         fin()
     }
}
function fin (){
    Section.innerHTML=""
    const puntaje=document.createElement("p")
    puntaje.innerText="tu puntaje es  de "+ preguntasV + " de "+ arreglo.length + " preguntas"
    puntaje.classList.add("fin")
    Section.appendChild(puntaje)
    const frase=document.createElement("p")
    frase.innerText=" Gracias por participar"
    frase.classList.add("fin")
    Section.appendChild(frase)


}

function resultado(r){
    if(arreglo[pregunta].incorrect_answers[r]===arreglo[pregunta].correct_answer){

        preguntasV++
       alert("respuesta correcta")
       siguiente()
    }
    else{
        preguntasF++
        alert("Respuesta incorrecta la res puesta correcta es "+arreglo[pregunta].correct_answer )
        siguiente()
}
}
const siguiente=()=>{
    pregunta++
       Section.innerHTML=""
        res.innerHTML=""
        mostrarPreguntas(pregunta)
        
        

    
    }











//////////////////////////////////////
const obtenerPregunta= async event=>{

    
    event.preventDefault()
    construcciondeURL()
    let response =await fetch(cadena)
  const result = await response.json()
  console.log(result.results[0].category)
  arreglo=result.results
  console.log(arreglo)
  mostrarPreguntas(pregunta)   
}
/////////////////////////////////////
//Cargar submit
Formulario.onsubmit= obtenerPregunta

