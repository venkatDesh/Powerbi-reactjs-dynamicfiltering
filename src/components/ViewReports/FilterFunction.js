export let selVal = "";

function getSlicerValue_cat(){
  
  const val = document.getElementById("selectSlicer_Cat").value;
  selVal = val.toString();
  //localStorage.setItem("CatFilter",(document.getElementById("selectSlicer_Cat") as HTMLInputElement).value);
  
}