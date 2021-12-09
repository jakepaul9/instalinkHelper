let style = document.createElement('style');
style.innerHTML = `
  .success {
    position:fixed !important;
    top:0 !important;
    right:0 !important;
    width:40% !important;
    z-index:999 !important;
    font-size:32pt !important;
    text-align: center !important;
    color:black !important
  }
  .warning {
     position:fixed !important;
    top:0px !important;
    right:0px !important;
    width:40% !important;
    z-index:999 !important;
    font-size:12pt !important;
    text-align: center !important;
    color:black !important
  }
  .delete-btn {
    position:fixed;
    right:10px;
    top:10px;
    width:200px;
    height:30px;
    z-index:9999;
    background:white;
    color:black;
    border-radius:10px;
   }
  .notes {
    width:60%;
    position:fixed;
    right:20%;
    top:10px;
    margin:0px;
    background-color:red;
    color:white;
    padding:5px;
    font-size:10pt;
    text-align:center;
    display:flex;
    align-items:center;
    z-index:9999;
  }`

document.head.appendChild(style);

let deleteFlag = false;
let counter = 0;

//Delete Button
let deleteBtn = document.createElement("button")
deleteBtn.className = "delete-btn" 
deleteBtn.innerHTML= "Enable Delete Mode"
deleteBtn.addEventListener("click", () => {deleteBtnToggle()})
document.body.appendChild(deleteBtn)
deleteBtn.style.display = "none"

//Directions
let notes = document.createElement("p")
notes.className = "notes"
notes.innerHTML = "Simply click on the nodes you want to delete. Any changes here CANNOT be undone. When finished click the disable button or wait till delete mode self deactivates in 10 seconds from the time of activation. NOTE: This may not work with poor internet connection."
document.body.appendChild(notes)
notes.style.display = "none"

//Only display delete button when on flowchart view.
let projectActive = document.getElementById("flowChart")
if(projectActive)
deleteBtn.style.display = "block"

const deleteBtnToggle = () => {
  let split = document.getElementById('splitContainer')
  if (split){
      let deleteConfirm = confirm("All open edit tabs must be closed. Clicking \"ok\" will close all edit tabs, then click \"Enable Delete Mode\" again to start deleting nodes.\n\nNOTE: By default delete mode will stay active for 10 seconds");
      let tabs = document.getElementById('tab-0')
      while(tabs){
        closeSplitView(0)
      }
  }
  if (deleteFlag == false && !split ){
      notes.style.display = "block"
      deleteBtn.style.background = "red"
      deleteBtn.style.color = "white"
      deleteFlag = true;
      deleteBtn.innerHTML = "Disable Delete Mode" 
      console.log(deleteFlag)
      counter = 0;
      if (deleteBtn){
        let forceCloseDelete = setTimeout(() => {
          deleteFlag = false;
          deleteBtn.innerHTML = "Enable Delete Mode"
          deleteBtn.style.background = "white"
          deleteBtn.style.color = "black"
          notes.style.display = "none"

        }, 10000)
      }
  } else if (deleteFlag == true){
      deleteFlag = false;
      deleteBtn.innerHTML = "Enable Delete Mode"
      deleteBtn.style.background = "white"
      deleteBtn.style.color = "black"
      notes.style.display = "none"
  }
}

//handle delete
document.addEventListener('click', () => {
  if (deleteFlag){
      let initDelete = setTimeout(()=>{
        let split = document.getElementById('splitContainer')
        if(split){
          let click2 = document.getElementById("deleteConfirmBtn")
          click2.click()
          counter++
        }
      }, 400)
      console.log("delete is active")
  }
})
