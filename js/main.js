"use strict"

const inputButton = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

const saveTabButton = document.getElementById("tab-btn");
const deleteButton = document.getElementById("delete-btn");


let myLeads = [];
let listItems = "";

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

inputButton.addEventListener("click", saveLead);
saveTabButton.addEventListener("click", saveTab);
let clickCounter = 0;
deleteButton.addEventListener("click", deleteLead);


function saveLead(){
    if(inputEl.value){
    myLeads.push("https://"+inputEl.value);
    inputEl.value= null;
    render(myLeads);
    }
}

function saveTab(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        render(myLeads);
    })
}

function deleteLead(){
    clickCounter++;
    let intervalCount = 0;
    let seconds = 0;
    let stop;

    if(clickCounter === 1){
        intervalCount = setInterval(() => {
            seconds++; 
            if(seconds>0){
                clearInterval(intervalCount);
                clickCounter = 0;
            }
        }, 500)
    }

    else if(clickCounter===2){
        seconds = 0;
        myLeads.pop();
        clickCounter = 0;
        render(myLeads);
    }
}

function render(leadsArray){

    console.log(leadsArray);

    localStorage.setItem("myLeads", JSON.stringify(leadsArray));
    
    listItems = leadsArray.map(function(element){ 
        return `
        <li>
            <a href="${element.replace(/\s/g, '')}" target="_blank">
                ${element}
            </a>
        </li>`
    })
    ulEl.innerHTML = listItems.join(" ");  
}

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
else{
    ulEl.innerHTML = "No Leads!"
}









